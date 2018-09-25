class Objeto3D {
	constructor(gl, geometria, posicion) {
		this.gl = gl;
		this.geometria = geometria;
		this.posicion = posicion;
		this.rotacionX = 0;
		this.rotacionY = 0;
		this.rotacionZ = 0;
		this.hijos = [];
   	}
   	
   	rotarX(angulo) {
   		this.rotacionX = this.rotacionX + angulo;
   	}
   	
   	rotarY(angulo) {
   		this.rotacionY = this.rotacionY + angulo;
   	}
   	
   	rotarZ(angulo) {
   		this.rotacionZ = this.rotacionZ + angulo;
   	}
   	
   	agregarHijo(hijo) {
   		this.hijos.push(hijo);
   	}
   	
   	dibujar() {
   		mvMatrix = mat4.create();
   		mat4.identity(mvMatrix);
		this._dibujar(mvMatrix);
   	}
   	
   	_dibujar(mvMatrixPadre) {
   	
   		//Dibujo Padre.
 		var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
 		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, this.posicion);
		mat4.rotate(mvMatrix, mvMatrix, this.rotacionX, [1.0, 0.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, this.rotacionY, [0.0, 1.0, 0.0]);
		mat4.rotate(mvMatrix, mvMatrix, this.rotacionZ, [0.0, 0.0, 1.0]);
		mat4.multiply(mvMatrix, mvMatrixPadre, mvMatrix);
		
		gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix);
		
    	this.geometria.dibujar();
   		
   		//Dibujo Hijos
   		
		this.hijos.forEach(function(hijo) {
			hijo._dibujar(mvMatrix);
		});
   	}
}
