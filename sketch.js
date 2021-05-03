var tela = 1;
var altura = 50;
var largura = 200;
var menu = 143;
var menu1 = 85;
var menu2 = 145;
var menu3 = 215;

var opcao;
var xMin;
var xMax;
var yMin;
var yMax;
var nivel = 1;
var escolhaFase = 0;


let imagemProgramadora;
let imagemProfessora;
let imagemFundo;
let imagemPalmas;
let imagemOver;

var fontePress;

//variaveis da Play cena
var painel;
var bAlt1, bAlt2, bAlt3;
var txtPontos, bVoltar;

var eqObjetos = []
var eqObjeto;
var index;

var questoes = ["2 + 2", "4 + 2", "4 + 18", "3 + 2", "67 + 3"]
var alternativas = [[4, 22, 6], [5, 6, 10], [418, 22, 20], [5, 32, 6], [70, 72, 69]]
var alternativasC = [4, 6, 22, 5, 70];
var quedasY = [], isLimitesY = [];
var erros = [];

var questao;

var pausaColisao=0;

function preload(){
  imagemProfessora = loadImage("professora.png");
  imagemProgramadora = loadImage("programadora.png");
  imagemFundo = loadImage("fundo.png");
  imagemDois = loadImage("dois.png");
  imagemPalmas = loadImage("palmas.png");
  imagemOver = loadImage("gameover.png");
  fontePress = loadFont("./fontes/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  textStyle(NORMAL);

  //Tela menu
  if(tela == 1){
    image(imagemFundo, 0, 0 , 400, 400);
    textSize(20);
    textFont(fontePress);
    fill(28);
    text("CALCULADORA ANIMADA", 200, 50);

    //Menu com 3 opções

    //Iniciar
    textAlign(CENTER);
    textSize(20);


    //BORDA
    if(mouseX > menu && mouseX < menu + largura &&
        mouseY > menu1 && mouseY < menu1 + altura){
      stroke(200);
      fill(200);
      rect(menu, menu1, largura - 70, altura, 15);

      //Play Cena
      if(mouseIsPressed){
        tela = 2;
        carregarObjetosPlay();
        carregarQuestao();
      }
    }
    fill(20);
    noStroke();
    text("JOGAR", 200, 120);

    //Instruções do jogo
    if(mouseX > menu && mouseX < menu + largura &&
        mouseY > menu2 && mouseY < menu2 + altura){
      stroke(200);
      fill(200);
      rect(80, 145, largura + 40, altura, 15);
      if(mouseIsPressed){
        tela = 3;
      }
    }
    fill(20);
    noStroke();
    text("INSTRUÇÕES", 200, 180);

    //Créditos do jogo
    if(mouseX > menu && mouseX < menu + largura &&
        mouseY > menu3 && mouseY < menu3 + altura){
      stroke(200);
      fill(200);
      rect(menu - 40, menu3, largura, altura, 15);
      if(mouseIsPressed){
        tela = 4;
      }
    }
    fill(20);
    noStroke();
    text("CRÉDITOS", 200, 250);

  }

  //Tela jogar
  else if(tela == 2){
    background(255);

    moverEquacao();
    checarColisao();
    checarGameOver();

  }

  //Tela Instruções
  else if(tela == 3){
    telaInstrucoes();
  }

  //Tela créditos
  else if(tela == 4){
    telaCreditos();
  }

  //Tela conquista
  else if(tela == 5){
    telaConquista();
  }

  //Tela valor errado
  else if(tela == 6){
    telaErrado();
  }
}

function carregarObjetosPlay(){
  painel = createDiv("Responda a equação:");
  painel.style("background", "#d2d2d2");
  painel.style("font-size", "18px");
  painel.style("border-style", "solid");
  painel.style("border-left", "0px");
  painel.style("border-right", "0px");
  painel.style("border-top", "0px");
  painel.style("padding-top", "6px");
  painel.style("text-align", "center");
  painel.position(0, 0);
  painel.size(400, 30);

  footer = createDiv("");
  footer.style("background", "#e7e7e7");
  footer.style("font-size", "18px");
  footer.style("border-style", "solid");
  footer.style("border-left", "0px");
  footer.style("border-right", "0px");
  footer.style("border-bottom", "0px");
  footer.style("padding-top", "4px");
  footer.style("text-align", "center");
  footer.position(0, 370);
  footer.size(400, 40);

  bAlt1 = createDiv("4");
  bAlt1.style("background", "#ffffff");
  bAlt1.style("font-size", "18px");
  bAlt1.style("border-style", "solid");
  bAlt1.style("border-radius", "40px");
  bAlt1.style("padding", "2px");
  bAlt1.style("text-align", "center");
  bAlt1.position(20, 380);
  bAlt1.size(70, 20);
  bAlt1.mousePressed(onClickB1)

  bAlt2 = createDiv("22");
  bAlt2.style("background", "#ffffff");
  bAlt2.style("font-size", "18px");
  bAlt2.style("border-style", "solid");
  bAlt2.style("border-radius", "40px");
  bAlt2.style("padding", "2px");
  bAlt2.style("text-align", "center");
  bAlt2.position(160, 380);
  bAlt2.size(70, 20);
  bAlt2.mousePressed(onClickB2)

  bAlt3 = createDiv("6");
  bAlt3.style("background", "#ffffff");
  bAlt3.style("font-size", "18px");
  bAlt3.style("border-style", "solid");
  bAlt3.style("border-radius", "40px");
  bAlt3.style("padding", "2px");
  bAlt3.style("text-align", "center");
  bAlt3.position(300, 380);
  bAlt3.size(70, 20);
  bAlt3.mousePressed(onClickB3)

  txtPontos = createDiv("Pontos: 00");
  txtPontos.style("background", "#fff");
  txtPontos.style("padding", "8px");
  txtPontos.style("text-align", "center");
  txtPontos.position(294, 0);
  txtPontos.size(90, 20);

  bVoltar = createDiv("Voltar");
  bVoltar.style("background", "#fff");
  bVoltar.style("padding", "8px");
  bVoltar.style("text-align", "center");
  bVoltar.position(0, 0);
  bVoltar.size(90, 20);
  bVoltar.mousePressed(voltar);

}

function criarEqObjeto(){
  eqObjeto = createDiv("");
  eqObjeto.style("background", "#8f9fb8");
  eqObjeto.style("font-size", "18px");
  eqObjeto.style("padding-top", "4px");
  eqObjeto.style("text-align", "center");
  eqObjeto.position(0, 34);
  eqObjeto.size(400, 30);
  eqObjetos.push(eqObjeto)
  quedasY.push(36);
  isLimitesY.push(false);
  erros.push(false);
}

function carregarQuestao(){
  criarEqObjeto();
  questao = random(questoes);
  eqObjetos[eqObjetos.length-1].html(questao);
  index = questoes.indexOf(questao);
  bAlt1.html(alternativas[index][0])
  bAlt2.html(alternativas[index][1])
  bAlt3.html(alternativas[index][2])
}

function checarColisao(){
  for(i=0; i<eqObjetos.length; i++){
    if(i>0){
      if((eqObjetos[i].y + 30 >= eqObjetos[i-1].y) && isLimitesY[i] == false){
        isLimitesY[i] = true;

        if(erros[i] == false){
          carregarQuestao();
        }
      }
    } else{
      if((eqObjetos[i].y + 30 >= 366)  && isLimitesY[i] == false){
        isLimitesY[i] = true;

        if(erros[i] == false){
          carregarQuestao();
        }
      }
    }
  }
}

function checarGameOver(){
  if(eqObjetos.length>=11){
    //Game is Over
    tela = 6;

    for(i=0; i<eqObjetos.length; i++){
      eqObjetos[i].remove();
    }
    painel.remove();
    footer.remove();
    bAlt1.remove();
    bAlt2.remove();
    bAlt3.remove();
    txtPontos.remove();
    quedasY = [];
    isLimitesY = [];
    eqObjetos = [];
  }
}

function moverEquacao(){
  for(i=0; i<eqObjetos.length; i++){
    if(!isLimitesY[i]){
      eqObjetos[i].position(0 , quedasY[i]);
      quedasY[i]++;
    }
  }
}

function keyPressed(){
  if(keyCode === ENTER){
    carregarQuestao()
  }
}

function mouseClicked(){

  if(tela == 2 && nivel == 1){
    if(escolhaFase == 2 || escolhaFase == 3){
      tela = 6;
    }if(escolhaFase == 1){
      tela = 5;
    }
  }
  if(tela == 2 && nivel == 2){
    if(escolhaFase == 1 || escolhaFase == 3){
      tela = 6;
    }if(escolhaFase == 2){
      tela = 5;
    }
  }
}

function opcaoBotao(xMin, xMax, yMin, yMax, largura, altura, opcao){
  //Botao 2

  if(mouseX > xMin && mouseX < xMax &&
      mouseY > yMin && mouseY < yMax){
    fill(250);

    escolhaFase = opcao;
  }else{
    noFill();
  }
  stroke(50);
  rect(xMin + 30, xMax, largura, altura, 250);
  textSize(26);
  fill(0);
}

function botaoContinuar(){
  fill(20);
  textSize(14);
  text("CONTINUAR", 210, 300);
  if(mouseIsPressed){
    fase2();
  }
}

function telaConquista(){
  background(220);
  for(let j = 0, x = 0; j < 3; j++, x +=150){
    image(imagemPalmas, x, 0, 150, 120);
    image(imagemPalmas, x, 120, 150, 120);
    image(imagemPalmas, x, 240, 150, 120);
    image(imagemPalmas, x, 360, 150, 120);
  }
  textSize(50);
  fill(0);
  text("PARABÉNS",200,210);
  botaoContinuar(50,200,50,250,50,50,1);

}

function telaErrado(){
  background(220);
  for(let j = 0, x = 0; j < 1; j++, x +=150){
    image(imagemOver, x, 0, 400, 400);
  }
  textSize(20);
  fill(250);
  text("Não foi dessa vez",200,70);
}

function telaInstrucoes(){
  background(220);
  textSize(36);
  textFont(fontePress);
  fill(10);
  text("Instruções", 200, 70);
  textSize(10);
  text("Ano: 4º ano do ensino fundamental.", 180, 150);
  text("Materia: Matemática.", 115, 170);
  text("O jogo educacional é uma demonstração da tabuada, apresentado de forma criativa e animada. Permite o usuario selecionar as respostas de cada operação aritmetica.", 20, 190, 350);
}

function telaCreditos(){
  background(220);
  textSize(36);
  textFont(fontePress);
  fill(10);
  text("Créditos", 200, 70);
  textSize(10);
  text("IDALMIS MILIAN SARDINA MARTINS", 210, 120);
  text("ANA KELLY NOBRE COSTA",170, 200);
  textSize(14);
  text("Professora", 180, 145);
  text("Programadora", 180, 220);
  textSize(10);
  fill(80);
  text("Professora da disciplina Lógica de Programação da UFRN", 80, 155, 300);
  text("Estudante do Bacharelado de Ciências e Tecnologia da UFRN", 80, 240,300);
  image(imagemProfessora, 10, 110, 50, 70);
  image(imagemProgramadora, 10, 190, 50, 70);
}

function onClickB1(){selecionar(0)}
function onClickB2(){selecionar(1)}
function onClickB3(){selecionar(2)}

function selecionar(i){
  if(alternativas[index][i] == alternativasC[index]){
    eqObjetos[eqObjetos.length-1].remove()
  } else{
    erros[index] = true;
    carregarQuestao();
  }

}

function voltar(){
  tela=1;
  bVoltar.remove();
}
