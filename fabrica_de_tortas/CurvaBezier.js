/*
	Para detalles de como usarla, consultar la clase "Copito.js" que la utiliza.
*/

class CurvaBezier {
	constructor(puntos_de_control, cantidad_puntos_de_curva) {
		this.puntos_de_curva = [];
		this.normales_de_curva = [];
		for(var indice_tramo = 0; indice_tramo < puntos_de_control.length; indice_tramo += 12) {
			var punto1 = [puntos_de_control[indice_tramo + 0], puntos_de_control[indice_tramo + 1 ], puntos_de_control[indice_tramo + 2 ]];
			var punto2 = [puntos_de_control[indice_tramo + 3], puntos_de_control[indice_tramo + 4 ], puntos_de_control[indice_tramo + 5 ]];
			var punto3 = [puntos_de_control[indice_tramo + 6], puntos_de_control[indice_tramo + 7 ], puntos_de_control[indice_tramo + 8 ]];
			var punto4 = [puntos_de_control[indice_tramo + 9], puntos_de_control[indice_tramo + 10], puntos_de_control[indice_tramo + 11]];
			for(var i = 0; i < cantidad_puntos_de_curva; i++) {
				var u = i / (cantidad_puntos_de_curva - 1);
				this.puntos_de_curva.push(...this.evaluar(u, punto1, punto2, punto3, punto4));
				
				var normal = vec3.create();
				vec3.cross(normal, this.evaluarDerivada(u, punto1, punto2, punto3, punto4), [0.0, 1.0, 0.0]);
				vec3.normalize(normal, normal);
				this.normales_de_curva.push(...normal);
			
			}
			
		} 
		
	}
	
	evaluar(u, punto1, punto2, punto3, punto4) {
		var x = punto1[0] * this.base0(u) + punto2[0] * this.base1(u) + punto3[0] * this.base2(u) + punto4[0] * this.base3(u);
		var y = punto1[1] * this.base0(u) + punto2[1] * this.base1(u) + punto3[1] * this.base2(u) + punto4[1] * this.base3(u);
		var z = punto1[2] * this.base0(u) + punto2[2] * this.base1(u) + punto3[2] * this.base2(u) + punto4[2] * this.base3(u);
		return [x,y,z];
	}
	
	evaluarDerivada(u, punto1, punto2, punto3, punto4) {
		var x = punto1[0] * this.derBase0(u) + punto2[0] * this.derBase1(u) + punto3[0] * this.derBase2(u) + punto4[0] * this.derBase3(u);
		var y = punto1[1] * this.derBase0(u) + punto2[1] * this.derBase1(u) + punto3[1] * this.derBase2(u) + punto4[1] * this.derBase3(u);
		var z = punto1[2] * this.derBase0(u) + punto2[2] * this.derBase1(u) + punto3[2] * this.derBase2(u) + punto4[2] * this.derBase3(u);
		return [x,y,z];
	}
	
	getPosiciones() {
		return this.puntos_de_curva;
	}
	
	getNormales() {
		return this.normales_de_curva;
	}
	
	base0(u) {
    	return (1-u)*(1-u)*(1-u);
	};
	
	base1(u){
    	return 3*(1-u)*(1-u)*u;
	};
	
	base2(u){
    	return 3*(1-u)*u*u;
	};
	
	base3(u){
    	return u*u*u;
	};
	
	derBase0(u) {
    	return -3*u*u+6*u-3;
	};
	
	derBase1(u){
    	return 9*u*u-12*u+3;
	};
	
	derBase2(u){
    	return -9*u*u+6*u;
	};
	
	derBase3(u){
    	return 3*u*u;
	};
}
