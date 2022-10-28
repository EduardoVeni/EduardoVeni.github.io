//variables del canvas
var canvas;
var ctx;
//variables para el juego

var puntos=0;
var vidas=3;

//variables para las imagenes
var imgPersonajeUno=new Image();
var imgAplauso=new Image();
var imgBondi=new Image();

//variables fondo
var posicionFondo=0;

//crear objetos
var personajeUno= new Personaje(50,200,74,220);
var aplausoUno= new Elemento(100,100,65,59,'aplauso');
var bondiUno= new Elemento(200,200,225,200,'bondi');

function dibujar() {
    //selecciono canvas
    canvas=document.getElementById("canvas");
    //asigno imagen de fondo
    canvas.style.backgroundImage="url(img/fondo.png)";
   
    //establezco contexto
    ctx=canvas.getContext("2d");
    dibujaTexto();
    
    //conecto la imagen
    imgPersonajeUno.src='img/personaje.png';
    //ubicacion
    imgPersonajeUno.onload=function () {
       // ctx.drawImage(imgPersonajeUno,250,150,74,220);//puede recibir 3 o 5(nombre objeto,posX,posY,ancho,alto)
        personajeUno.dibuja();
    }
    //dibujar Aplauso
    imgAplauso.src="img/aplauso.png";
    imgAplauso.onload=function(){
        aplausoUno.dibujaElemento(imgAplauso);
    }

    //dibujar Bondi
    imgBondi.src="img/bondi.png";
    imgBondi.onload=function(){
        bondiUno.dibujaElemento(imgBondi);
    }



    setInterval(function(){
        posicionFondo-=5;
        canvas.style.backgroundPosition=posicionFondo+"px 0px"
    },1000/25);
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
        this.x+=10;
        posicionFondo--;
    }
    this.izquierda=function(){
        this.x-=10;
        posicionFondo++;

    }
    this.arriba=function(){
        this.y-=10;
    }
    this.abajo=function(){
        this.y+=10;
    }
    this.dibuja=function(){
        ctx.drawImage(imgPersonajeUno,this.x,this.y,this.ancho,this.alto);
    }
}




//objetos
function Elemento(x,y,ancho,alto,tipo){
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;
    this.tipo=tipo;
    //metodos

    this.dibujaElemento=function(img){
        ctx.drawImage(img,this.x,this.y,this.ancho,this.alto);
    }
    
}




//dibujar texto del juego
function dibujaTexto(){   
/*dibujar rectangulo
//puntos
ctx.fillStyle="black";
ctx.fillRect(20,28,80,30);//x,y,ancho,alto
*/
//dibujar texto
    //puntos
    ctx.fillStyle="black";
    ctx.font="20px Impact";
    //puntos
    ctx.fillText('Puntos: '+puntos,20,40)
    //vidas
    ctx.fillText('Vidas: '+vidas,715,40)
}

//escuchador
document.addEventListener('keydown',function(e){
    
    switch(e.key){
        //movimiento WASD
        case "w":
            personajeUno.arriba();
        
        break;
        case "a":
            personajeUno.izquierda();
        break;
        case "s":
            personajeUno.abajo();
        break;
        case "d":
            personajeUno.derecha();
        break;
        //movimiento flechas
        case "ArrowLeft":
            personajeUno.izquierda();

        break;
        case "ArrowUp":
            personajeUno.arriba();

        break;
        case "ArrowDown":
            personajeUno.abajo();

        break;
        case "ArrowRight":
            personajeUno.derecha();
        break;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dibujaTexto();
    
    bondiUno.dibujaElemento(imgBondi);
    aplausoUno.dibujaElemento(imgAplauso);
    personajeUno.dibuja();


});

