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
        document.getElementById("personaje").style.left=this.x+5+"px";

    }

    this.izquierda=function(){
        this.x-=5;
        console.log('ubicacion en X de '+this.nombre+' es '+this.x );
        document.getElementById("personaje").style.left=this.x-5+"px";

    

    }
    this.subir=function(){
        this.y-=5;
        console.log('ubicacion en Y de '+this.nombre+' es '+this.y );
        document.getElementById("personaje").style.top=this.y+5+"px";

    }
    this.bajar=function(){
        this.y+=5;
        console.log('ubicacion en Y de '+this.nombre+' es '+this.y );
        document.getElementById("personaje").style.top=this.y-5+"px";

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

        break;
        case "ArrowUp":
            personajeUno.subir();

        break;
        case "ArrowDown":
            personajeUno.bajar();

        break;
        case "ArrowRight":
            personajeUno.derecha();
        break;
    }
});

