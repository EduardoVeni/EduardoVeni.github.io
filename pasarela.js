var canvas;
var ctx;
//creo objeto de tipo imagen
var imgPersonajeUno=new Image();
var personajeUno= new Personaje(250,150,74,220);
function dibujar() {
    document.getElementById("canvas").style.backgroundColor="#00ff5c";
    //guardo el canvas en una variable
    canvas=document.getElementById("canvas");
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

}

function Personaje(x,y,ancho,alto){
    //atributos
    this.x=x;
    this.y=y;
    this.ancho=ancho;
    this.alto=alto;

    //metodos
    this.derecha=function(){
        this.x+=10;
        
    }
    this.izquierda=function(){
        this.x-=10;

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

function dibujaTexto(){
//dibujar rectangulo
ctx.fillStyle="black";
ctx.fillRect(20,28,65,30);//x,y,ancho,alto
//dibujar texto
ctx.fillStyle="white";
ctx.font="20px Impact";
ctx.fillText('Vidas',30,50)
}


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
    personajeUno.dibuja();
});

//obstaculos
var contador=0;
setInterval(function(){
//acciones a ejecutarse
    contador++;
    console.log(contador);
},1000);//cada 1 seg
