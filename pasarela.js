//Personaje 
function Personaje(x,y,nombre) {
    //atributos
    this.x=x;
    this.y=y;
    this.nombre=nombre;
    //metodos

    this.derecha=function(){
        this.x+=5;     //this.x+=5  o cantidad de pixeles q queremos mover
        console.log('ubicacion en X de '+this.nombre+' es '+this.x );
    }

    this.izquierda=function(){
        this.x-=5;
        console.log('ubicacion en X de '+this.nombre+' es '+this.x );
    }
    this.subir=function(){
        this.y-=5;
        console.log('ubicacion en Y de '+this.nombre+' es '+this.y );
    }
    this.bajar=function(){
        this.y+=5;
        console.log('ubicacion en Y de '+this.nombre+' es '+this.y );
    }

}
var personajeUno=new Personaje(10,20,"Viejito");

document.addEventListener('keydown',function(e){
    //agregue esto
    x=document.getElementById("personaje").offsetLeft;
    y=document.getElementById("personaje").offsetTop;
    document.getElementById("personaje").style.position="relative";


    //console.log(e); //muestra que tecla se presiona
    switch(e.key){
        case "ArrowLeft":
            personajeUno.izquierda();
            document.getElementById("personaje").style.left=x-20+"px";

        break;
        case "ArrowUp":
            personajeUno.subir();
            document.getElementById("personaje").style.top=y-30+"px";

        break;
        case "ArrowDown":
            personajeUno.bajar();
            document.getElementById("personaje").style.top=y-30+"px";

        break;
        case "ArrowRight":
            personajeUno.derecha();
            document.getElementById("personaje").style.left=x+10+"px";
        break;
    }
});


/* 
var posicionX=0
var posicionY=0
document.addEventListener("keydown", function(e){
    posicionX=document.getElementById("personaje").offsetLeft;
    posicionY=document.getElementById("personaje").offsetTop;
    document.getElementById("personaje").style.position="relative";
    switch(e.key){
        case "j":
            document.getElementById("personaje").style.left=posicionX-20+"px";
        break;
        case "i":
            document.getElementById("personaje").style.top=posicionY-30+"px";
        break;
        case "k":
            document.getElementById("personaje").style.top=posicionY+15+"px";
        break;
        case "l":
            document.getElementById("personaje").style.left=posicionX+10+"px";
        break;
    }
});


*/