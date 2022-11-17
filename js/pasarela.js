
//variables del canvas
var canvas;
var ctx;

//fuente
fuente=new FontFace("VT323","url(tipografia/VT323-Regular.ttf) format('opentype')");
document.fonts.add(fuente);

//variables para el juego
var puntos=0;
var vidas=0;



//variables para las imagenes
var imgPersonajeUno=new Image();
var imgAplauso=new Image();
var imgBondiUno=new Image();
var imgBondiDos=new Image();
var imgBondiTres=new Image();
var padreEHijo=new Image();
var hijoSolo=new Image();

//variables fondo
var posicionFondo=0;

/*variables para los audios*/
var audioPerdida;
var audioPuntos;
var audioPerdiste;
var audioGanaste;
var audioRock;

/*posicion Inicial personaje*/
var posXPer=100;
var posYPer=350;


//crear objetos
var personajeUno= new Personaje(50,200,40,90);
var aplauso= new Elemento(850,150,65,59,'aplauso',imgAplauso);
var bondiUno= new Elemento(950,200,90,70,'bondiUno',imgBondiUno);
var bondiDos= new Elemento(1300,300,90,70,'bondiDos',imgBondiDos);
var bondiTres= new Elemento(1200,300,90,70,'bondiDos',imgBondiTres);

/*Variables para color de botón*/
var colorBoton="#000";

//agrego una variable para saber si el juego está inciado o no
var inicio=false;

    //audios
    audioPerdida=new Audio();
    audioPerdida.src="audios/perdida.mp3";
    audioPuntos=new Audio();
    audioPuntos.src="audios/puntos.mp3";
    audioRock=new Audio();
    audioRock.src="audios/cancion.mp3";
    audioGanaste=new Audio();
    audioGanaste.src="audios/ganaste.mp3";
    audioPerdiste=new Audio();
    audioPerdiste.src="audios/perdiste.mp3";
    
    
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
    //dibujar Bondi tres
    imgBondiTres.src="img/bondi_naranja.png";
    imgBondiTres.onload=function(){
        bondiTres.dibujaElemento();
    }

    var intervalo;


function dibujar() {
    cargarImagenInicio();

    //establezco contexto
    ctx=canvas.getContext("2d");
	//y dibujo el estado inicial, el resto que estaba acá lo moví a la función juego.
	dibujarTextoInicio();
}

function juego() {

    personajeUno.x= 50;
    canvas.style.backgroundImage="url(img/fondosinarboles.png)";
    canvas.style.cursor="";
    colorBoton="#000";
	inicio=true; //indico que el juego está iniciado
    dibujaTexto();

    audioRock.play();
    audioPerdiste.pause();
    audioGanaste.pause();


    if (intervalo) {
        intervalo.clearInterval();
    }

    intervalo = setInterval(function(){
		borrar();
        if(vidas>0 && puntos<100){
            posicionFondo-=5;
            canvas.style.backgroundPosition=posicionFondo+"px 0px";

            /*hacerlos mover*/
            bondiUno.mover();
            bondiDos.mover();
            bondiTres.mover();
            aplauso.mover();

            /*chequear si colisionan*/
            bondiUno.colision();
            bondiDos.colision();
            bondiTres.colision();
            aplauso.colision();

            ctx.clearRect(0,0,canvas.width,canvas.height);//borra
            personajeUno.dibuja();
            bondiUno.dibujaElemento();
            bondiDos.dibujaElemento();
            bondiTres.dibujaElemento();
            aplauso.dibujaElemento();
            dibujaTexto();
        } else {
            borrar();
            personajeUno.x= 50;
			ctx.fillStyle=colorBoton;
			ctx.font="30px VT323";
			ctx.fillText('REINICIAR', 350,470);
            ctx.font="80px VT323";
            ctx.fillStyle="#000000";
            if (vidas<=0){
                ctx.fillStyle="#e69b05";
                ctx.fillText("PERDISTE",260,370);
                audioRock.pause();
                audioPerdiste.play();
                hijoSolo.src="img/hijosolo.png"
                ctx.drawImage(hijoSolo,0,0);
            } else if (puntos=100){
                ctx.fillStyle="#e69b05";
                ctx.fillText("GANASTE",260,370);
                audioRock.pause();
                audioGanaste.play();
                padreEHijo.src="img/padreehijojuntos.png"
                ctx.drawImage(padreEHijo,0,0);
            }
        }
        
    },1000/25);
}

function dibujaTexto(){
    /*definir un tamaño y tipo*/
    ctx.fillStyle = "black";
    ctx.fillRect(0, 10, 195, 40); 
    ctx.fillStyle = "#000064";
    ctx.fillRect(635,10, 180, 40); 
    ctx.font="40px VT323";
    ctx.fillStyle="white"; 

    ctx.fillText("Puntos: "+puntos,20,40);
    ctx.fillText("Vidas: "+vidas,655,40);
}

function dibujarTextoInicio(){
	borrar();
	ctx.font="40px VT323";
	ctx.fillStyle=colorBoton;
	ctx.fillText('INICIAR', 350,470);
}


function cargarImagenInicio(){
    //selecciono canvas
    canvas=document.getElementById("canvas");
    //asigno imagen de fondo inicio
    canvas.style.backgroundImage="url(img/fondoinicio.png)";
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
    if(this.y>140){
        this.y-=45;
    }
    }
    this.abajo=function(){
        if(this.y<390){
            this.y+=45;
        }
    }
    this.dibuja=function(){
        ctx.drawImage(imgPersonajeUno,this.x,this.y,this.ancho,this.alto);
    }
}

function borrar(){
	canvas.width=800;
	canvas.height=600;
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
    var posicionesX=[1400,1300,1200,1100,1000,900];
    var posicionesY=[172,300,400];
    
    this.sortear=function(){
                               
    this.x=posicionesX[Math.floor
    (Math.random()*posicionesX.length)];

    this.y=posicionesY[Math.floor
    (Math.random()*posicionesY.length)];

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
        case "ArrowDown":
            personajeUno.abajo();
        break;
        case "ArrowRight":
            personajeUno.derecha();
        break;
        case "ArrowLeft":
            personajeUno.izquierda();
        break;
        case "ArrowUp":
            personajeUno.arriba();
        break;
    }
    if(vidas>0){
        canvas.style.backgroundPosition=posicionFondo+"px 0px";
    }
});


/*Reinicio de juego*/
document.addEventListener('click',function(e){
	//Acá evaluo en función de vidas y de la variable inicio, si estoy al principio o al final del juego
    
	if((vidas==0 || puntos == 100) && e.x>200&&e.x<500&&e.y>420&&e.y<500){
			vidas=3;
			puntos=0;
			personajeUno.x=posXPer;
			personajeUno.y=posYPer;
            juego();
	}
});

document.addEventListener('mousemove',function(e){
	//si está al final o al principio del juego:
	if (vidas==0 || puntos == 100){
		if(e.x>200&&e.x<500&&e.y>420&&e.y<500){
				canvas.style.cursor="pointer";
				colorBoton="#fff";
		}else{
			canvas.style.cursor="";
			colorBoton="#000";
		}
		//y si es al principio, hago que redibuje el botón de inicio.
		if(inicio==false){
            cargarImagenInicio();
			dibujarTextoInicio();
		}
	}
});
