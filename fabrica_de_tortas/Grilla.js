class Grilla {
	constructor(gl, filas, columnas, color) {
	
		/**Utils */
		this.filas = filas;
		this.columnas = columnas;
		this.color = color;

		this.tiene_textura = false;

		/**Buffers */
		this.position_buffer = [];
		this.index_buffer = [];
        this.color_buffer = [];
        this.normal_buffer = [];
        this.uv_texture_buffer = [];
                
		this.createIndexBuffer();
		this.setupBuffers();
		
	}

	
	createIndexBuffer() {

		/**Index Buffer */	
        var indice_de_vertice = 0;
		var matriz_de_indices = new Array(this.filas);

		for (var i = 0.0; i < this.filas; i++) { 

			matriz_de_indices[i] = new Array(this.columnas);
			
            for (var j = 0.0; j < this.columnas; j++) {

                matriz_de_indices[i][j] = indice_de_vertice;
                indice_de_vertice++;
            }
        }

		var hacia_arriba = true;
		var columna = 0;
					
		for(var i = 0.0; i < (this.filas-1); i++) {
        	for (var j = 0.0; j < this.columnas; j++) {
				if(hacia_arriba) {
					columna = j;
				} else {
					columna = this.columnas - 1 - j;
				}                            
            	this.index_buffer.push(matriz_de_indices[i][columna], matriz_de_indices[i + 1][columna]);
			
			}
			 hacia_arriba = !hacia_arriba;
		
         }    
   
	}
	
	setupBuffers() {
		//Indices
		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
   	}

	dibujar() {

		/**Iluminacion Phong Datos de cada luz */
		var u_light_color = gl.getUniformLocation(glProgram,"light_color");
		gl.uniform3f(u_light_color,...this.color); 
		var u_ambient_color = gl.getUniformLocation(glProgram,"ambient_color");
		gl.uniform3f(u_ambient_color,...this.color );
		var u_light2_color = gl.getUniformLocation(glProgram,"light2_color");
		gl.uniform3f(u_light2_color,...this.color); 
		var u_ambient2_color = gl.getUniformLocation(glProgram,"ambient2_color");
		gl.uniform3f(u_ambient2_color,...this.color );
		var u_light3_color = gl.getUniformLocation(glProgram,"light3_color");
		gl.uniform3f(u_light3_color,...this.color); 
		var u_ambient3_color = gl.getUniformLocation(glProgram,"ambient3_color");
		gl.uniform3f(u_ambient3_color,...this.color );
	
		/**Buffers de posiciones */
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		
		/**Buffers de normales */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        
        /*Buffers Coordenadas texturas*/
        if(this.tiene_textura) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        }

		/**Condicional si usa o no textura */
		var tieneTexturaAttribute = gl.getUniformLocation(glProgram, "useTexture");


		if(this.tiene_textura) {
			gl.enableVertexAttribArray(vertexTexCoordAttribute);
			gl.uniform1i(tieneTexturaAttribute, true);
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
		} else {
			gl.disableVertexAttribArray(vertexTexCoordAttribute);
			gl.uniform1i(tieneTexturaAttribute, false);
		}


		var a = gl.getUniformLocation(glProgram, "utext1");
		gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
		gl.uniform1i(a, 0);
			
		var moverCintaUniform = gl.getUniformLocation(glProgram, "mover_cinta");
		 gl.uniform1i(moverCintaUniform, false);

		/**Dibujo */
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}
