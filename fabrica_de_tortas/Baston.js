/*
	Uso:
	
	var altura = 2.0;
    var radio = 0.1;
        
    var bastonGeometria = new Baston(gl, altura, radio);
    baston = new Objeto3D(gl, bastonGeometria); 
*/


class Baston {
	constructor(gl, altura, radio) {
	
		var curva = [         0.0, 0.0, 		 altura / 20,
					 0.75 * radio, 0.0, 		 altura / 20,
					 0.75 * radio, 0.0,         		   0,
					        radio, 0.0,         		   0,
					        
					        radio, 0.0,               altura,
					 0.75 * radio, 0.0,               altura,
					 0.75 * radio, 0.0, altura - altura / 20,
					 		  0.0, 0.0, altura - altura / 20,
		];
		
		var normales = [ 0.0, 0.0, -1.0,
						 -1.0, 0.0, 0.0,
						 0.0, 0.0, -1.0,
						 1.0, 0.0, 0.0,
						 
						 1.0, 0.0, 0.0,
						 0.0, 0.0, 1.0,
						 -1.0, 0.0, 0.0,
						 0.0, 0.0, 1.0,
							
		];
		
		var puntos_detalle_revolucion = 40;
		
		this.superficie = new SuperficieDeRevolucionBaston(gl, curva, normales, puntos_detalle_revolucion, [99.2/100,50.6/100,50.6/100],2*Math.PI, true, "baston-textura");
	}
	
	dibujar() {
		this.superficie.dibujar();
	}
}
