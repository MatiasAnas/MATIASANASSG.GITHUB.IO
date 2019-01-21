class Maquina_A{

    constructor(){

        //Variables Utiles
        this.tortaPosX = 6 ;
        this.rotacionPaso= 0;
        this.rotacionTorta=0;
        this.decoracionesContador= 0;
        this.decoracionesTotal = 0;
        this.contornosContador= 0;
        this.contornosTotal = 0;
        this.decoracion= null;
        this.contorno = null ;
        this.indiceDecoracion = 0;
        this.indiceContorno = 0;
        this.alfaPaso = 0 ;
        this.alfa = 0   ;
        this.betaPaso = 0 ;
        this.beta = 0   ;
        this.tipoDecoracion=-1;
        this.tipoContorno=-1;
        this.rotacionTortaAnterior=0;
        this.primerPasada=true;

        //Geometrias
        var rectangulo1 = new Horno(gl,2,2,3.5,[29.4/100,29.8/100,75.3/100],true);
        var rectangulo2 = new CintaTransportadora(gl,10,2,0.25,[45.5/100,45.5/100,45.5/100],true);
        var rectangulo3 = new Rectangulo(gl,0.2,0.2,1,[15.3/100,60.4/100,14.5/100]);
        
        //Creo objetos
        this.maquinaA = new NodoContenedor();
            this.caja1 = new Objeto3D(rectangulo1);
            this.caja2 = new Objeto3D(rectangulo2);
                //patas
                this.caja3 = new Objeto3D(rectangulo3);
                this.caja4 = new Objeto3D(rectangulo3);
                this.caja5 = new Objeto3D(rectangulo3);
                this.caja6 = new Objeto3D(rectangulo3);
                this.caja7 = new Objeto3D(rectangulo3);
                this.caja8 = new Objeto3D(rectangulo3);
                //Aca crearia las tortas
                this.torta = new NodoContenedor();
                    this.masa = null; 
                         this.crema = null;   
                         this.decoraciones = new NodoContenedor();
                         this.contornos = new NodoContenedor();
                    this.plato = null;
                          
        //Agrego hijos a algun objeto
        this.maquinaA.agregarHijo(this.caja1);
        this.maquinaA.agregarHijo(this.caja2);
            this.caja2.agregarHijo(this.caja3);
            this.caja2.agregarHijo(this.caja4);
            this.caja2.agregarHijo(this.caja5);
            this.caja2.agregarHijo(this.caja6);
            this.caja2.agregarHijo(this.caja7);
            this.caja2.agregarHijo(this.caja8);

        //Configuro posiciones
        this.configurarEscena();
        
    }

    configurarEscena(){

      /**Configuracion de materiales */
      this.caja1.setCoheficientesPhong(0.5,1.2,2.5,100.0);
      this.caja2.setCoheficientesPhong(0.5,1.2,2.5,1.0);

      /**Configuracion de posiciones */
      this.caja2.trasladar([-6,0,1]);
      this.caja3.trasladar([-3.5,0,-1]);
      this.caja4.trasladar([-2,0,-1]);
      this.caja5.trasladar([-0.5,0,-1]);
      this.caja6.trasladar([1,0,-1]);
      this.caja7.trasladar([2.5,0,-1]);
      this.caja8.trasladar([4,0,-1]);
      
      this.maquinaA.trasladar([3,-5,0]);
      this.maquinaA.rotar(0,[0,0,1]);
    }

    setCantidadDeDecoraciones(cantidad){
        this.decoracionesContador = cantidad;
        this.decoracionesTotal = cantidad;
        this.alfaPaso = 360 / this.decoracionesTotal ;
        this.alfa = 0.0 ;
    }

    setCantidadDeContornos(cantidad){
        this.contornosContador= cantidad;
        this.contornosTotal = cantidad;
        this.betaPaso = 360 / this.contornosTotal ;
        this.rotacionPaso=this.betaPaso*((Math.PI)/180);
        this.beta = 0.0   ;
    }

    barras()  { this.tipoContorno = 0 ; }

    tubos()   { this.tipoContorno = 1 ; }

    manzanas(){ this.tipoDecoracion = 0 ;   }

    cerezas() { this.tipoDecoracion = 1 ;   }

    copos()   { this.tipoDecoracion = 2 ;   }
    
    torta_crema() { this.tipoMaterial = 'Crema' ; }
    
    torta_chocolate() { this.tipoMaterial = 'Chocolate' ; }

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

    rotarTorta1(){  
       this.torta.rotar(-this.rotacionTorta,[0,0,1]);
       
       if(this.primerPasada) {
           this.primerPasada = false;
           return true;
       }

       this.rotacionTorta += 0.01

       if(this.rotacionTorta >= (this.rotacionTortaAnterior+this.rotacionPaso)){
           this.rotacionTortaAnterior= this.rotacionTorta ;
           return true
       } 

       return false;
    }

    colocarContorno(){
        this.indiceContorno++;
        this.contornos.borrarHijos();
        this.beta = 0;

        for(var i = 0 ; i < this.indiceContorno ; i++ ){
            if(this.tipoContorno == 0){
                this.contorno = this.crearBarra();
            	this.contorno.rotar(2 * Math.PI * i / this.contornosTotal, [0, 0, 1]);
                this.contorno.trasladar([(this.radioTorta+0.05)*Math.cos(this.beta*((Math.PI)/180)+1.5708),(this.radioTorta+0.05)*Math.sin(this.beta*((Math.PI)/180)+1.5708),0.1]);        
            } 
            if(this.tipoContorno == 1){
                this.contorno = this.crearTubo();
                this.contorno.trasladar([(this.radioTorta+0.05)*Math.cos(this.beta*((Math.PI)/180)+1.5708),(this.radioTorta+0.05)*Math.sin(this.beta*((Math.PI)/180)+1.5708),0.1]);      
            } 
            this.beta = this.beta + this.betaPaso ;
            this.contornos.agregarHijo(this.contorno);
        }

        if(this.indiceContorno == this.contornosTotal) this.indiceContorno = this.contornosTotal;

    }

    agregarDecoracion(){
        this.indiceDecoracion++;
        this.decoraciones.borrarHijos();
        this.alfa = 0;

        for(var i = 0 ; i < this.indiceDecoracion ; i++ ){
            if(this.tipoDecoracion == 0){
                this.decoracion = this.crearManzana();
                this.decoracion.escalar([0.15,0.15,0.15]);
                this.decoracion.rotar(2 * Math.PI * i / this.decoracionesTotal, [0, 0, 1]);
                this.decoracion.rotar(Math.PI / 2,[1,0,0]);
            } 
            if(this.tipoDecoracion == 1) this.decoracion = this.crearCereza();
            if(this.tipoDecoracion == 2) this.decoracion = this.crearCopito();

            this.decoracion.trasladar([0.6*this.radioTorta*Math.cos(this.alfa*((Math.PI)/180)),0.6*this.radioTorta*Math.sin(this.alfa*((Math.PI)/180)),this.alturaTorta]);
            this.alfa = this.alfa + this.alfaPaso ;
            this.decoraciones.agregarHijo(this.decoracion);
        }

        if(this.indiceDecoracion == this.decoracionesTotal) this.indiceDecoracion = this.decoracionesTotal;
    }

    crearTorta(tipo,radio,altura,amplitud,ondas,torciones ){

        /**Tipo es de chocolate o el otro es el BitMap */

        this.alturaTorta = altura;
        this.radioTorta = radio;

        //--------------------------------
        //Creo geometrias
        if(this.tipoMaterial == 'Chocolate') {
        	var masa = new Masa(gl,altura,radio,ondas, amplitud, "chocolate-textura");
        } else {
        	var masa = new Masa(gl,altura,radio,ondas, amplitud, "crema-textura");
        }
        var cilindro = new Cilindro(gl,this.radioTorta+0.2,0.08,[92.3/100,92.3/100,92.3/100],2*Math.PI);
        var cremaGeometria = new Crema(gl, 40, radio*0.9 , torciones, 0.04);

        //--------------------------------
        //Limpio
        this.torta.borrarHijos();

        //--------------------------------
        //Creo torta + contenedores 
        this.torta = new NodoContenedor();
            this.masa = new Objeto3D( masa); 
                this.decoraciones = new NodoContenedor();
                this.contornos = new NodoContenedor();
                this.crema = new Objeto3D(cremaGeometria);
                this.crema.setCoheficientesPhong(0.5,0.8,1.0,100.0);
            this.plato = new Objeto3D(cilindro);
        
        //--------------------------------
        //Agrego hijos      
        this.caja2.agregarHijo(this.torta);
            this.torta.agregarHijo(this.masa);
                    this.masa.agregarHijo(this.crema);
                    this.masa.agregarHijo(this.decoraciones);
                    this.masa.agregarHijo(this.contornos);
            this.torta.agregarHijo(this.plato);

        //--------------------------------
        //Posicion
        this.torta.trasladar([this.tortaPosX,0,0.3]);
        this.crema.trasladar([0,0,this.alturaTorta]);

        //--------------------------------
        //Configuracion de material
        this.masa.setCoheficientesPhong(0.2,1.5,0.5,32.0);
        this.crema.setCoheficientesPhong(0.6,0.5,0.0,32.0);
  
    }

    moverTorta(destinoX){
        if( this.tortaPosX < destinoX ) {
            apagarCinta(); 
            return true;
        } else {
        	encenderCinta();
        }
        this.tortaPosX-= 0.01;   
        this.torta.trasladar([this.tortaPosX,0,0.3]);
        return false;
    }

    crearCereza(){
        var esfera = new Esfera(gl,40,40,0.05,[68.2/100,18.8/100,19.2/100]);
        var  cerezaTemp= new Objeto3D(esfera);
        return cerezaTemp ;
    }
    crearCopito(){
        var copo = new Copito(gl);
        var  copitoTemp= new Objeto3D(copo);
        copitoTemp.escalar([0.1,0.1,0.1]);
        return copitoTemp ;
    }
    crearManzana(){
        var cilindro = new Cilindro(gl,0.6,0.08,[63.1/100,76.9/100,50.2/100],Math.PI);
        var manzana = new Objeto3D(cilindro);
        return manzana ;
    }
    crearTubo(){
        var bastonGeometria = new Baston(gl, this.alturaTorta * 0.8, 0.03);
        var tubo = new Objeto3D(bastonGeometria);
        return tubo ;
    }
    crearBarra(){
        var barraGeometria = new Opera(gl,0.05,0.02,this.alturaTorta * 0.8,[100.0/100,50.6/100,100.0/100]);
        var barra = new Objeto3D(barraGeometria);
        return barra ;
    }

    reset(){
        this.tortaPosX = 6.0;
        this.decoraciones.borrarHijos();
        this.indiceDecoracion=0;
        this.indiceContorno=0;
        this.primerPasada = true;
        this.rotacionTorta=0;
        this.rotacionTortaAnterior = 0;
    }

    dibujar(){
      this.maquinaA.dibujar();
      
    }
}
