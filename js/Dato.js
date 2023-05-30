class Dato{
    constructor(description,valor){
        this._description=description;
        this._valor=valor;
    }
    get description(){
        return this._description;
    }
    set description(description){
        this._description=description;
    }

    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor=valor;
    }
}

