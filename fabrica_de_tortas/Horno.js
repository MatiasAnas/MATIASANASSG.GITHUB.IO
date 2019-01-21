class Horno extends Rectangulo {

	constructor(gl, ancho, alto, profundidad, color, conTextura) {

		super(gl, ancho, alto, profundidad, color);

		this.tiene_textura = conTextura;
		
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
				document.getElementById("horno-textura")
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
		this.uv_texture_buffer = [
		// Cara Frontal.
			 0.725,  0.5,
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,

		// Cara Superior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 
		// Cara Posterior.
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,
			 0.725,  0.5,
					
		// Cara Lateral Derecha.		//Original
			 0.37,  0.5,
			 0.37,  0.0,
			 0.725,  0.0,
			 0.725,  0.5,
			 
					
		// Cara Inferior.
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
			 0.0,  0.0,
					
		// Cara Lateral Izquierda.		//Original
			 0.39,  0.52,
			 0.0,  0.52,
			 0.0,  0.0,
			 0.39,  0.0,
			 
		];
	}
}
