class NodoContenedor{
    constructor(){

        this.padreMatrix = mat4.create();
        mat4.identity(this.padreMatrix);

        this.angulo = 0 ;
		this.ejeDeRotacion = [0,0,1];
		this.posicion = [0,0,0];
		this.escalado = [1,1,1];
        
		this.hijos = [];
    }
    agregarHijo(_hijo) {
        this.hijos.push(_hijo);
	 }
	 
	 borrarHijos(){
		this.hijos = [];
	}

    rotar(angulo,ejeRotacion){
		this.angulo = angulo ;
		this.ejeDeRotacion = ejeRotacion;
	}

	trasladar(posicion){
		this.posicion = posicion;
	}

	escalar(escalado){
		this.escalado = escalado;
	}

    setPadreMatriz(_padreMatriz){
        var m = mat4.create();
		mat4.copy(this.padreMatrix, _padreMatriz,m );
    }

    dibujar(){

        var mvMatrix = mat4.create();
        mat4.identity(mvMatrix);	
		mat4.multiply(mvMatrix,mvMatrix, this.padreMatrix );
		mat4.translate(mvMatrix, mvMatrix, this.posicion);
		mat4.rotate(mvMatrix,mvMatrix, this.angulo, this.ejeDeRotacion);
		mat4.scale(mvMatrix,mvMatrix, this.escalado);
        
		//Dibujo Hijos
		for(var i = 0 ; i < this.hijos.length ; i++){
			this.hijos[i].setPadreMatriz(mvMatrix);
			this.hijos[i].dibujar();
		}	
	}
}