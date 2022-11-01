//variables del canvas
var canvas;
var ctx;

//variables para el juego
var puntos=0;
var vidas=3;

//variables para las imagenes
var imgPersonajeUno=new Image();
var imgAplauso=new Image();
var imgBondiUno=new Image();
var imgBondiDos=new Image();

//variables fondo
var posicionFondo=0;

/*variables para los audios*/
var audioPerdida;
var audioPuntos;
var audioRock;


//crear objetos
var personajeUno= new Personaje(50,200,40,90);
var aplauso= new Elemento(850,150,65,59,'aplauso',imgAplauso);
var bondiUno= new Elemento(850,200,90,70,'bondiUno',imgBondiUno);
var bondiDos= new Elemento(1300,300,90,70,'bondiDos',imgBondiDos);

/*variable salto*/
var teclaSalto=false;

function dibujar() {
    //selecciono canvas
    canvas=document.getElementById("canvas");
    //asigno imagen de fondo
    canvas.style.backgroundImage="url(img/fondosinarboles.png)";
    //establezco contexto
    ctx=canvas.getContext("2d");
    dibujaTexto();
    
    //conecto la imagen
    imgPersonajeUno.src='img/personaje.png';
    //ubicacion
    imgPersonajeUno.onload=function(){
    personajeUno.dibuja();
    }
    //dibujar Aplauso
    imgAplauso.src="img/aplauso.png";
    imgAplauso.onload=function(){
        aplauso.dibujaElemento();
    }
    //dibujar Bondi uno
    imgBondiUno.src="img/bondi.png";
    imgBondiUno.onload=function(){
        bondiUno.dibujaElemento();
    }
    //dibujar Bondi dos
    imgBondiDos.src="img/bondi_verde.png";
    imgBondiDos.onload=function(){
        bondiDos.dibujaElemento();
    }

    //audios
    audioPerdida=new Audio();
    audioPerdida.src="audios/perdida.mp3";
    audioPuntos=new Audio();
    audioPuntos.src="audios/puntos.mp3";
    audioRock=new Audio();
    audioRock.src="audios/cancion.mp3";

    setInterval(function(){
        posicionFondo-=5;
        canvas.style.backgroundPosition=posicionFondo+"px 0px"
        if(vidas>0 && puntos<100){
            /*hacerlos mover*/
            bondiUno.mover();
            bondiDos.mover();
            aplauso.mover();
            audioRock.play()

            /*logica de salto*/
            if(teclaSalto==true){
                personajeUno.arriba();
            }else{
                personajeUno.abajo();
            }

            /*chequear si colisionan*/
            bondiUno.colision();
            bondiDos.colision();
            aplauso.colision();

            ctx.clearRect(0,0,canvas.width,canvas.height);//borra
            personajeUno.dibuja();
            bondiUno.dibujaElemento();
            bondiDos.dibujaElemento();
            aplauso.dibujaElemento();
            dibujaTexto();
        }else if (vidas<=0){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font="80px Impact";
            ctx.fillText("PERDISTE",250,330);
        }else if (puntos=100){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font="80px Impact";
            ctx.fillText("GANASTE",250,330);
        }
    },1000/25);

    
}

function dibujaTexto(){
    /*definir un tamaño y tipo*/
    ctx.font="20px Impact";
    ctx.fillText("Puntos: "+puntos,20,40);
    ctx.fillText("Vidas: "+vidas,715,40);
}

//personaje
function Personaje(x,y,ancho,alto){
    //atributos
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;

    //metodos
    this.derecha=function(){
        if(this.x<750){
        this.x+=10;
        posicionFondo--;
    }
    }
    this.izquierda=function(){
        if(this.x>20){
        this.x-=10;
        posicionFondo++;
    }
    }
    this.arriba=function(){
    if(this.y>115){
        this.y-=30;
    }
    }
    this.abajo=function(){
        if(this.y<400){
            this.y+=30;
        }
    }
    this.dibuja=function(){
        ctx.drawImage(imgPersonajeUno,this.x,this.y,this.ancho,this.alto);
    }
}




//objetos
function Elemento(x,y,ancho,alto,tipo,imagen){
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;
    this.tipo=tipo;
    this.imagen=imagen;
    //metodos

    this.dibujaElemento=function(){
        ctx.drawImage(this.imagen,this.x,this.y,this.ancho,this.alto);
    }
    this.mover=function(){
        if(this.x>-50){
            this.x-=10;
        }else{
            this.sortear();
        }
    }
    this.sortear=function(){
        /*
            Math.floor(
                Math.random() * (max - min + 1)
            )+ min;
        */
        //rango para x máximo sea 1400, min 850
        this.x=Math.floor(Math.random()*(1400 - 850 +1))+850;

        //rango para y máximo sea 400, minimo 172
        this.y=Math.floor(Math.random()*((400)-(172)+1))+(172);
    }
    this.colision=function(){
        if(
            (this.x>personajeUno.x-this.ancho)
            &&(this.x<personajeUno.x+personajeUno.ancho)
            &&(this.y>personajeUno.y-this.alto)
            &&(this.y<personajeUno.y+personajeUno.alto)
        ){
            this.sortear();
            if(this.tipo=="aplauso"){
                puntos+=10;
                audioPuntos.play();
            }else{
                vidas--;
                audioPerdida.play();
            }
        }
    }
}

//escuchador
document.addEventListener('keydown',function(e){
    
    switch(e.key){
        
        //movimiento flechas
        case "ArrowRight":
            personajeUno.derecha();
        break;
        case "ArrowLeft":
            personajeUno.izquierda();
        break;
        case "ArrowUp":
            teclaSalto=true;
        break;
    }
    if(vidas>0){
        canvas.style.backgroundPosition=posicionFondo+"px 0px";
    }
});
document.addEventListener("keyup",function(e){
    switch(e.key){
        case "ArrowUp":
            teclaSalto=false;
        break;
    }
});
