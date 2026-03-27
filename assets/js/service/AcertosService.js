export default class AcertosService{
    acertos;

    constructor() {
        this.getAcertos();
    }

    getAcertos() { // RECEBE OS ACERTOS JÁ SALVOS (OU INICIALIZA)
        if(!localStorage.getItem("acertosQuiz")) {
            this.acertos = 0;

            localStorage.setItem("acertosQuiz", this.acertos);
        } else {
            this.acertos = Number(localStorage.getItem("acertosQuiz"));
        }
    }

    sumAcertos(){ // MUDA A QNTD DE ACERTOS QUANDO O USUÁRIO ACERTA
        this.acertos += 1;
        localStorage.setItem("acertosQuiz", this.acertos);
    }

    clearAcertos() { // LIMPA OS ACERTOS
        localStorage.removeItem("acertosQuiz");
    }
}