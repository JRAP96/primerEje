var canvas = document.getElementById("canvas1");

if (canvas && canvas.getContext) {  // Nos aseguramos que se cargue el contexto para dibujar todo
    let cuadros = [];
    let tamanoCuadro = 40;
    let colorElegido = "blue";
    let ctx = canvas.getContext("2d");
    if(ctx) {
        function dibujar(lado, grosorLinea, color) {    //Dibujamos la reticula y hacemos un arreglo con los cuadros 2d
            let sisze = (lado/2).toString()+'px';   // Nos fijamos el tamano de los cuadros para especificar el tamano de la letra.
            ctx.strokeStyle = color;
            ctx.lineWidth = grosorLinea;
            ctx.font = sisze+' '+'serif';
            ctx.textAlign = 'left';
            ctx.fillStyle = "rgb(0,0,0)"; // Ponemos el ctx en negro siempre que entremos
            let contadorNumber = 0; // Cada ves que ingresemos a la funcion se inicializara en cero el contador de los numeros.
            let cols = [];  // Guardamos en un arreglo las posiciones los vertices de las filas y las columnas
            let fils = [];
            cols.push(0);   // Agregamos a mano el primer valor de cada arreglo de fila y columna
            fils.push(0);
            for (i = lado; i < canvas.width; i += lado) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
                cols.push(i);   //Pintamos cada linea vertical y guardamos la informacion en la columna
            }
            for (i = lado; i < canvas.height; i += lado) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
                fils.push(i);   // Pintamos cada linea horizontal y guardamos la informacion en el arreglo filas
            }
            for (x = 0; x < cols.length; x++) {     // Hacemos el arreglo de cuadritos, CUIDADO, estan al revez x->y y y->x
                for (y = 0; y < fils.length; y++) {
                    contadorNumber++;
                    cuadros.push([fils[y],cols[x],lado,lado,contadorNumber]);   //Hacemos un arreglo bidimensional que nos da la informacion de cada cuadro, incluimos tambien el numero identificador de cada cuadro
                    ctx.fillText(contadorNumber.toString(),fils[y],cols[x+1]);    // Escribrimos el numero que corresponde a cada cuadro, teniendo cuidado de donde se escribe en el canvas
                }
            }
            for (let i = 90; i < 100; i++) {
                ctx.fillText(cuadros[i][4].toString(),cuadros[i][0],cuadros[i][1]+lado);
            }
        }
        function conteo(x, y) {                             // Hacemos una funcion que identifica cada cuadro dependiendo de la posicion
            ctx.fillStyle = "rgba(50,50,200,0.1)";          // del usuario, por lo que se llamara la posicion x e y , y asi se identifica el cuadro correspondiente
            for (i = 0; i < cuadros.length; i++) {
                let cuadrito = cuadros[i];
                if (
                    x > cuadrito[0] &&
                    x < cuadrito[0] + cuadrito[2] &&
                    y > cuadrito[1] &&
                    y < cuadrito[1] + cuadrito[3]
                ) {
                    $('#hijo21').text('Número '+cuadrito[4].toString()+', Selecciona boton de Parte 1');  // Aprovecho que se identifico cada cuadrito y le extraigo su etiqueta del numero que le corresponde
                    ctx.fillRect(   // Ahi mismo resalto en otro color los cuadro seleccionados por el alumno.
                    cuadrito[0],
                    cuadrito[1],
                    tamanoCuadro,
                    tamanoCuadro
                    );
                    break;
                }
            }
        }
        function reto1() {          // funcion para lo que acurre cuando se elige la 1era Parte (conteos en una fila menor que la decena)
            $('.boton').removeAttr("disabled"); // Habuilitamos los botones de actvs
            ctx.clearRect(0,0,canvas.width,canvas.height);  // Borro el canvas completo.
            dibujar(tamanoCuadro,0.5,colorElegido); // Llamo nuevamente a la funcion dibujar para que borre lo que habia previamente.
            let randomNow = cuadros[random(1,100)][4]; // Hago una seleccion random del cuadro o numero inicial
            $('#hijo21').html('<label id="textopO" class="texto"></label>'+'<p id="pO" class="texto"></p>');
            $('#textopO').text("Posición Original");
            $('#pO').text('Selecciona el cuadro con el número: '+ randomNow);
            canvas.onclick = function(e){
                let spot = canvas.getBoundingClientRect();
                let x= e.clientX - spot.left;
                let y= e.clientY - spot.top;
                for (i = 0; i < cuadros.length; i++) {
                    let cuadrito = cuadros[i];
                    if (
                        x > cuadrito[0] &&
                        x < cuadrito[0] + cuadrito[2] &&
                        y > cuadrito[1] &&
                        y < cuadrito[1] + cuadrito[3]
                    ) {
                        if(cuadrito[4]===randomNow){
                            $('#segunda').attr("disabled", "disabled"); // Ya entrando en este condicional desactivamos la posibilidad de irse  a otras actividades
                            $('#primera').attr("disabled", "disabled");
                            $('#tercera').attr("disabled", "disabled");
                            $('#cuarta').attr("disabled", "disabled");
                            canvas.onclick=null;    // Ya bien posicionado no permitimos los eventos de click sobre el canvas, para que se centre la atencion en el control de botones y conteo.
                            let l = 0;
                            l = parseFloat(((randomNow/10)-Math.floor(randomNow/10)).toFixed(2));   // l indica una posicion decimal que nos sirve de guia para ver en dande cayo el numero y no pasarnos en el conteo de la decena en cuestion
                            let counter = 0; // metemos un contador para controlar el numero de veces que el alumno aprieta botones de dirrecion.
                            ctx.fillStyle = "rgba(50,200,50,0.2)"; 
                            $('#hijo22').html(
                                '<label id="textopA" class="texto"></label>'+
                                '<p id="pA" class="texto"></p>');
                            $('#pO').text('Correcto estás en el cuadro '+cuadrito[4].toString()); 
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Número: '+cuadrito[4].toString()+', continua con las intrucciones ubicadas arriba');
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                            );
                            if (l==0) { // Checamos donde ha caido el random y con base en eso pediremos aumentar o disminuir columnas
                                let caso = 0;
                                caso = random(1,9);
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 1</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt4').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i--;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#segunda').removeAttr("disabled"); // cumplida la actividad devuelvo los valores activos de los botones de otras actividades
                                            $('#primera').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            } else if (l<=0.5 && l!=0) {
                                let caso =0;
                                caso = random(1,5);
                                $('#instruccion').html('Con el boton <span class="btninst">Suma 1</span> cuenta '+caso+' casillas más.<br> ¿A cuál número llegas? '+cuadrito[4]+'+'+caso+'=¿Cuál?');
                                $('#bt3').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i++;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(132, 223, 255, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Sumar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Suma 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' + '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('+1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            } else {
                                let caso =0;
                                caso = random(1,5);
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 1</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt4').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i--;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            }
                            break;  // Evita que el programa siga sobreescribiendo datos. sale del bucle cuando entra.
                        } else {
                            ctx.fillStyle = "rgba(200,50,50,0.2)";
                            $('#hijo22').html('<label id="textopA" class="texto"></label>'+'<p id="pA" class="texto"></p>');
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Estas en el número: '+cuadrito[4].toString()+', debes ir al '+ randomNow);
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                                );
                            break;
                        }
                    }
                }
            };
        }
        function reto2() {
            $('.boton').removeAttr("disabled");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            dibujar(tamanoCuadro,0.5,colorElegido);
            let randomNow = cuadros[random(1,100)][4];
            $('#hijo21').html('<label id="textopO" class="texto"></label>'+'<p id="pO" class="texto"></p>');
            $('#textopO').text("Posición Original");
            $('#pO').text('Selecciona el cuadro con el número: '+ randomNow);
            canvas.onclick = function(e){
                let spot = canvas.getBoundingClientRect();
                let x= e.clientX - spot.left;
                let y= e.clientY - spot.top;
                for (i = 0; i < cuadros.length; i++) {
                    let cuadrito = cuadros[i];
                    if (
                        x > cuadrito[0] &&
                        x < cuadrito[0] + cuadrito[2] &&
                        y > cuadrito[1] &&
                        y < cuadrito[1] + cuadrito[3]
                    ) {
                        if(cuadrito[4]===randomNow){
                            $('#primera').attr("disabled", "disabled");
                            $('#segunda').attr("disabled", "disabled");
                            $('#tercera').attr("disabled", "disabled");
                            $('#cuarta').attr("disabled", "disabled");
                            canvas.onclick=null;
                            let l = 0;
                            l = parseFloat(((randomNow/100)-Math.floor(randomNow/100)).toFixed(2));   // l indica en que lugar de la columna se encuentra.
                            let counter = 0;
                            ctx.fillStyle = "rgba(50,200,50,0.2)"; 
                            $('#hijo22').html(
                                '<label id="textopA" class="texto"></label>'+
                                '<p id="pA" class="texto"></p>');
                            $('#pO').text('Correcto estás en el cuadro '+cuadrito[4].toString()); 
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Número: '+cuadrito[4].toString()+', continua con las intrucciones ubicadas arriba');
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                            );
                            if (0.9<l || l==0) { // Checamos donde ha caido el random y con base en eso pediremos aumentar o disminuir filas
                                let casoprev = 0;
                                casoprev = random(1,9);
                                let caso = casoprev*10;
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 10</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt1').on('click',function(){
                                    if (counter<casoprev) {
                                        counter++;
                                        i=i-10;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(220, 150, 238, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar filas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 10');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+(counter*10).toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-10');
                                        }
                                        if (counter==casoprev) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            } else if (l<=0.5 && l!=0) {
                                let casoprev = 0;
                                casoprev = random(1,5);
                                let caso = casoprev*10;
                                $('#instruccion').html('Con el boton <span class="btninst">Suma 10</span> cuenta '+caso+' casillas más.<br> ¿A cuál número llegas? '+cuadrito[4]+'+'+caso+'=¿Cuál?');
                                $('#bt2').on('click',function(){
                                    if (counter<casoprev) {
                                        counter++;
                                        i=i+10;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(81, 107, 235, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Sumar filas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Suma 10');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' + '+(counter*10).toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('+10');
                                        }
                                        if (counter==casoprev) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            } else {
                                let casoprev = 0;
                                casoprev = random(1,5);
                                let caso = casoprev*10;
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 10</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt1').on('click',function(){
                                    if (counter<casoprev) {
                                        counter++;
                                        i=i-10;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(220, 150, 238, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar filas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 10');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+(counter*10).toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-10');
                                        }
                                        if (counter==casoprev) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                });
                            }
                            break;
                        } else {
                            ctx.fillStyle = "rgba(200,50,50,0.2)";
                            $('#hijo22').html('<label id="textopA" class="texto"></label>'+'<p id="pA" class="texto"></p>');
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Estas en el número: '+cuadrito[4].toString()+', debes ir al '+ randomNow);
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                                );
                            break;
                        }
                    }
                }
            };
        }
        function reto3() {
            $('.boton').removeAttr("disabled");
            let i = 0;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            dibujar(tamanoCuadro,0.5,colorElegido);
            let rm = random(5,93);
            let randomNow = cuadros[rm][4]; // Hago una seleccion random del cuadro o numero inicial, cortandolo en 94 para evitar problemas de desbordamiento sobre 100
            $('#hijo21').html('<label id="textopO" class="texto"></label>'+'<p id="pO" class="texto"></p>');
            $('#textopO').text("Posición Original");
            $('#pO').text('Selecciona el cuadro con el número: '+ randomNow);
            canvas.onclick = function(e){
                let spot = canvas.getBoundingClientRect();
                let x= e.clientX - spot.left;
                let y= e.clientY - spot.top;
                for (i = 0; i < cuadros.length; i++) {
                    let cuadrito = cuadros[i];
                    if (
                        x > cuadrito[0] &&
                        x < cuadrito[0] + cuadrito[2] &&
                        y > cuadrito[1] &&
                        y < cuadrito[1] + cuadrito[3]
                    ) {
                        if(cuadrito[4]===randomNow){
                            $('#primera').attr("disabled", "disabled");
                            $('#segunda').attr("disabled", "disabled");
                            $('#tercera').attr("disabled", "disabled");
                            $('#cuarta').attr("disabled", "disabled");
                            //$('#tercera').attr("disabled", "disabled");
                            canvas.onclick=null;    
                            let l = 0;
                            l = parseFloat(((randomNow/10)-Math.floor(randomNow/10)).toFixed(2));   
                            let counter = 0; // metemos un contador para controlar el numero de veces que el alumno aprieta botones de dirrecion.
                            ctx.fillStyle = "rgba(50,200,50,0.2)"; 
                            $('#hijo22').html(
                                '<label id="textopA" class="texto"></label>'+
                                '<p id="pA" class="texto"></p>');
                            $('#pO').text('Correcto estás en el cuadro '+cuadrito[4].toString()); 
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Número: '+cuadrito[4].toString()+', continua con las intrucciones ubicadas arriba');
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                            );
                            if (l<0.5 && l!=0) { // Checamos donde ha caido el random y con base en eso pediremos aumentar o disminuir columnas
                                let caso = 0;
                                caso = random(1,9);
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 1</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt4').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i--;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que conseguiste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                }); break;
                            } else if (l>=0.5) {
                                let caso =0;
                                caso = random(6,9);
                                $('#instruccion').html('Con el boton <span class="btninst">Suma 1</span> cuenta '+caso+' casillas más.<br> ¿A cuál número llegas? '+cuadrito[4]+'+'+caso+'=¿Cuál?');
                                $('#bt3').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i++;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(132, 223, 255, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Sumar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Suma 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' + '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('+1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que conseguiste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                }); break;
                            } else if (l==0) {
                                let caso =0;
                                caso = random(1,4);
                                $('#instruccion').html('Con el boton <span class="btninst">Suma 1</span> cuenta '+caso+' casillas más.<br> ¿A cuál número llegas? '+cuadrito[4]+'+'+caso+'=¿Cuál?');
                                $('#bt3').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i++;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(132, 223, 255, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Sumar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Suma 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' + '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('+1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que conseguiste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                }); break;
                            } else {
                                let caso =0;
                                caso = random(5,9);
                                $('#instruccion').html('Con el boton <span class="btninst">Resta 1</span> cuenta '+caso+' casillas menos.<br> ¿A cuál número llegas? '+cuadrito[4]+'-'+caso+'=¿Cuál?');
                                $('#bt4').on('click',function(){
                                    if (counter<caso) {
                                        counter++;
                                        i--;
                                        cuadrito = cuadros[i];
                                        ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                        ctx.fillRect(
                                            cuadrito[0],
                                            cuadrito[1],
                                            tamanoCuadro,
                                            tamanoCuadro
                                        );
                                        $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                        $('#acc').text('Restar columnas');
                                        $('#textoacc').text('Acción');
                                        $('#hijo24').html('<label class="texto" id="textosig"></label>'+'<p id="mov" class="texto"></p>');
                                        $('#mov').text('Resta 1');
                                        $('#textosig').text('Significado');
                                        $('#hijo25').html('<label class="texto" id="textooA"></label>'+'<p id="oA" class="texto"></p>');
                                        $('#textooA').text('Operación Aritmética');
                                        $('#pA').text(cuadrito[4].toString());
                                        $('#oA').html(randomNow.toString()+' - '+counter.toString()+' = '+cuadrito[4].toString()+'<br>'+randomNow+'<span id="oA1"></span>'+' = '+cuadrito[4]);
                                        for (let i = 0; i < counter; i++) {
                                            $('#oA1').append('-1');
                                        }
                                        if (counter==caso) {
                                            ctx.lineWidth = 5;
                                            ctx.strokeStyle = "rgb(0,250,0)";
                                            ctx.strokeRect(
                                                cuadrito[0],
                                                cuadrito[1],
                                                tamanoCuadro,
                                                tamanoCuadro
                                            );
                                            $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que conseguiste');
                                            $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                            $('#primera').removeAttr("disabled");
                                            $('#segunda').removeAttr("disabled");
                                            $('#tercera').removeAttr("disabled");
                                            $('#cuarta').removeAttr("disabled");
                                        }
                                    }
                                }); break;
                            }
                        } else {
                            ctx.fillStyle = "rgba(200,50,50,0.2)";
                            $('#hijo22').html('<label id="textopA" class="texto"></label>'+'<p id="pA" class="texto"></p>');
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Estas en el número: '+cuadrito[4].toString()+', debes ir al '+ randomNow);
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                                );
                            break;
                        }
                    }
                }
            };
        }
        function reto4 () {
            $('.boton').removeAttr("disabled");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            dibujar(tamanoCuadro,0.5,colorElegido);
            let randomNow = cuadros[random(1,90)][4];
            $('#hijo21').html('<label id="textopO" class="texto"></label>'+'<p id="pO" class="texto"></p>');
            $('#textopO').text("Posición Original");
            $('#pO').text('Selecciona el cuadro con el número: '+ randomNow);
            canvas.onclick = function(e){
                let spot = canvas.getBoundingClientRect();
                let x= e.clientX - spot.left;
                let y= e.clientY - spot.top;
                for (i = 0; i < cuadros.length; i++) {
                    let cuadrito = cuadros[i];
                    if (
                        x > cuadrito[0] &&
                        x < cuadrito[0] + cuadrito[2] &&
                        y > cuadrito[1] &&
                        y < cuadrito[1] + cuadrito[3]
                    ) {
                        if (cuadrito[4]===randomNow) {
                            $('#primera').attr("disabled", "disabled");
                            $('#segunda').attr("disabled", "disabled");
                            $('#tercera').attr("disabled", "disabled");
                            $('#cuarta').attr("disabled", "disabled");
                            canvas.onclick=null;
                            let counter = 0;
                            let ctn = 0;
                            let ctn1 = 0;
                            let ctn2 = 0;
                            let ctn3 = 0;
                            let ctnSum = randomNow;
                            ctx.fillStyle = "rgba(50,200,50,0.5)"; 
                            $('#hijo22').html(
                                '<label id="textopA" class="texto"></label>'+
                                '<p id="pA" class="texto"></p>');
                            $('#pO').text('Correcto estás en el cuadro '+cuadrito[4].toString()); 
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Número: '+cuadrito[4].toString()+', continua con las instrucciones ubicadas arriba');
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                            );
                            $('#instruccion').html('"Con los botones <span class="btninst">Resta 1</span>, <span class="btninst">Resta 10</span>, <span class="btninst">Suma 1</span> y <span class="btninst">Suma 10</span> llega al número con marco verde"<br>"¿Cuánto debes sumar o restar para llegar?"<br><label class="texto" id="textooA"></label>  <p id="oA" class="texto"><span class="oA1"></span><span id="oA2"></span><span class="oA3"></span>   <br> <span class="oA1"></span><span id="oA7"></span><span id="oA71"></span><span id="oA72"></span><span id="oA73"></span><span class="oA3""></span> <br>  <span class="oA1"></span><span id="oA4"></span><span class="oA3"></span></p>');
                            if (randomNow>=55) {
                                let caso = 0;
                                caso = random(1,54);
                                ctx.lineWidth = 5;
                                ctx.strokeStyle = "rgb(0,250,0)";
                                ctx.strokeRect(
                                    cuadros[caso][0],
                                    cuadros[caso][1],
                                    tamanoCuadro,
                                    tamanoCuadro
                                );
                                $('#bt1').on('click',function() {
                                    $('#bt2').removeAttr("disabled");
                                    ctn++;
                                    counter = counter-10;
                                    i=i-10;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(220, 150, 238, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Restar 10');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA7').text('-'+(ctn*10).toString());
                                    document.getElementById('oA2').innerHTML+='-10';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4]<=10) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes subir más, permanece en la tabla');
                                        $('#bt1').attr("disabled", "disabled");
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                });
                                $('#bt2').on('click',function() {
                                    $('#bt1').removeAttr("disabled");
                                    ctn1++;
                                    counter = counter+10;
                                    i=i+10;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(81, 107, 235, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Sumar 10');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(randomNow.toString())
                                    $('#oA71').text('+'+(ctn1*10).toString());
                                    document.getElementById('oA2').innerHTML+='+10';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]>=91) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes bajar más, permanece en la tabla');
                                        $('#bt2').attr("disabled", "disabled");
                                    }
                                });
                                $('#bt3').on('click',function() {
                                    $('#bt4').removeAttr("disabled");
                                    ctn2++;
                                    counter = counter+1;
                                    i=i+1;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(132, 223, 255, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Sumar 1');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA72').text('+'+(ctn2).toString());
                                    document.getElementById('oA2').innerHTML+='+1';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]==100) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes avanzar más, permanece en la tabla');
                                        $('#bt3').attr("disabled", "disabled");
                                    }
                                });
                                $('#bt4').on('click',function() {
                                    $('#bt3').removeAttr("disabled");
                                    ctn3++;
                                    counter = counter-1;
                                    i=i-1;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Restar 1');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA73').text('-'+(ctn3).toString());
                                    document.getElementById('oA2').innerHTML+='-1';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]==1) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes retroceder más, permanece en la tabla');
                                        $('#bt4').attr("disabled", "disabled");
                                    }
                                }); 
                                break;
                            } else if (randomNow<=54) {
                                let caso = 0;
                                caso = random(55,100);
                                ctx.lineWidth = 5;
                                ctx.strokeStyle = "rgb(0,250,0)";
                                ctx.strokeRect(
                                    cuadros[caso][0],
                                    cuadros[caso][1],
                                    tamanoCuadro,
                                    tamanoCuadro
                                );
                                $('#bt1').on('click',function() {
                                    $('#bt2').removeAttr("disabled");
                                    ctn++;
                                    counter = counter-10;
                                    i=i-10;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(220, 150, 238, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Restar 10');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA7').text('-'+(ctn*10).toString());
                                    document.getElementById('oA2').innerHTML+='-10';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]<=10) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes subir más, permanece en la tabla');
                                        $('#bt1').attr("disabled", "disabled");
                                    }
                                });
                                $('#bt2').on('click',function() {
                                    $('#bt1').removeAttr("disabled");
                                    ctn1++;
                                    counter = counter+10;
                                    i=i+10;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(81, 107, 235, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Sumar 10');
                                    //$('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA71').text('+'+(ctn1*10).toString());
                                    document.getElementById('oA2').innerHTML+='+10';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]>=91) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes bajar más, permanece en la tabla');
                                        $('#bt2').attr("disabled", "disabled");
                                    }
                                });
                                $('#bt3').on('click',function() {
                                    $('#bt4').removeAttr("disabled");
                                    ctn2++;
                                    counter = counter+1;
                                    i=i+1;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(132, 223, 255, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Sumar 1');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA72').text('+'+(ctn2).toString());
                                    document.getElementById('oA2').innerHTML+='+1';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]==100) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes avanzar más, permanece en la tabla');
                                        $('#bt3').attr("disabled", "disabled");
                                    }
                                });
                                $('#bt4').on('click',function() {
                                    $('#bt3').removeAttr("disabled");
                                    ctn3++;
                                    counter = counter-1;
                                    i=i-1;
                                    cuadrito = cuadros[i];
                                    ctx.fillStyle = "rgba(255, 245, 130, 0.4)";
                                    ctx.fillRect(
                                        cuadrito[0],
                                        cuadrito[1],
                                        tamanoCuadro,
                                        tamanoCuadro
                                    );
                                    $('#hijo23').html('<label class="texto" id="textoacc"></label>'+'<p id="acc" class="texto"></p>');
                                    $('#acc').text('Restar 1');
                                    $('#textoacc').text('Acción');
                                    $('#textooA').text('Operación Aritmética');
                                    $('#pA').text(cuadrito[4].toString());
                                    $('.oA1').text(ctnSum.toString());
                                    $('#oA73').text('-'+(ctn3).toString());
                                    document.getElementById('oA2').innerHTML+='-1';
                                    $('.oA3').text(' = '+cuadrito[4].toString());
                                    if (counter>=0) {
                                        $('#oA4').text('+'+ counter.toString());
                                    } else if (counter<0) {
                                        $('#oA4').text(counter.toString());
                                    }
                                    if (cuadrito[4] == cuadros[caso][4]) {
                                        $('#pA').text('Número: '+cuadrito[4].toString()+'. Lo lograste, mira la operación que obtuviste y la ruta hecha en la tabla');
                                        $('#pA').css({'color':'blue', 'font-weight':'bold'});
                                        $('#oA4').css({'color':'black', 'font-weight':'bolder'});
                                        $('.boton').attr("disabled", "disabled");
                                        $('#primera').removeAttr("disabled");
                                        $('#segunda').removeAttr("disabled");
                                        $('#tercera').removeAttr("disabled");
                                        $('#cuarta').removeAttr("disabled");
                                        $('.boton').off('click');
                                    }
                                    if (cuadrito[4]==1) {
                                        $('#pA').text(cuadrito[4].toString()+', NO puedes retroceder más, permanece en la tabla');
                                        $('#bt4').attr("disabled", "disabled");
                                    }
                                });
                            }
                            break;
                        } else {
                            ctx.fillStyle = "rgba(200,50,50,0.2)";
                            $('#hijo22').html('<label id="textopA" class="texto"></label>'+'<p id="pA" class="texto"></p>');
                            $('#textopA').text("Posición Actual");
                            $('#pA').text('Estas en el número: '+cuadrito[4].toString()+', debes ir al '+ randomNow);
                            ctx.fillRect(
                                cuadrito[0],
                                cuadrito[1],
                                tamanoCuadro,
                                tamanoCuadro
                                );
                            break;
                        }
                    }
                }
            }
        }
        function random(min, max) {
            let i = Math.floor((Math.random() * (max - min + 1)) + min);
            return i;
        }

    dibujar(tamanoCuadro,0.5,colorElegido); // Llamo a la funcion que dibuja la reticula

    $('#primera').mouseup(reto1);//$('#primera').mouseup(reto1);  // Asocio el evento al boton Parte 1, se ejecuta toda la funcion despues de haber borrado lo anterior
    $('#primera').mousedown(function(){ $('.textoBorrable').empty(); });    // Se borra primero lo de la pantalla para mostrar la funcion del primer reto

    $('#segunda').mouseup(reto2);   // Asociamos el evento al boton de parte 2
    $('#segunda').mousedown(function(){ $('.textoBorrable').empty(); });

    $('#tercera').mouseup(reto3);   // Asociamos el evento al boton de parte 3
    $('#tercera').mousedown(function(){ $('.textoBorrable').empty(); });

    $('#cuarta').mouseup(reto4);  //$('#cuarta').click(reto4);   // Asociamos el evento al boton de parte 4
    $('#cuarta').mousedown(function(){ 
        $('.textoBorrable').empty(); 
    });

    canvas.onclick = function(e) {          // Llamos a la funcion que identifica de que cuadro se trata con el evento click
        let spot = canvas.getBoundingClientRect();  // Y asociando la respectiva coordenada del cliente a las coordenadas del canvas.
        conteo(e.clientX - spot.left, e.clientY - spot.top);
    };
    }
} else {
    alert('No se cargo el canvas');
}