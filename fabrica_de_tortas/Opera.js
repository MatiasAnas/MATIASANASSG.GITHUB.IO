class Opera extends Rectangulo {

	constructor(gl, ancho, alto, profundidad, color) {

		super(gl, ancho, alto, profundidad, color);

		this.tiene_textura = true;
		
		if(this.tiene_textura) {

			this.createUVTextureBuffer();
			this.setupBuffersTex();
		    this.cuboTextura = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				//actualiza
			gl.texImage2D(
				gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE,
				document.getElementById("chocolate-textura")
			);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

	}

	setupBuffersTex() {
	
		this.webgl_uv_texture_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_texture_buffer), gl.STATIC_DRAW);		

	}
	   
	
	createUVTextureBuffer() {

		for(var i = 0; i < 6; i++) {

			this.uv_texture_buffer.push(...[0.0,  0.0]);
			this.uv_texture_buffer.push(...[0.0,  0.1]);
			this.uv_texture_buffer.push(...[1.0,  0.0]);
			this.uv_texture_buffer.push(...[1.0,  1.0]);
		}
	}

	createUVTextureBuffer3() {
		this.uv_texture_buffer = [
		// Cara Frontal.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,

		// Cara Superior.
			 1.0,  0.0,
			 1.0,  1.0,
			 0.5,  1.0,
			 0.5,  0.0,
			 
		// Cara Posterior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Derecha.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
					
		// Cara Inferior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Izquierda.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
		];
	}
	
	dibujar() {

		/**Iluminacion Phong Datos de color */
		var u_light_color = gl.getUniformLocation(glProgram,"light_color");
		gl.uniform3f(u_light_color,...this.color); 
		var u_ambient_color = gl.getUniformLocation(glProgram,"ambient_color");
		gl.uniform3f(u_ambient_color,...this.color);	
		var u_light2_color = gl.getUniformLocation(glProgram,"light2_color");
		gl.uniform3f(u_light2_color,...this.color); 
		var u_ambient2_color = gl.getUniformLocation(glProgram,"ambient2_color");
		gl.uniform3f(u_ambient2_color,...this.color );
		var u_light3_color = gl.getUniformLocation(glProgram,"light3_color");
		gl.uniform3f(u_light3_color,...this.color); 
		var u_ambient3_color = gl.getUniformLocation(glProgram,"ambient3_color");
		gl.uniform3f(u_ambient3_color,...this.color );

		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
        
        
        if(this.tiene_textura) {
			
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        }
		
		var tieneTexturaAttribute = gl.getUniformLocation(glProgram, "useTexture");

		if(this.tiene_textura) {
			gl.uniform1i(tieneTexturaAttribute, true);
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
		} else {
			gl.uniform1i(tieneTexturaAttribute, false);
		}

		var a = gl.getUniformLocation(glProgram, "utext1");
		gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
        gl.uniform1i(a, 0);
		
	
		var moverCintaUniform = gl.getUniformLocation(glProgram, "mover_cinta");
		gl.uniform1i(moverCintaUniform, false);
		
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.drawElements(gl.TRIANGLE_STRIP, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}
