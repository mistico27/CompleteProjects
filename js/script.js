const ingresos =[
    new Ingreso('Salario',2170),
    new Ingreso('vender sangre',4500),
    new Ingreso('vender tu cuerpo',500),
];

const egresos=[
    new Egreso('compra comida',3200),
    new Egreso('renta',2400)
];


let cargarApp=()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos =()=>{
    let totalIngreso=0;
    for(let nuevosIngresos of ingresos){
        totalIngreso += nuevosIngresos.valor;
    }
    return totalIngreso;
}

let totalEgresos =()=>{
    let totalEgreso=0;
    for(let nuevosEgresos of egresos){
        totalEgreso += nuevosEgresos.valor;
    }
    return totalEgreso;
}


let cargarCabecero=()=>{
    let presupuesto=totalIngresos()-totalEgresos();
    let porcentajeEgreso=totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML=formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());
}



const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}


const cargarIngresos =()=>{
    let ingresosHTMl='';
    for(let ingreso of ingresos){
        ingresosHTMl += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTMl;

}

const crearIngresoHTML =(ingreso)=>{
    let ingresosHTMl =`
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.description}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elementoEliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
        return ingresosHTMl;        
}

const eliminarIngreso=(id)=>{
   let indiceElminar=ingresos.findIndex(ingreso=>
        ingreso.id=== id    
    );
    ingresos.splice(indiceElminar,1);
    cargarCabecero();
    cargarIngresos();
}



const cargarEgresos =()=>{
    let EgresosHTMl='';
    for(let egreso of egresos){
        EgresosHTMl += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=EgresosHTMl;
}

const crearEgresoHTML =(egreso)=>{
    let EgresoHTMl =
`<div class="elemento limpiarEstilos">
<div class="elemento_descripcion">${egreso.description}</div>
<div class="derecha limpiarEstilos">
    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
    <div class="elementoEliminar">
        <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline"
            onclick='eliminarEgreso(${egreso.id})'></ion-icon>
        </button>
    </div>
</div>
</div>`;
return EgresoHTMl;
}

const eliminarEgreso=(id)=>{
    let indiceElminar=egresos.findIndex(egreso=>
         egreso.id=== id    
     );
     egresos.splice(indiceElminar,1);
     cargarCabecero();
     cargarEgresos();
 }


let agregarDato =()=>{
    let forma=document.forms['forma'];
    let typo= forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor= forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(typo.value==='Ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if(typo.value==='Egreso'){
            egresos.push(new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}


