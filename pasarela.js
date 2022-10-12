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
})