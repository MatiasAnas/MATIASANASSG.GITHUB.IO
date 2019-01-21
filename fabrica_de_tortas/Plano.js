class Plano extends Grilla {
	constructor(gl, filas, columnas,conTextura) {//chocolate-textura
		super(gl, filas, columnas,[0.55,0.55,0.55]);

        this.normal_buffer = [];
        this.tiene_textura = conTextura;
		
		this.createPositionBuffer();
		this.createNormalBuffer();
        this.setupBuffersOfThis();

       if(this.tiene_textura) {
          
		    this.cuboTextura = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texImage2D(
				gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE,
				document.getElementById("piso-textura")
			);
			gl.bindTexture(gl.TEXTURE_2D, this.cuboTextura);
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
		
		/**Para buffer de textura */
		if(this.tiene_textura) {
			this.webgl_uv_texture_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_uv_texture_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_texture_buffer), gl.STATIC_DRAW);
		}
   	}
    
    
	createPositionBuffer() {	
          
		for(var latNumber = 0; latNumber < this.filas; latNumber++){

            var theta = latNumber * Math.PI / this.filas;
            /*var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);*/

            for(var longNumber =0; longNumber < this.columnas; longNumber++) {

				var x = (latNumber - this.filas/2)*10;		   
                var y = (longNumber - this.columnas /2)*10;
                var z =0;
                /*var phi = longNumber * 2 * Math.PI / this.columnas;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);*/

                /**Para una esfera   
                 var x = cosPhi * sinTheta;
                 var y = cosTheta;
                 var z = sinPhi * sinTheta;*/

                 /**Para llenar toda la grilla con una imagen */
                    //var u = 1.0 - (longNumber / this.columnas);
                    //var v = 1.0 - (latNumber / this.filas);
                    
                /**Repetir */
                    if( longNumber%2 == 0){
                        if(latNumber%2 ==0){
                            var u = 0;
                            var v = 0;
                        }else{
                            var u = 0;
                            var v = 1;
                        }

                    }else{
                        if(latNumber%2 ==0){
                            var u = 1;
                            var v = 0;
                        }else{
                            var u = 1;
                            var v = 1;
                        }
                    }

				
        		this.position_buffer.push(x);
        		this.position_buffer.push(y);
                this.position_buffer.push(z);
         
                this.uv_texture_buffer.push(u);
                this.uv_texture_buffer.push(v);
                         
            }         
        }
	}

	createNormalBuffer() {

		for(var fila = 0; fila < this.filas; fila++){
            for(var columna =0; columna < this.columnas; columna++) {

                 this.normal_buffer.push(...[0.0,0.0,1.0]);  

            }
        }
	}
}
