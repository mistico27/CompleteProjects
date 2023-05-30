class Ingreso extends Dato{
    //crear un id
    static contadorIngresos=0;

    constructor(description,valor){
        super(description,valor);
        //el primero objeto que se cree va a tener el valor de 1
        this._id= ++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }

}