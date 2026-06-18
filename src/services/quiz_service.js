const QUIZ_API_URL = "https://opentdb.com/api.php?amount=10&category=18";
let pendingQuizRequest = null;

function decodeHtmlEntities(value) {
  const documentValue = new DOMParser().parseFromString(value, "text/html");

  return documentValue.documentElement.textContent ?? value;
}

function shuffleAnswers(answers) {
  const shuffledAnswers = [...answers];

  for (let index = shuffledAnswers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledAnswers[index], shuffledAnswers[randomIndex]] = [
      shuffledAnswers[randomIndex],
      shuffledAnswers[index],
    ];
  }

  return shuffledAnswers;
}

async function requestQuizQuestions() {
  const response = await fetch(QUIZ_API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Soal kuis gagal dimuat.");
  }

  const data = await response.json();

  if (data.response_code !== 0 || !Array.isArray(data.results)) {
    throw new Error("Open Trivia belum dapat menyediakan soal.");
  }

  return data.results.map((item, index) => {
    const correctAnswer = decodeHtmlEntities(item.correct_answer);
    const incorrectAnswers = item.incorrect_answers.map(decodeHtmlEntities);

    return {
      id: `${index}-${item.question}`,
      type: item.type,
      difficulty: item.difficulty,
      category: decodeHtmlEntities(item.category),
      question: decodeHtmlEntities(item.question),
      correctAnswer,
      answers: shuffleAnswers([correctAnswer, ...incorrectAnswers]),
    };
  });
}

export function getQuizQuestions() {
  if (!pendingQuizRequest) {
    pendingQuizRequest = requestQuizQuestions().finally(() => {
      pendingQuizRequest = null;
    });
  }

  return pendingQuizRequest;
}
