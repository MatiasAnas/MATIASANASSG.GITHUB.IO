/* Forma de uso:

	Se debe crear una serie de puntos [x, 0, z];
	La clase creara una reviolucion a lo largo del eje z.
	
	Ej:
	var curva = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0];
	var color = [0.0,0.0,1.0];
	
	Luego:
	var puntosDeRevolucion = 40;
	superficieRevolucion = new SuperficieDeRevolucion(gl, curva, puntosDeRevolucion, color);
	
	Finalmente:
	objetoGrafico = new Objeto3D(gl, superficieRevolucion);

*/


class SuperficieDeRevolucion extends Grilla {

	constructor(gl, curva, normales_curva, columnas, color, angulo, conTextura, urlText) {

		super(gl, curva.length / 3, columnas, color);
		
		this.curva = curva;
		this.normales_curva = normales_curva;
		this.angulo = angulo;
			
		////////////////nuevo/////////////

		this.normal_buffer = [];
        this.tiene_textura = conTextura;
		
		this.createPositionBuffer();
		this.createNormalBuffer();
        this.setupBuffersOfThis();

        if(this.tiene_textura) {
            
            //this.createTextureBuffer();

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
		
		for(var fila = 0; fila < this.curva.length; fila = fila + 3){
			for(var columna = 0; columna < this.columnas; columna++){	
				
				var posicion = vec3.fromValues(this.curva[fila], this.curva[fila+1], this.curva[fila+2]);
				
				var transformacion = mat4.create();
				mat4.identity(transformacion);
      			mat4.rotate(transformacion, transformacion, columna * this.angulo/(this.columnas-1), [0.0, 0.0, 1.0]);
      			
      			vec3.transformMat4(posicion, posicion, transformacion);
      			
				  this.position_buffer.push(...[posicion[0], posicion[1], posicion[2]]);

				  var u = columna / (this.columnas - 1);
				  var v = fila / (this.filas - 1);
				  u = (u * 2) % 1;
				  v = (v * 2) % 1;
				  this.uv_texture_buffer.push(...[u,v]);
                  
                  
			}
		}
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
            	//this.color_buffer.push(...this.color);
            }
        }
	}
	
	createNormalBuffer() {
		for(var fila = 0; fila < this.curva.length; fila= fila +3 ){
            for(var columna =0; columna < this.columnas; columna++) {
            
            	var x = this.normales_curva[fila] * Math.cos(columna * this.angulo/(this.columnas-1));
				var y = this.normales_curva[fila] * Math.sin(columna * this.angulo/(this.columnas-1));
				var z = this.normales_curva[fila+2];
				this.normal_buffer.push(...[x,y,z]);
				
            }
        }
	}
}
