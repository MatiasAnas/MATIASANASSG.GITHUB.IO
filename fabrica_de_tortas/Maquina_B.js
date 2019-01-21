class Maquina_B{

    constructor(){

        //Variables utiles
        this.brazoEscZ = 1;
        this.cond2 = true;
        this.cond3 = 0;
        this.cantidadDecoraciones = 0;
        this.decoracion = null ;
        this.tortaRadio = null;
        this.tortaAltura= null;
        this.cantidadTotal = 0;
        this.buscar = false ;
        this.etapa = 1;
        this.alfaPaso = 0 ;
        this.alfa = 0 ;
        this.brazoPosX = 0;
        this.brazoPosY = -1.5;
        this.brazoPosZ = 2.63;

        //Geometrias
        var rectangulo1 = new Rectangulo(gl,1.4,0.5,1.5,[58.8/100,32.9/100,82.4/100]);
        var rectangulo2 = new Rectangulo(gl,1.4,0.2,3.5,[73.7/100,28.2/100,81.2/100]);
        var rectangulo3 = new Rectangulo(gl,1.4,0.255,3,[89.0/100,65.9/100,43.1/100]);
        var rectangulo4 = new ElementoDeMaquina(gl,0.31,0.08,0.5,[32.5/100,58.4/100,82.0/100]);
        var rectangulo5 = new ElementoDeMaquina(gl,0.3,0.05,0.2,[74.1/100,87.8/100,85.5/100]);
        var cilindro = new Cilindro(gl,0.08,0.5,[74.1/100,87.8/100,85.5/100],2*Math.PI);
       
        //Creo objetos
        this.maquinaB = new NodoContenedor();
            this.caja1 = new Objeto3D(rectangulo1);
            this.caja2 = new Objeto3D(rectangulo2);
            this.caja3 = new Objeto3D(rectangulo3);
            this.maquinaC = new NodoContenedor();
                 this.tubo = new Objeto3D(cilindro);
                 this.caja4 = new Objeto3D(rectangulo4);
                 this.decoracionTemporal = new NodoContenedor();
                 this.caja5 = new Objeto3D(rectangulo5);
                 this.caja6 = new Objeto3D(rectangulo5);             

        //Agrego hijos a algun objeto
        this.maquinaB.agregarHijo(this.caja1);
        this.maquinaB.agregarHijo(this.caja2);
        this.maquinaB.agregarHijo(this.caja3);
        this.maquinaB.agregarHijo(this.maquinaC);
            this.maquinaC.agregarHijo(this.tubo);
            this.maquinaC.agregarHijo(this.caja4);
            this.maquinaC.agregarHijo(this.caja5);
            this.maquinaC.agregarHijo(this.caja6);
            this.maquinaC.agregarHijo(this.decoracionTemporal);
            
        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      this.caja2.trasladar([0,0.3,0]);
               
      this.caja3.trasladar([0,0.2,3]);
      this.caja3.rotar(1.55,[1,0,0]);
     
      this.maquinaB.trasladar([0.3  ,-3.5,0]);  

      this.decoracionTemporal.trasladar([0,0.32,-1.75]);
 
      this.maquinaC.rotar(1.5,[0,0,1]);  
      this.maquinaC.trasladar([this.brazoPosX,this.brazoPosY,this.brazoPosZ]);
        this.caja4.rotar(1.55,[1,0,0]);
        this.caja4.trasladar([0,0.25,0]);
        this.caja5.trasladar([0,0.1,-0.18]);
        this.caja6.trasladar([0,-0.1,-0.18]);
        this.caja5.setCoheficientesPhong(0.5,0.8,2.5,100.0);
        this.caja6.setCoheficientesPhong(0.5,0.8,2.5,100.0);
        this.tubo.setCoheficientesPhong(0.5,0.8,2.5,100.0);

    }

    setCantidadDeDecoraciones(cantidad){
        this.cantidadDecoraciones = cantidad;
        this.cantidadTotal = cantidad;
        this.alfaPaso = 360 / this.cantidadTotal ;
    }

    manzanas(){
        var cilindro = new Cilindro(gl,0.6,0.08,[63.1/100,76.9/100,50.2/100],Math.PI);
        this.decoracion  = new Objeto3D(cilindro);
        
        this.decoracion.escalar([0.2,0.2,0.2]);
        this.decoracion.rotar(1.5,[1,0,0]);
        this.decoracion.trasladar([0,-0.32,1.6]);

        this.caja2.agregarHijo(this.decoracion );
    }

    cerezas(){
        var esfera = new Esfera(gl,40,40,0.1,[68.2/100,18.8/100,19.2/100]);
        this.decoracion = new Objeto3D(esfera);     
        this.decoracion.trasladar([0,-0.32,1.6]);
        this.caja2.agregarHijo(this.decoracion );
    }

    copos(){
        var copo = new Copito(gl);
        this.decoracion  = new Objeto3D(copo);     
        this.decoracion.escalar([0.2,0.2,0.2]);
        this.decoracion.trasladar([0,-0.32,1.5]);
        this.caja2.agregarHijo(this.decoracion );
    }

    dibujar(){
        this.maquinaB.dibujar();     
    }

    colocarDecoraciones(){

        /**Chequeo de cantidad de decoraciones faltantes */
        if( this.cantidadDecoraciones == 0 ) return true;
        
        /**Procesamiento */
        if(this.etapa==0){ 
            this.brazoPosX = this.moverAposicion(this.brazoPosX,0);
            this.brazoPosY = this.moverAposicion(this.brazoPosY,-1.5);
            if(this.brazoPosX == 0 && this.brazoPosY == -1.5 ){
                if( this.buscar )this.etapa = 1;
                else this.etapa = 4 ;
            }
        }
        if(this.etapa==1){
            this.brazoPosX = this.moverAposicion(this.brazoPosX,0);
            this.brazoPosY = this.moverAposicion(this.brazoPosY,0);
            if(this.brazoPosX == 0 && this.brazoPosY == 0 ){
                this.etapa = 2;
            }
        }
        if(this.etapa==2){
            if( !this.agarrarDecoracion() ){ 
                this.buscar = false;
                this.etapa = 0 ;
             }
        }
        if(this.etapa==3){
           if( !this.soltarDecoracion() ){ 
               this.buscar = true;
               this.etapa = 0 ;
            }
        }
        if(this.etapa==4){
            this.destinoX=0.6*this.tortaRadio*Math.cos(this.alfa*((Math.PI)/180));
            this.destinoY=0.6*this.tortaRadio*Math.sin(this.alfa*((Math.PI)/180)) -1.5;

            this.brazoPosX = this.moverAposicion(this.brazoPosX,this.destinoX);
            this.brazoPosY = this.moverAposicion(this.brazoPosY,this.destinoY);

            if(this.brazoPosX == this.destinoX && this.brazoPosY == this.destinoY ){
                this.alfa = this.alfa + this.alfaPaso ;
                this.etapa = 3 ;
            }   
        }

        /**Traslado despues del procesamiento */
        this.maquinaC.trasladar([this.brazoPosX,this.brazoPosY,this.brazoPosZ]);

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

    agarrarDecoracion(){
       
        if(this.brazoEscZ > 2.7 ) {     
            this.brazoEscZ =2.7;   
            this.brazoPosZ -=0.005;       
            this.cond2 = false;
        }

        if(this.brazoEscZ < 1.0 ) {
           this.cond2 = true;
           this.brazoEscZ = 1.0;
          this.brazoPosZ +=0.005;
           return false;
        }

        if(this.cond2 ){ 
            this.brazoEscZ +=0.01;   
            this.brazoPosZ-=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        } 
        else {          
            this.decoracionTemporal.agregarHijo(this.decoracion);
            this.brazoEscZ -=0.01;   
            this.brazoPosZ+=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        }
        
        return true;     
    }

    soltarDecoracion(){

        if(this.brazoEscZ > ((-1.75*this.tortaAltura)+3.275 ) ) {     
            this.decoracionTemporal.borrarHijos(this.decoracion);
            maquina_a.agregarDecoracion();  
            this.brazoEscZ =((-1.75*this.tortaAltura)+3.275 );   
            this.brazoPosZ -=0.005;       
            this.cond3 = 1;
        }

        if(this.brazoEscZ < 1.0 ) {        
           this.brazoEscZ = 1.0;
           this.brazoPosZ +=0.005;
           this.cantidadDecoraciones-= 1;
           this.cond3 = 0;
           return false;
        }

        if(this.cond3 == 0 ){   
            this.brazoEscZ +=0.01;   
            this.brazoPosZ-=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        } 
        else if( this.cond3 == 1 ){
            this.brazoEscZ -=0.01;   
            this.brazoPosZ+=0.005;
            this.tubo.escalar([1,1,this.brazoEscZ]);
        }
        
        return true;
    }

    setTortaParametros(radio,altura){
        this.tortaRadio = radio;
        this.tortaAltura= altura;
    }

    clean(){
        this.caja2.borrarHijos();
        this.alfa=0;
        this.cond2 = true;
        this.cond3 = 0;
    }
}
