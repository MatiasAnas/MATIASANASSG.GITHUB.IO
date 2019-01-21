
var obj = {

    //Cuadro para ingresar numeros
    Decoraciones: 0,
    Contornos: 10 ,
    AlturaMasa:0.5,
    OndasTorta: 3 ,
    RadioTorta : 0.5 ,
    AmplitudTorta : 0.1,
    TorcionesCrema : 2 ,

    //Seleccionador
    TipoTorta: 'Chocolate',
    TipoDecoracion: 'Copito',
    TipoContorno: 'Tubo',

    //Botones 
    Generar: function () {
       fase = 1;

       maquina_b.clean();
       maquina_b.setTortaParametros(this.RadioTorta,this.AlturaMasa);
       maquina_b.setCantidadDeDecoraciones(this.Decoraciones);

       maquina_d.clean();
       maquina_d.setTortaParametros(this.RadioTorta,this.AlturaMasa);
       maquina_d.setCantidadDeContornos(this.Contornos);

       if(this.TipoDecoracion == 'Copito' ){
            maquina_a.copos();
            maquina_b.copos();
       }
       if(this.TipoDecoracion == 'Cereza' ){
            maquina_a.cerezas();
            maquina_b.cerezas();
       }
       if(this.TipoDecoracion == 'Manzana' ){
            maquina_a.manzanas();
            maquina_b.manzanas();
       }

       if(this.TipoContorno == 'Barra' ){
          
            maquina_a.barras();
            maquina_d.barras();
       }
       if(this.TipoContorno == 'Tubo' ){
           
            maquina_a.tubos();
            maquina_d.tubos();
       }
       
       if(this.TipoTorta == 'Chocolate') {
       		maquina_a.torta_chocolate();
       }
       if(this.TipoTorta == 'Dulce De Leche') {
       		maquina_a.torta_crema();
       }

       maquina_a.reset();
       maquina_a.setCantidadDeDecoraciones(this.Decoraciones);
       maquina_a.setCantidadDeContornos(this.Contornos);
       maquina_a.crearTorta(1,this.RadioTorta,this.AlturaMasa,this.AmplitudTorta,this.OndasTorta,this.TorcionesCrema );
    },
};

//Inicio dat.GUI
var gui = new dat.GUI();

//Asocio obj al GUI
gui.remember(obj);

//Agregar botones
gui.add(obj, 'Generar');

//Agrego cuadro para ingresar numeros
gui.add(obj, 'Decoraciones').step(1); 
gui.add(obj, 'Contornos').step(1); 
gui.add(obj, 'AlturaMasa',0.3,0.9).name("AlturaMasa");
gui.add(obj, 'OndasTorta').step(1); 
gui.add(obj, 'RadioTorta',0.4,0.7).name("RadioTorta");
gui.add(obj, 'AmplitudTorta',0.05,0.15).name("AmplitudTorta");
gui.add(obj, 'TorcionesCrema',1,10).step(1); 

// Choose from accepted values
gui.add(obj, 'TipoTorta', [ 'Chocolate', 'Dulce De Leche' ] );
gui.add(obj, 'TipoDecoracion', [ 'Copito', 'Cereza', 'Manzana' ] );
gui.add(obj, 'TipoContorno', [ 'Barra', 'Tubo' ] );

