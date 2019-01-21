class Maquina_D{

    constructor(){

        //Variables utiles
        this.contornosContador = 0 ;
        this.contornosTotal=0;
        this.tortaRadio = 0;
        this.tortaAltura= 0;
        this.etapa = 1 ;
        this.contorno = null ;
        this.posMaquinaX = 0 ;
        this.posMaquinaY = 1.5 ;
        this.posMaquinaZ = 1.4 ;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,0.74,0.7,2,[72.5/100,28.2/100,79.6/100]);
        var rectangulo2 = new ElementoDeMaquina(gl,0.1,0.2,0.8,[94.1/100,68.6/100,42.0/100]);
        var rectangulo3 = new ElementoDeMaquina(gl,0.3,0.5,0.05,[94.1/100,68.6/100,42.0/100]);
       
        //Creo objetos
        this.maquinaD = new NodoContenedor();
                this.caja1 = new Objeto3D(rectangulo1);
                this.maquinaE = new NodoContenedor();
                        this.caja2 = new Objeto3D(rectangulo2);
                        this.caja3 = new Objeto3D(rectangulo3);
                        this.contornos = new NodoContenedor();
            
        //Agrego hijos a algun objeto
        this.maquinaD.agregarHijo(this.caja1);
        this.maquinaD.agregarHijo(this.maquinaE);
                this.maquinaE.agregarHijo(this.caja2);
                this.maquinaE.agregarHijo(this.caja3);
                this.maquinaE.agregarHijo(this.contornos);
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){
        this.caja2.trasladar([0,0,2]);
        this.caja3.trasladar([0,0.05 ,2.8]);

        this.contornos.trasladar([0,0.2,2.9]);
        this.contornos.rotar(1.58,[1,0,0]);

        this.maquinaE.trasladar([this.posMaquinaX,this.posMaquinaY,this.posMaquinaZ]);
        this.maquinaE.escalar([0.8,0.8,0.8]);
        this.maquinaE.rotar(1.55,[1,0,0]);

        this.maquinaD.trasladar([-4,-3.4,0]);  
    }

    setCantidadDeContornos(cantidad){
        this.contornosContador = cantidad;
        this.contornosTotal = cantidad;
    }

    tubos(){
        var bastonGeometria = new Baston(gl, this.tortaAltura*0.8,0.05);
        this.contorno = new Objeto3D(bastonGeometria);
        this.contornos.agregarHijo(this.contorno);
    }

    barras(){
        var barraGeometria = new Opera(gl,0.05,0.02,this.tortaAltura * 0.8,[100.0/100,50.6/100,100.0/100]); 
        this.contorno = new Objeto3D(barraGeometria);
        this.contornos.agregarHijo(this.contorno);
    }

    colocarContornos(){

     /**Chequeo de cantidad de decoraciones faltantes */
        if( this.contornosContador == 0 ) return true;
        
    /**Procesamiento */
        if(this.etapa==0){ 
            this.posMaquinaY =  this.moverAposicion(this.posMaquinaY,1.3);
            if(this.posMaquinaY== 1.3) this.etapa = 2; 
        }
        if(this.etapa==1){
            this.posMaquinaY =  this.moverAposicion(this.posMaquinaY,1.6);   
            if(this.posMaquinaY== 1.6){
                 this.contornos.agregarHijo(this.contorno);
                 if(  maquina_a.rotarTorta1() ) this.etapa = 0 ;
            }
        }
        if(this.etapa==2){
            /**Soltar y mandarlo a la torta */       
            this.contornos.borrarHijos();
            maquina_a.colocarContorno();
            this.contornosContador--;
            this.etapa = 1 ;      
        }
         
        /**Traslado despues del procesamiento */
        this.maquinaE.trasladar([this.posMaquinaX,this.posMaquinaY,this.posMaquinaZ]);
        
        return false;
    }

    moverAposicion( origen , destino ){
        if(origen < destino){
            origen += 0.005 ;      
            if( origen >= destino ) origen = destino;
            
        }else if(origen > destino){
            origen-= 0.005 ;
            if( origen <= destino ) origen = destino;         
        }
        return origen;
    }

    dibujar(){
      this.maquinaD.dibujar();     
    }

    setTortaParametros(radio,altura){
        this.tortaRadio = radio;
        this.tortaAltura= altura;
    }

    clean(){
        this.contornos.borrarHijos();   
    }
}
