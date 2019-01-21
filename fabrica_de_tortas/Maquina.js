class Maquina{

    constructor(){

        //Geometrias
        var esferaGeometria = new Esfera(gl, 50, 50, 0.1);
        var rectangulo = new Rectangulo(gl,0.5,0.5,1.25,[0.50,0.2,0.65]);
        var rectanguloAzul = new Rectangulo(gl,2,2,3.5,[0.2,0.2,0.85]);
        var rectanguloCintaTransportadora = new Rectangulo(gl,10,2,0.25,[0.2,0.2,0.51]);
        var rectangulo2 = new Rectangulo(gl,0.5,0.2,3.5,[0.50,0.2,0.85]);
        
        //Creo objetos
        this.esfera = new Objeto3D(gl, esferaGeometria);
        this.cajon = new Objeto3D(gl,rectangulo);
        this.cajon2 = new Objeto3D(gl,rectangulo2);
        this.cajonAzul = new Objeto3D(gl,rectanguloAzul);
        this.cintaTransportadora = new Objeto3D(gl,rectanguloCintaTransportadora);

        //Agrego hijos a algun objeto
        this.cajon.agregarHijo(this.esfera);
        this.cajonAzul.agregarHijo(this.cintaTransportadora);
        this.cajonAzul.agregarHijo(this.cajon);
        this.cajonAzul.agregarHijo(this.cajon2);

        
    }

    dibujar(){

      //Configuro matriz del cajon Azul
      var cajonMatrizAzul = mat4.create();
      mat4.identity(cajonMatrizAzul);
      mat4.translate(cajonMatrizAzul, cajonMatrizAzul, [0,0,0]);
      this.cajonAzul.setMatriz(cajonMatrizAzul);
      //Configuro matriz de la cinta transportadora
      var cintaTransportadoraMatrix = mat4.create();
      mat4.identity(cintaTransportadoraMatrix);
      mat4.rotate(cintaTransportadoraMatrix, cintaTransportadoraMatrix, Math.PI/2 , [0.0, 0.0, 1.0]);
      mat4.translate(cintaTransportadoraMatrix, cintaTransportadoraMatrix, [-5.95,0,1]);
      this.cintaTransportadora.setMatriz(cintaTransportadoraMatrix);
      //Configuro matriz del cajon
      var cajonMatriz = mat4.create();
      mat4.identity(cajonMatriz);
      mat4.rotate(cajonMatriz, cajonMatriz, Math.PI/2 , [0.0, 0.0, 1.0]);
      mat4.translate(cajonMatriz, cajonMatriz, [-4,1.5,0]);
      this.cajon.setMatriz(cajonMatriz);
      //Configuro matriz del cajon2
      var cajon2Matriz = mat4.create();
      mat4.identity(cajon2Matriz);
      mat4.rotate(cajon2Matriz, cajon2Matriz, Math.PI/2 , [0.0, 0.0, 1.0]);
      mat4.translate(cajon2Matriz, cajon2Matriz, [-4,1.8,0]);
      this.cajon2.setMatriz(cajon2Matriz);
      //Configuro matriz de la esfera
      var esferaMatriz = mat4.create();
      mat4.identity(esferaMatriz);
      mat4.multiply(esferaMatriz,esferaMatriz, cajonMatriz );
      mat4.translate(esferaMatriz, esferaMatriz, [0,0,1.35]);
      this.esfera.setMatriz(esferaMatriz);

      //Dibujo
      this.cajonAzul.dibujar();
    }

    //METODOS DE LA CAMINA A FUTURO
}