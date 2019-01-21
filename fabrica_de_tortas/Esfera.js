class Esfera extends Grilla {

	constructor(gl, filas, columnas, radio,color) {

        super(gl, filas, columnas,color);

        this.radio = radio;
       	
	//	this.createPositionBuffer();
       // this.createColorBuffer();
      // this.createNormalBuffer();
        //this.setupBuffers();

        ////////////////nuevo/////////////

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
            for(var columna =0; columna < this.columnas; columna++) {
                var y = this.radio * Math.cos(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var x = this.radio * Math.sin(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var z = this.radio * Math.cos(fila * Math.PI / (this.filas - 1));
        		this.position_buffer.push(x);
        		this.position_buffer.push(y);
                this.position_buffer.push(z);
                
                this.uv_texture_buffer.push(0);
                this.uv_texture_buffer.push(0);
            }
        }
	}
	
	createColorBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
                if(columna * Math.PI * 2 / (this.columnas -1) < Math.PI){
                    this.color_buffer.push(...[68.2/100,18.8/100,19.2/100]);
                }else{
                    this.color_buffer.push(...[68.2/100,18.8/100,19.2/100]);
                }
            }
        }
	}
	
	createNormalBuffer() {
		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {
            	var y = this.radio * Math.cos(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var x = this.radio * Math.sin(columna * Math.PI * 2 / (this.columnas - 1)) * Math.sin(fila * Math.PI / (this.filas - 1));
                var z = this.radio * Math.cos(fila * Math.PI / (this.filas - 1));
       			
            	var normal = vec3.fromValues(x,y,z);
                vec3.normalize(normal,normal);
                this.normal_buffer.push(...normal);
            }
        }
	}
}
