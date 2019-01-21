class ElementoDeMaquina extends Rectangulo {
	constructor(gl, ancho, alto, profundidad, color) {
		super(gl, ancho, alto, profundidad, color, true, "metalica-textura")
		this.createUVTextureBuffer();
	}
	
	createUVTextureBuffer() {
		this.uv_texture_buffer = [];
		for(var i = 0; i < 6; i++) {
			this.uv_texture_buffer.push(...[0.9,  0.9]);
			this.uv_texture_buffer.push(...[0.3,  0.9]);
			this.uv_texture_buffer.push(...[0.3,  0.3]);
			this.uv_texture_buffer.push(...[0.9,  0.3]);
		}
	}
}
