class Objeto3D {
	constructor( geometria) {
			 
		this.geometria = geometria;
		
		this.angulo = [0];
		this.ejeDeRotacion = [[0,0,1]];
		this.posicion = [0,0,0];
		this.escalado = [1,1,1];

		this.ka=1.0;
		this.kd=1.0;
		this.ks=1.0;
		this.n = 32.0 ;

		this.padreMatrix = mat4.create();
		mat4.identity(this.padreMatrix);

		this.hijos = [];
   	}
  	
   	agregarHijo(hijo) {
   		this.hijos.push(hijo);
	}

	borrarHijos(){
		this.hijos = [];
	}

	rotar(angulo, ejeRotacion){
		this.angulo.push(angulo) ;
		this.ejeDeRotacion.push(ejeRotacion);
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

	setCoheficientesPhong(ka,kd,ks,n){
		this.ka=ka;
		this.kd=kd;
		this.ks=ks;
		this.n=n;
	}

	
	   
   	dibujar(){
		
		/**Obtengo las localizaciones de matrices */
		var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");	
		var u_normal_matrix = gl.getUniformLocation(glProgram, "uNMatrix");

		/**Obtengo localizacion y paso valores a las constantes de Phong*/
		var u_ka = gl.getUniformLocation(glProgram,"ka");
		gl.uniform1f(u_ka, this.ka);
		var u_kd = gl.getUniformLocation(glProgram,"kd");
		gl.uniform1f(u_kd, this.kd);
		var u_ks = gl.getUniformLocation(glProgram,"ks");
		gl.uniform1f(u_ks, this.ks);
		var u_n = gl.getUniformLocation(glProgram,"n");
		gl.uniform1f(u_n,this.n);
			
		/**Configuro la martix de modelado para este objeto*/
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);	
		mat4.multiply(mvMatrix,mvMatrix, this.padreMatrix );
		mat4.translate(mvMatrix, mvMatrix, this.posicion);
		for(var i = 0; i < this.angulo.length; i++) {
			mat4.rotate(mvMatrix,mvMatrix, this.angulo[i], this.ejeDeRotacion[i]);
		}
		mat4.scale(mvMatrix,mvMatrix, this.escalado);
		
		/**Pongo la matriz "mvMatrix" en el Shader */
		gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix );
		
		/**Pongo la matriz "normalMatrix" en el Shader */
		mat3.fromMat4(normalMatrix, mvMatrix);
		mat3.invert(normalMatrix, normalMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix3fv(u_normal_matrix, false, normalMatrix);

		/**Dibujo */
		this.geometria.dibujar();

		/**Dibujo Hijos */
		for(var i = 0 ; i < this.hijos.length ; i++){
			this.hijos[i].setPadreMatriz(mvMatrix);
			this.hijos[i].dibujar();
		}	
	}
}
