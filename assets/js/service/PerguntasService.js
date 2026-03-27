import { PERGUNTAS } from "../data/dadosPerguntas.js";

export default class PerguntasService{
    numPergunta;
    perguntaAtual;

    constructor() {
        this.getNumPergunta();
        this.getPerguntaAtual();
    }

    getAllPerguntas() { // RETORNA TODAS AS PERGUNTAS DO QUIZ
        return PERGUNTAS;
    }

    getNumPergunta() { // RECEBE O NÚMERO DA PERGUNTA QUE ESTÁ APARECENDO 
        if(!localStorage.getItem("numPerguntaQuiz")) {
            this.numPergunta = 0;
            localStorage.setItem("numPerguntaQuiz", this.numPergunta);
        } else {
            this.numPergunta = Number(localStorage.getItem("numPerguntaQuiz"));
        }
    }

    getPerguntaAtual() { // RECEBE A PERGUNTA COM BASE EM numPergunta
        const perguntas = this.getAllPerguntas();
        
        this.perguntaAtual = perguntas[this.numPergunta];
    }

    proxPergunta() { // INCREMENTA A PERGUNTA (QUANDO PASSA PRA PRÓXIMA)    
        this.numPergunta += 1;
        localStorage.setItem("numPerguntaQuiz", this.numPergunta);

        this.getPerguntaAtual();
    }

    clearNumPergunta(){ // LIMPA O LOCALSTORAGE DO NUMPERGUNTA
        localStorage.removeItem("numPerguntaQuiz");
    }
}