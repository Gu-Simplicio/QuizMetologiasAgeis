import QuizService from "./service/QuizService.js";

// PEGA OS ELEMENTOS QUE SERÃO ALTERADOS
const boxAcertos = document.querySelector("#boxAcertos");
const boxTitulo = document.querySelector("#boxTitulo");
const boxPerguntas = document.querySelector("#boxPerguntas");

// CRIA E INICIALIZA CLASSE
const quizService = new QuizService(boxAcertos, boxTitulo, boxPerguntas);
quizService.montaQuiz();