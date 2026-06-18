import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BuildFinishQuiz({
  jumlahJawabanBenar,
  incorrectCount,
  jumlahMenjawab,
  totalQuestions,
  handleRestart,
}) {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#383E4E] px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-6 text-[#262A35] shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Kuis selesai</h1>
          <p className="mt-2 text-sm text-gray-600">
            Berikut hasil yang sudah dikerjakan
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          <div className="rounded-xl bg-[#F3F4F6] p-5 text-center">
            <p className="text-3xl font-bold text-[#18A85F]">
              {jumlahJawabanBenar}
            </p>
            <p className="mt-1 text-sm font-semibold">Benar</p>
          </div>
          <div className="rounded-xl bg-[#F3F4F6] p-5 text-center">
            <p className="text-3xl font-bold text-[#E15555]">
              {incorrectCount}
            </p>
            <p className="mt-1 text-sm font-semibold">Salah</p>
          </div>
          <div className="rounded-xl bg-[#F3F4F6] p-5 text-center">
            <p className="text-3xl font-bold text-[#FF7200]">
              {jumlahMenjawab}/{totalQuestions}
            </p>
            <p className="mt-1 text-sm font-semibold">Soal dijawab</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/beranda")}
            className="min-h-11 flex-1 font-bold"
          >
            Kembali ke Beranda
          </Button>
          <Button
            type="button"
            onClick={handleRestart}
            className="min-h-11 flex-1 bg-[#FF7200] font-bold text-white"
          >
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Ulangi
          </Button>
        </div>
      </section>
    </main>
  );
}

export default BuildFinishQuiz;
