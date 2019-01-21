/*
	Uso:
	
	// Creo la geometria.
	    
	var altura = 4.0;
    var radio = 4.0;
    var niveles = 3;
    var amplitud = 0.3;
        
    var masaGeometria = new Masa(gl, altura, radio, niveles, amplitud);
    masa = new Objeto3D(gl, masaGeometria); 
	
	//Creo un objeto 3D con geometria Masa (Consultar clase Objeto3D).
    masa = new Objeto3D(gl, masaGeometria); 
*/


class Masa {
	constructor(gl, altura, radio, niveles, amplitud, nombre_textura) {
		this.altura = altura;
		this.radio = radio;
		this.niveles = niveles;
		this.amplitud = amplitud;
		
		this.puntos_de_control = []
		
		this.puntos_de_control.push(...[0.0, 0.0, 0.0]);
		this.puntos_de_control.push(...[0.0, 0.0, 0.0]);
		var puntos = 2 * this.niveles + 1;
		for(var i = 0; i < puntos; i++) {
			var x = Math.pow(-1.0, i + 1) * amplitud + this.radio;
			var y = 0.0;
			var z = i * this.altura / (puntos - 1);
			this.puntos_de_control.push(...[x, y, z]);
		}
		this.puntos_de_control.push(...[0.0, 0.0, this.altura]);
		this.puntos_de_control.push(...[0.0, 0.0, this.altura]);
	
		var puntos_detalle_revolucion = 80;
		var puntos_detalle_curva = 30;
		
		var curva = new CurvaBSpline(this.puntos_de_control, puntos_detalle_curva);
		
		this.superficie = new SuperficieDeRevolucion(gl, curva.getPosiciones(), curva.getNormales(), puntos_detalle_revolucion, [82.7/100, 76.1/100, 33.7/100],2*Math.PI, true,nombre_textura);
	}
	
	dibujar() {
		this.superficie.dibujar();
	}
}
