class Superficie{

    constructor(){
        //Geometria
        var plano = new Plano(gl,10,6,true);    
        //Creo objeto
        this.piso = new Objeto3D(plano);
        this.piso.setCoheficientesPhong(0.9,0.8,1.5,12.0);
    }

    dibujar(){    
        this.piso.dibujar();
    }
}