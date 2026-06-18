import { useEffect, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getQuizQuestions } from "@/services/quiz_service";
import * as helper from "@/common/utils/helper";
import BuildError from "./components/build_error";
import BuildFinishQuiz from "./components/build_finish_quiz";

function QuizView() {
  const DURASI_QUIZ = 3 * 60;
  const LABEL_JAWABAN = ["A", "B", "C", "D"];

  const deadline = useRef(null);
  const answerLocked = useRef(false);

  const [pertanyaan, setPertanyaan] = useState([]);
  const [pertanyaanIndex, setPertanyaanIndex] = useState(0);
  const [jumlahMenjawab, setJumlahMenjawab] = useState(0);
  const [jumlahJawabanBenar, setJumlahJawabanBenar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURASI_QUIZ);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestKey, setRequestKey] = useState(0);

  const totalQuestions = pertanyaan.length;
  const currentQuestion = pertanyaan[pertanyaanIndex];
  const incorrectCount = jumlahMenjawab - jumlahJawabanBenar;

  useEffect(() => {
    let isActive = true;

    getQuizQuestions()
      .then((quizQuestions) => {
        if (!isActive) {
          return;
        }

        if (quizQuestions.length === 0) {
          throw new Error("Soal kuis tidak tersedia.");
        }

        setPertanyaan(quizQuestions);
        setPertanyaanIndex(0);
        setJumlahMenjawab(0);
        setJumlahJawabanBenar(0);
        setTimeLeft(DURASI_QUIZ);
        setErrorMessage("");
        answerLocked.current = false;
        deadline.current = Date.now() + DURASI_QUIZ * 1000;
        setStatus("playing");
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(error.message || "Terjadi kesalahan saat memuat soal.");
        setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, [DURASI_QUIZ, requestKey]);

  useEffect(() => {
    if (status !== "playing") {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );

      setTimeLeft(remainingSeconds);

      if (remainingSeconds === 0) {
        window.clearInterval(timerId);
        setStatus("finished");
      }
    }, 250);

    return () => window.clearInterval(timerId);
  }, [status]);

  useEffect(() => {
    answerLocked.current = false;
  }, [pertanyaanIndex]);

  function handleAnswer(answer) {
    if (answerLocked.current || status !== "playing" || !currentQuestion) {
      return;
    }
    answerLocked.current = true;
    setJumlahMenjawab((currentCount) => currentCount + 1);

    if (answer === currentQuestion.correctAnswer) {
      setJumlahJawabanBenar((currentCount) => currentCount + 1);
    }
    if (pertanyaanIndex === totalQuestions - 1) {
      setStatus("finished");
      return;
    }

    setPertanyaanIndex((currentIndex) => currentIndex + 1);
  }

  function handleRetry() {
    setStatus("loading");
    setErrorMessage("");
    setRequestKey((currentKey) => currentKey + 1);
  }

  function handleRestart() {
    setPertanyaanIndex(0);
    setJumlahMenjawab(0);
    setJumlahJawabanBenar(0);
    setTimeLeft(DURASI_QUIZ);
    answerLocked.current = false;
    deadline.current = Date.now() + DURASI_QUIZ * 1000;
    setStatus("playing");
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#383E4E] px-4 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <Spinner className="size-10 text-[#18F384]" />
        </div>
      </main>
    );
  }

  if (status === "error") {
    return <BuildError handleRetry={handleRetry} errorMessage={errorMessage} />;
  }

  if (status === "finished") {
    return (
      <BuildFinishQuiz
        handleRestart={handleRestart}
        incorrectCount={incorrectCount}
        jumlahJawabanBenar={jumlahJawabanBenar}
        jumlahMenjawab={jumlahMenjawab}
        totalQuestions={totalQuestions}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#383E4E] px-4 py-8 text-white">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/70">Progress pengerjaan</p>
            <p className="font-bold">
              {jumlahMenjawab} dari {totalQuestions} soal dijawab
            </p>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-bold ${
              timeLeft <= 60
                ? "bg-red-500 text-white"
                : "bg-[#FF7200] text-white"
            }`}
          >
            <Clock3 className="size-4" aria-hidden="true" />
            <span>{helper.formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 text-[#262A35] shadow-xl">
          <h1 className="text-xl font-bold leading-relaxed">
            {currentQuestion.question}
          </h1>
          <p className="mt-2 text-sm text-gray-500">Pilih jawaban</p>

          <div className="mt-7 grid gap-3">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={answer}
                type="button"
                variant="outline"
                onClick={() => handleAnswer(answer)}
                className="h-auto min-h-16 w-full justify-start whitespace-normal border-gray-200 px-4 py-3 text-left text-[#262A35]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#262A35] text-xs font-bold text-white">
                  {LABEL_JAWABAN[index]}
                </span>
                <span className="leading-relaxed">{answer}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default QuizView;
