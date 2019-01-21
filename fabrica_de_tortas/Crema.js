/*
	Uso de la clase:
	
	    var detalleDeRevolucion = 100;		//Es la cantidad de niveles a lo largo del giro.
        var radio = 5;						//Radio del anillo.
        var vueltas = 5;					//Cantidad de vueltas de torcion que tiene.
        var escalaDeLaEstrella = 0.5;		//Escala de la forma base (la estrella en 2D).
        
        var cremaGeometria = new Crema(gl, detalleDeRevolucion, radio, vueltas, escalaDeLaEstrella);
        crema = new Objeto3D(gl, cremaGeometria); 
*/


class Crema extends Grilla {

	constructor(gl, detalle_revolucion, radio, vueltas, escala) {

		super(gl, detalle_revolucion, 13,[0.9,0.9,0.9]);	
		

		this.radio = radio;
		this.vueltas = vueltas;
		this.escala = escala;
		
		this.forma = [
			0.0,  0.0,  1.0,
			0.3,  0.0,  0.5,
			0.85, 0.0,  0.5,
			0.5,  0.0,  0.0,
			0.85, 0.0, -0.5,
			0.3,  0.0, -0.5,
			0.0,  0.0, -1.0,
			
			-0.3,  0.0, -0.5,
			-0.85, 0.0, -0.5,
			-0.5,  0.0,  0.0,
			-0.85, 0.0,  0.5,
			-0.3,  0.0,  0.5,
			0.0,  0.0,  1.0,
		];
		
		this.normales = [
			0.0, 0.0, 1.0,
			1.0/1.97, 0.0, 1.7/1.97,
			1.7/1.97, 0.0, 1.0/1.97,
			1.0, 0.0, 0.0,
			1.7/1.97, 0.0, -1.0/1.97,
			1.0/1.97, 0.0, -1.7/1.97,
			0.0, 0.0, -1.0,
			
			-1.0/1.97, 0.0, -1.7/1.97,
			-1.7/1.97, 0.0, -1.0/1.97,
			-1.0, 0.0, 0.0,
			-1.7/1.97, 0.0, 1.0/1.97,
			-1.0/1.97, 0.0, 1.7/1.97,
			0.0, 0.0, 1.0,
		];
		
		this.normal_buffer = [];
        this.tiene_textura = false;
		
		this.createPositionBuffer();
		this.createNormalBuffer();
        this.setupBuffersOfThis();

		if(this.tiene_textura) {
            
        
            //Crea buffer para texturad
            this.webgl_uv_texture_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_texture_buffer), gl.STATIC_DRAW);

		    this.cuboTextura = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texImage2D(
				gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE,
				document.getElementById(urlText)
			);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}


		this.normal_buffer = [];
		this.tiene_textura = false;
		
	}

	setupBuffersOfThis(){

		/**Creo buffer de posiciones */
		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
	
		/**Creo buffer de normales */
		this.webgl_normal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);    
		
   	}
	
	createPositionBuffer() {

		for(var fila = 0; fila < this.filas; fila++){
			for(var i = 0; i < this.forma.length; i += 3) {
				var x = this.forma[i + 0];
				var y = this.forma[i + 1];
				var z = this.forma[i + 2];
				
				var vector = vec3.fromValues(x, y, z);
				
				var transformacion = mat4.create();
				mat4.identity(transformacion);
      			mat4.rotate(transformacion, transformacion, 2 * Math.PI * fila / (this.filas - 1), [0.0, 0.0, 1.0]);
				mat4.translate(transformacion, transformacion, [this.radio, 0.0, 0.0]);
				mat4.rotate(transformacion, transformacion, this.vueltas * 2 * Math.PI * fila / (this.filas - 1), [0.0, 1.0, 0.0]);
				mat4.scale(transformacion, transformacion, [this.escala, this.escala, this.escala]);
      			
      			vec3.transformMat4(vector, vector, transformacion);
      			
      			this.position_buffer.push(...[vector[0], vector[1], vector[2]]);
			}
        }
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++) {
			//Esto deberia tener todo el mismo color, pero como todavia no programamos las normales no podemos ponerle luz.
			//De momento lo dejamos asi multicolor para que se note el giro.
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[0.0,1.0,0.0]);
        	this.color_buffer.push(...[0.0,0.0,1.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[0.0,1.0,0.0]);
        	this.color_buffer.push(...[0.0,0.0,1.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[0.0,1.0,0.0]);
        	this.color_buffer.push(...[0.0,0.0,1.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        	this.color_buffer.push(...[1.0,0.0,0.0]);
        }
	}
	
	createNormalBuffer() {
		/*for(var fila = 0; fila < this.filas; fila++) {
			//Esto deberia tener todo el mismo color, pero como todavia no programamos las normales no podemos ponerle luz.
			//De momento lo dejamos asi multicolor para que se note el giro.
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[0.0,1.0,0.0]);
        	this.normal_buffer.push(...[0.0,0.0,1.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[0.0,1.0,0.0]);
        	this.normal_buffer.push(...[0.0,0.0,1.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[0.0,1.0,0.0]);
        	this.normal_buffer.push(...[0.0,0.0,1.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        	this.normal_buffer.push(...[1.0,0.0,0.0]);
        }*/
	
		for(var fila = 0; fila < this.filas; fila++){
			for(var i = 0; i < this.forma.length; i += 3) {
				var x = this.normales[i + 0];
				var y = this.normales[i + 1];
				var z = this.normales[i + 2];
				
				var normal = vec3.fromValues(x, y, z);
				vec3.normalize(normal, normal);
				
				var transformacion = mat4.create();
				mat4.identity(transformacion);
      			mat4.rotate(transformacion, transformacion, 2 * Math.PI * fila / (this.filas - 1), [0.0, 0.0, 1.0]);
				//mat4.translate(transformacion, transformacion, [this.radio, 0.0, 0.0]);
				mat4.rotate(transformacion, transformacion, this.vueltas * 2 * Math.PI * fila / (this.filas - 1), [0.0, 1.0, 0.0]);
				//mat4.scale(transformacion, transformacion, [this.escala, this.escala, this.escala]);
      			
      			vec3.transformMat4(normal, normal, transformacion);
      			
      			this.normal_buffer.push(...[normal[0], normal[1], normal[2]]);
			}
        }
	}
}
