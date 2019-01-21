
var previousClientX = 0,
    previousClientY = 0,
    radio = 30,
    alfa = 0, 
    beta = 0, 
    factorVelocidad = 0.01;

    mouseX=0;
    mouseY=0;
    isMouseDown = false;

    deltaX = 0;
    deltaY = 0;

    fristTime = true ;

    tipoCamara= 1;

class Camara{

    constructor(){}

    eventHandlerView(){
    
        $("#my-canvas").mousemove(function(e){     
            mouseX = e.clientX || e.pageX; 
            mouseY = e.clientY || e.pageY;
        });
        
        $('#my-canvas').mousedown(function(event){	   	
            isMouseDown = true;         
        });
    
        $('body').mouseup(function(event){
            isMouseDown = false;	
            fristTime = true ;   
        });

        //ZOOM con teclas "+" y "-"
        window.addEventListener("keydown", function (e) {
            if ( e.keyCode == 90) {
                radio = radio - 0.0001;
                if (radio < 1) radio =1;
            }
            if ( e.keyCode == 88) {
                radio = radio + 0.0001;
                if(radio > 500 ) radio = 500 ;
            }
            if ( e.keyCode == 81) {
                tipoCamara = 0 ;        
            }
            if ( e.keyCode == 87) {
                tipoCamara = 1 ;        
            }
            if ( e.keyCode == 69) {
                tipoCamara = 2 ;        
            }
            if ( e.keyCode == 82) {
                tipoCamara = 3 ;        
            }
            if ( e.keyCode == 84) {
                tipoCamara = 4 ;        
            }
            if ( e.keyCode == 89) {
                tipoCamara = 5 ;        
            }
            
        }, true);

        if(isMouseDown) {

            if(fristTime){

                previousClientX = mouseX;
                previousClientY = mouseY;   
                fristTime = false;
            }

            deltaX = mouseX - previousClientX;
            deltaY = mouseY - previousClientY;
           
            previousClientX = mouseX;
            previousClientY = mouseY;

            alfa = alfa - deltaX * factorVelocidad;
            beta = beta - deltaY * factorVelocidad;

		    if (alfa<0) alfa=Math.PI*2;
            if (alfa>Math.PI*2) alfa=0;

            if (beta<-Math.PI/2) beta=-Math.PI/2;
            if (beta>Math.PI/2) beta=Math.PI/2;

            //Muestra la posicion del mouse en el canvas
           /* $('#valorDeltaX').html(deltaX);
            $('#valorDeltaY').html(deltaY);

            $('#valorAlfa').html(alfa);
            $('#valorBeta').html(beta); */
        } 
    }

    update(){
        //Tipos de camara
        if(tipoCamara == 0) this.orbitalCamara();
        if(tipoCamara == 1) this.orbitalCentroEscena();
        if(tipoCamara == 2) this.orbitalCentroTortaEstacion1();
        if(tipoCamara == 3) this.orbitalCentroTortaEstacion2();
        if(tipoCamara == 4) this.vistaOrtograficaLateral();
        if(tipoCamara == 5) this.vistaOrtograficaSuperior();
    }

    orbitalCamara(){
    
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = radio * Math.cos(alfa) * Math.cos(beta);
        var y = radio * Math.sin(alfa) * Math.cos(beta);
        var z = radio * Math.sin(beta);

         /**Paso posicion de la camara al shader */
         var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
         gl.uniform3f(u_CameraPos,x,y,z);

        //if(z < 0.25)  z = 0.25 ;

        mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 0], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroEscena(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        //var x = radio * Math.cos(alfa)+3 ;
        //var y = radio * Math.sin(alfa)-5;
        //var z = radio ;
        
        var x = radio * Math.cos(alfa) * Math.cos(beta) + 3;
        var y = radio * Math.sin(alfa) * Math.cos(beta) - 5;
        var z = radio * Math.sin(beta);

        /**Paso posicion de la camara al shader */
        var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
        gl.uniform3f(u_CameraPos,x,y,z);

        mat4.lookAt(viewMatrix, [x, y, z], [3,-5,0], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroTortaEstacion1(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = 2 * Math.cos(alfa) * Math.cos(beta);
        var y = 2 * Math.sin(alfa) * Math.cos(beta) - 5;
        var z = 3 * Math.sin(beta) + 3;
        
        //var x = 2 * Math.cos(alfa);
        //var y = 2 * Math.sin(alfa) - 5;
        //var z = 3 ;

        /**Paso posicion de la camara al shader */
        var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
        gl.uniform3f(u_CameraPos,x,y,z);

        mat4.lookAt(viewMatrix, [x, y, z], [0,-5,2], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    orbitalCentroTortaEstacion2(){

        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();
     
        var x = 2 * Math.cos(alfa) * Math.cos(beta) - 4;
        var y = 2 * Math.sin(alfa) * Math.cos(beta) - 5;
        var z = 4 * Math.sin(beta) + 2;
        
        //var x = 2 * Math.cos(alfa) - 4;
        //var y = 2 * Math.sin(alfa) - 5;
        //var z = 4   ;

        /**Paso posicion de la camara al shader */
        var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
        gl.uniform3f(u_CameraPos,x,y,z);

        mat4.lookAt(viewMatrix, [x, y, z], [-4,-5,2], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    vistaOrtograficaLateral(){
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();

        /**Paso posicion de la camara al shader */
        var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
        gl.uniform3f(u_CameraPos,...[-2, -12, 3]);

        mat4.lookAt(viewMatrix, [-2, -12, 3], [-2,-5,3], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }

    vistaOrtograficaSuperior(){
        //Paso la matriz de vista al shader
        var ubicacion_ViewMatrix = gl.getUniformLocation(glProgram, "uViewMatrix");
        var viewMatrix = mat4.create();

         /**Paso posicion de la camara al shader */
        var u_CameraPos = gl.getUniformLocation(glProgram,"uCameraPos");
        gl.uniform3f(u_CameraPos,...[-2, -6, 9]);

        mat4.lookAt(viewMatrix, [-2, -6, 9], [-2,-5,3], [0,0,1]);

        gl.uniformMatrix4fv(ubicacion_ViewMatrix, false, viewMatrix);
    }
}
