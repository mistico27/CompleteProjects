class Egreso extends Dato{
    static contadorEgresos=0;

    constructor(description,valor){
        super(description,valor);
        this._id=++Egreso.contadorEgresos;
    }
    get id(){
        return this._id;
    }
}