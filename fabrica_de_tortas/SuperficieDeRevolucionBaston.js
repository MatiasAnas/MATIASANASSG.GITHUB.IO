/* Forma de uso:

	Se debe crear una serie de puntos [x, 0, z];
	La clase creara una reviolucion a lo largo del eje z.
	
	Ej:
	var curva = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0, 0.5, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0];
	var color = [0.0,0.0,1.0];
	
	Luego:
	var puntosDeRevolucion = 40;
	superficieRevolucion = new SuperficieDeRevolucion(gl, curva, puntosDeRevolucion, color);
	
	Finalmente:
	objetoGrafico = new Objeto3D(gl, superficieRevolucion);

*/


class SuperficieDeRevolucionBaston extends SuperficieDeRevolucion {
	constructor(gl, curva, normales_curva, columnas, color,angulo, tiene_textura, nombre_textura) {
		super(gl, curva, normales_curva, columnas, color,angulo, tiene_textura, nombre_textura);	
	}
	
	createUVTextureBuffer() {
		for(var columna = 0; columna < this.columnas; columna++) {
			for(var fila = 0; fila < this.filas; fila++) {
				var u = columna / (this.columnas - 1);
				var v = fila / (this.filas - 1);
				v = (v - 0.5) / 6.5 + 0.5;
				u = (u - 0.5) / 0.3 + 0.5;
				this.uv_texture_buffer.push(...[u,v]);
			}
		}
	}
}
