class Rectangulo {

	constructor(gl, ancho, alto, profundidad, color) {

		this.ancho = ancho;
		this.alto = alto;
		this.profundidad = profundidad;
		this.color = color;
		this.TRIANGULOS = 24;
		this.tiene_textura = false;

		/**Buffers */
		this.position_buffer = [];
		this.normal_buffer = [];
		this.index_buffer = [];
        this.uv_texture_buffer = [];

        this.crearPositionBuffer();
		this.crearNormalBuffer();
		this.crearIndexBuffer();
				
		this.setupBuffers();
	}
	
	crearIndexBuffer() {

		for(var i = 0; i < this.TRIANGULOS ; i += 4){
			
			this.index_buffer.push(...[i, (i + 1), (i + 2), i, (i + 2), (i + 3)]);
		}
	}
		
	crearPositionBuffer() {
	
		// Sistema de coordenadas en el centro de la cara inferior. Centrado en z = 0.
		var x = this.ancho / 2;
		var y = this.alto / 2;
		var z = this.profundidad;
	
		this.position_buffer = [
		// Cara Frontal.
			-x, y,  0,
			 x, y,  0,
			 x, y,  z,
			-x, y,  z,

		// Cara Superior.
			-x, -y, z,
			-x, y,  z,
			 x, y,  z,
			 x, -y, z,

		// Cara Posterior.
			-x, -y, 0,
			-x, -y, z,
			 x, -y, z,
			 x, -y, 0,
					
		// Cara Lateral Derecha.
			 x, -y, 0,
			 x, -y, z,
			 x, y,  z,
			 x, y,  0,
					
		// Cara Inferior.
			-x, -y, 0,
			 x, -y, 0,
			 x, y,  0,
			-x, y,  0,
					
		// Cara Lateral Izquierda.
			-x, -y, 0,
			-x, y,  0,
			-x, y,  z,
			-x, -y, z,
		];
	}
	
	crearNormalBuffer() {

		this.normal_buffer = [
		// Cara Frontal.
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,
						
		// Cara Superior.
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			
		// Cara Posterior.
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,
						
		// Cara Lateral Derecha.
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			
		// Cara Inferior.
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
						
		// Cara Lateral Izquierda.
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
		];
	}
	
	setupBuffers() {
	
		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
			
		this.webgl_normal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);     
		
		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
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
