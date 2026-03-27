import AcertosService from "./AcertosService.js";
import PerguntasService from "./PerguntasService.js";

export default class QuizService {
    // INJEÇÃO DE DEPENDÊNCIA
    acertosService = new AcertosService();
    perguntasService = new PerguntasService();
    perguntaAtual;    
    acertos;

    constructor(boxAcertos, boxTitulo, boxPerguntas){
        // SALVA OS ELEMENTOS DA TELA
        this.divAcertos = boxAcertos;
        this.divTitulo = boxTitulo;
        this.divPerguntas = boxPerguntas;
    }

    limpaQuiz() {  // LIMPA OS ELEMENTOS DO QUIZ PARA ESCREVER NOVAS PERGUNTAS SEM SOBREESCREVER NADA
        const buttons = this.divPerguntas.querySelectorAll("button");

        for(let i = 0; i < buttons.length; i++)this.divPerguntas.removeChild(buttons[i]);
    }

    montaQuiz() { // CONSTRÓI A GUI DO QUIZ
        // LIMPA O QUIZ, CASO JÁ TENHA SALVO
        if(this.divPerguntas.querySelector("button")) this.limpaQuiz();

        // RECEBE OS DADOS ATUALIZADOS 
        this.perguntaAtual = this.perguntasService.perguntaAtual;
        this.acertos = this.acertosService.acertos;


        let opcoes = this.perguntaAtual.opcoes;

        // INSERE A QNTD DE ACERTOS
        this.divAcertos.textContent = this.acertos;

        // INSERE O TÍTULO DA PERGUNTA
        this.divTitulo.textContent = this.perguntaAtual.titulo;

        opcoes.forEach(opcao => { // COLOCA OS BOTÕES DAS PERGUNTAS NO LUGAR
            const button = document.createElement("button");

            button.textContent = opcao.texto;

            button.id = `btn${opcao.id}`
            button.className = "bg-azul my-1 py-2 rounded-full cursor-pointer text-3xl hover:opacity-75";

            button.addEventListener("click", () => this.escolheOpcao(opcao.id, button))
            
            this.divPerguntas.appendChild(button);
        });
    }

    escolheOpcao(id, btn) { // QUANDO O USUÁRIO ESCOLHER UMA OPÇÃO
        if(id == this.perguntaAtual.idCorreto) { // CASO A OPÇÃO SEJA A CORRETA
            // altera as cores do botão
            btn.classList.remove("bg-azul");
            btn.classList.add("bg-verde");

            setTimeout(() => {
                this.acertosService.sumAcertos();
                this.perguntasService.proxPergunta();

                if(this.perguntaAtual.ultima) { // CASO SEJA A ÚLTIMA QUESTÃO, LIMPA OS DADOS E VAI PRO FIM DO QUIZ
                    this.acertosService.clearAcertos();
                    this.perguntasService.clearNumPergunta();

                    location.href = "fim.html";
                } else {
                    this.montaQuiz();
                }
            }, 1750); 
        } else {
            // altera as cores do botão
            btn.classList.remove("bg-azul");
            btn.classList.add("bg-vermelho");
            btn.classList.add("text-white");
        }
    }
}