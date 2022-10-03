function primeraA() {
    $('#hijo2').hide();
    $('#parte1').addClass('active');
    $('#parte2').removeClass('active');
    $('#nieto32').css({"background":"url('img/img1/cylinderGood.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center","background-color":"antiquewhite"});
    $('#caben').text('Caben 5 monedas de 1');
    let contadorEvent=0; //NOTA: Ocupe ES5 y no ES6 porque estando en la actividad 1, si me movia a otras actividades 
    // y regresaba a la act 1 me arrojaba el error de que la variable contadorEvent ya existia una ves, "let" no permite nombrar dos iguales
    // pero var si, y finalmente no interesa nombrar otra, solo que contadorEvento comience en 0 y sea global en la pagina.

    // se hace la asociacion de los eventos start y end a cada una de las monedas agrupadas en el array
    for (let i = 0; i < $('.moneda1').length; i++) {
        $('.moneda1')[i].addEventListener('dragstart', dragStart);
        $('.moneda1')[i].addEventListener('dragend', dragEnd);
        $('.moneda1')[i].addEventListener('drop dragdrop', dragDrop);
    }
    // declaro los eventos asociados con el hijo3 que es el recipiente donde caen las monedas,
    // es importante detener las acciones por defecto de los navegadores de no recibir elementos.
    $('#hijo3').on('drop dragdrop', dragDrop); //forma de declarar eventos en JQuery.
    $('#hijo3').on('dragenter', dragEnter);
    $('#hijo3').on('dragover', dragOver);
    $('body').on('drop dragdrop', dragBDrop); //Eventos asociados al body
    $('body').on('dragenter', dragEnter);
    $('body').on('dragover', dragOver);

    // Una funcion para forzar el reinicio si se caen las monedas o se ponen fuera del contenedor.
    function dragBDrop(e) {
        if (window.confirm("CUIDADO se te cayeron las monedas fuera del contenedor, reinicia")) {
            location.reload();
        } else {
            location.reload();
        }
    }
    // se declara que se hara para el this especifico que fue ejecutado o arrastrado en el start
    function dragStart(e) {
        this.style.opacity = '0.5';
        e.dataTransfer.dropEffect='copy';
        e.dataTransfer.effectAllowed='copy';
        e.dataTransfer.setData('text/plain', e.target.id);
        contadorEvent++;
        newcounter=contadorEvent;
        if (contadorEvent>2) { //Contamos cuantos veces se ha activado el evento y bloqueamos el arrastre a partir de 2
            e.dataTransfer.dropEffect='none';
            e.dataTransfer.effectAllowed='none';
            alert("RECUERDA, Solo puedes tomar dos veces los conjunto de monedas");
        }
    }
    // se declara que se hara para el this especifico que fue ejecutado o arrastrado en el start, solo volvemos a pintar la moneda al 100%
    function dragEnd(e) {
        this.style.opacity = '1';
    }
    // declaramos el valor por default de cuando un draggable entra a un contenedor que recibe
    function dragEnter(e) {
        e.preventDefault();
    }
    // declaramos el valor por default de cuando un draggable esta sobre un contenedor que recibe
    function dragOver(e) {
        e.preventDefault();
        return false;
    }
    // se declara la funcion de lo que se hara cuando caen las monedas en el recipiente
    function dragDrop(e) {
        e.stopPropagation(); // detiene el redireccionamiento predeterminado de los navegadores
        let id = e.originalEvent.dataTransfer.getData('text/plain');
        id = parseInt(id); // estaremos trabajando con el identificador de cada moneda
        // creamos una variable de la altura del contenedor de la marimba que iremos modificando sobre la marcha
        //let altact=$('#nieto3').height();
        //alt=altact/5;
        // guardamos la imagen de la moneda en una variable 
        let imagen = new Image();
        imagen.src = 'img/img1/coin.png';

        // Creamos una funcion que cambiando las alturas del contenedor marimba de acuerdo a como se dispongan las monedas
        function marimba(n) {
            if (n===1) {
                //$('#nieto31').height(alt);
                $('#nieto31').css({"background":"url('img/img1/cylinderB1.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===2) {
                //$('#nieto31').height(alt*2);
                $('#nieto31').css({"background":"url('img/img1/cylinderB2.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===3) {
                //$('#nieto31').height(alt*3);
                $('#nieto31').css({"background":"url('img/img1/cylinderB3.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===4) {
                //$('#nieto31').height(alt*4);
                $('#nieto31').css({"background":"url('img/img1/cylinderB4.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===5) {
                //$('#nieto31').height(alt*5);
                $('#nieto31').css({"background":"url('img/img1/cylinderB5.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center","border":"5px solid green"});
            }
        }
        // Para el caso particular de la primera moneda arrojada obtenemos el identificador de que moneda fue
        // y escribimos lo siguiente al vuelo. Recuperamos el valor del contador de la funcion Start
        if(newcounter===1){
            if (id===5) {
                $('#hijo4').append('<div class="alert alert-success"><strong>CORRECTO</strong> <i class="fa-solid fa-check"></i> Metiste las 5 monedas, pero solo tomaste un conjunto. ¿Por qué?. Da click en el 5 para averiguar más de ese número. <br><br> Da click nuevamente en el botón Primera Parte pero arrastra y suelta 2 conjuntos de monedas.</div>'
                );
            }
            // Creamos las sumas al vuelo
            $('#hijo4').append(
                '<h4 id="titSuma">La suma de monedas que estas agregando es:</h4>'+
                '<button class="numberVuelo">'+id+'</button>'+
                '<p class="textVuelo">+ ____ = '+id+'</p>'
            );
            // Asociamos el evento de clic en el primer elemento y se muestran sus sumandos.
            $('.numberVuelo').on('click',NumberValue1);
            // Declaramos la funcion con la que generamos al vuelo exctamente los primeros sumandos del primer elemento.
            function NumberValue1(e) {
                let numBot = parseInt(e.target.innerText);// El numero que tiene el boton en cuestion
                let sumDiv = document.createElement('div');
                sumDiv.setAttribute("class", "sumasVuelo");
        
                if (numBot===1) {
                    let sum1 = document.createTextNode("1+0=1");
                    sumDiv.appendChild(sum1);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click', ()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===2) {
                    let sum1 = document.createTextNode("2+0=2");
                    let sum2 = document.createTextNode("1+1=2");
                    let salto = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===3) {
                    let sum1 = document.createTextNode("3+0=3");
                    let sum2 = document.createTextNode("1+1+1=3");
                    let sum3 = document.createTextNode("1+2=3");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===4) {
                    let sum1 = document.createTextNode("4+0=4");
                    let sum2 = document.createTextNode("1+1+1+1=4");
                    let sum3 = document.createTextNode("1+1+2=4");
                    let sum4 = document.createTextNode("1+3=4");
                    let sum5 = document.createTextNode("2+2=4");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===5) {
                    let sum1 = document.createTextNode("5+0=5");
                    let sum2 = document.createTextNode("1+1+1+1+1=5");
                    let sum3 = document.createTextNode("1+1+1+2=5");
                    let sum4 = document.createTextNode("1+1+3=5");
                    let sum5 = document.createTextNode("1+4=5");
                    let sum6 = document.createTextNode("1+2+2=5");
                    let sum7 = document.createTextNode("2+3=5");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                }
            }
            marimba(id); // hacemos que cambie la altura.
            id1 = id; // id del primer conjunto de monedas arrojado.
        }
        // A continuacion, despues de arrojar la primera moneda, hacemos un censo de cual fue la segunda moneda
        // que se arrojo y con base en esa informacion escribimos la segunda y ultima suma.
        if (newcounter===2) {
            $('.numberVuelo').off('click',NumberValue1);
            if (id===1) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===2) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===3) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===4) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===5) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            // Checamos posibles casos de conclusion de la actividad de acuerdo con lo realizado.
            if ((id1+id)<5){
                $('#hijo4').append(
                    '<div class="alert alert-danger">No llenaste la marimba, debes meter 5 monedas. <strong>RECUERDA</strong> <i class="fa-solid fa-circle-exclamation"></i> Solo puedes tomar dos veces cada conjunto de monedas. <br><br> Intentalo nuevamente dando click en botón Parte 1.</div>'
                );
                $('#nieto31').css("border","5px solid red");
            } else if ((id1+id)>5){
                $('#hijo4').append(
                    '<div class="alert alert-danger"><strong>CUIDADO</strong> <i class="fa-solid fa-circle-exclamation"></i>Te sobran monedas, te has pasado de las 5 monedas que debes meter. <br><br> Intenta nuevamente dando click en el botón Primera Parte cuidando que el total de monedas sume 5.</div>'
                );
                //$('#nieto31').height(alt*5);
                $('#nieto31').css("border","5px solid red");
            } else {
                $('#hijo4').append(
                    '<div class="alert alert-success"><strong>CORRECTO</strong> <i class="fa-solid fa-check"></i> Llenaste el portamonedas con las 5 monedas. Da clik sobre los números y explora sus posibles sumas. <br><br> Pasa a la segunda parte con el botón de arriba.</div>'
                );
            }
            // Asociamos el evento a las clases de botones creados al vuelo dependientes de las monedas previamente arrastradas.
            $('.numberVuelo').on('click',NumberValue);
            // Declaramos la funcion con la que iremos generando al vuelo los primeros sumandos de los numeros manejados, es importante colocarla aquí para que no se repitan los eventos de la primera ronda
            function NumberValue(e) {
                let numBot = parseInt(e.target.innerText);// El numero que tiene el boton en cuestion
                let sumDiv = document.createElement('div');
                sumDiv.setAttribute("class", "sumasVuelo");
        
                if (numBot===1) {
                    let sum1 = document.createTextNode("1+0=1");
                    sumDiv.appendChild(sum1);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click', ()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===2) {
                    let sum1 = document.createTextNode("2+0=2");
                    let sum2 = document.createTextNode("1+1=2");
                    let salto = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===3) {
                    let sum1 = document.createTextNode("3+0=3");
                    let sum2 = document.createTextNode("1+1+1=3");
                    let sum3 = document.createTextNode("1+2=3");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===4) {
                    let sum1 = document.createTextNode("4+0=4");
                    let sum2 = document.createTextNode("1+1+1+1=4");
                    let sum3 = document.createTextNode("1+1+2=4");
                    let sum4 = document.createTextNode("1+3=4");
                    let sum5 = document.createTextNode("2+2=4");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===5) {
                    let sum1 = document.createTextNode("5+0=5");
                    let sum2 = document.createTextNode("1+1+1+1+1=5");
                    let sum3 = document.createTextNode("1+1+1+2=5");
                    let sum4 = document.createTextNode("1+1+3=5");
                    let sum5 = document.createTextNode("1+4=5");
                    let sum6 = document.createTextNode("1+2+2=5");
                    let sum7 = document.createTextNode("2+3=5");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                }
            }
        }
        
    }

    //Hacemos una funcion que cada ves que entre nuevamente a la primera actividad el alumno se borre lo anterior y se desacien los eventos.
    $('#parte1').mousedown('click', function () {
        for (let i = 0; i < $('.moneda1').length; i++) {
            $('.moneda1')[i].removeEventListener('dragstart', dragStart);
            $('.moneda1')[i].removeEventListener('dragend', dragEnd);
            $('.moneda1')[i].removeEventListener('drop dragdrop', dragDrop);
        }
        $('#hijo4').empty();
        $('#hijo3').off();
        $('body').off();
        //$('#nieto31').css({"border":"none","height":"0px"});
        $('#nieto31').css({"background":"none","border":"none"});
    });
    $('#parte2').mousedown('click', function () {
        for (let i = 0; i < $('.moneda1').length; i++) {
            $('.moneda1')[i].removeEventListener('dragstart', dragStart);
            $('.moneda1')[i].removeEventListener('dragend', dragEnd);
            $('.moneda1')[i].removeEventListener('drop dragdrop', dragDrop);
        }
        $('#hijo4').empty();
        $('#hijo3').off();
        $('body').off();
        $('#nieto31').css({"background":"none","border":"none"});
    });
}

function segundaA() {
    $('#parte1').removeClass('active');
    $('#parte2').addClass('active');
    $('#nieto32').css({"background":"url('img/img1/cylinder2Good.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center","background-color":"antiquewhite"});
    $('#hijo2').show();
    $('#caben').text('Caben 10 monedas de 1');
    let contadorEvent=0;

    for (let i = 0; i < $('.moneda1').length; i++) {
        $('.moneda1')[i].addEventListener('dragstart', dragStart);
        $('.moneda1')[i].addEventListener('dragend', dragEnd);
        $('.moneda1')[i].addEventListener('drop dragdrop', dragDrop);
    }
    // declaro los eventos asociados con el hijo3 que es el recipiente donde caen las monedas,
    // es importante detener las acciones por defecto de los navegadores de no recibir elementos.
    $('#hijo3').on('drop dragdrop', dragDrop); //forma de declarar eventos en JQuery.
    $('#hijo3').on('dragenter', dragEnter);
    $('#hijo3').on('dragover', dragOver);
    $('body').on('drop dragdrop', dragBDrop); //Eventos asociados al body
    $('body').on('dragenter', dragEnter);
    $('body').on('dragover', dragOver);

    // Una funcion para forzar el reinicio si se caen las monedas o se ponen fuera del contenedor.
    function dragBDrop(e) {
        if (window.confirm("CUIDADO se te cayeron las monedas fuera del contenedor, reinicia")) {
            location.reload();
        } else {
            location.reload();
        }
    }
    // se declara que se hara para el this especifico que fue ejecutado o arrastrado en el start
    function dragStart(e) {
        this.style.opacity = '0.5';
        e.dataTransfer.dropEffect='copy';
        e.dataTransfer.effectAllowed='copy';
        e.dataTransfer.setData('text/plain', e.target.id);
        contadorEvent++;
        newcounter=contadorEvent;
        if (contadorEvent>2) { //Contamos cuantos veces se ha activado el evento y bloqueamos el arrastre a partir de 2
            e.dataTransfer.dropEffect='none';
            e.dataTransfer.effectAllowed='none';
            alert("RECUERDA, Solo puedes tomar dos veces los conjunto de monedas");
        }
    }
    // se declara que se hara para el this especifico que fue ejecutado o arrastrado en el start, solo volvemos a pintar la moneda al 100%
    function dragEnd(e) {
        this.style.opacity = '1';
    }
    // declaramos el valor por default de cuando un draggable entra a un contenedor que recibe
    function dragEnter(e) {
        e.preventDefault();
    }
    // declaramos el valor por default de cuando un draggable esta sobre un contenedor que recibe
    function dragOver(e) {
        e.preventDefault();
        return false;
    }
    // se declara la funcion de lo que se hara cuando caen las monedas en el recipiente
    function dragDrop(e) {
        e.stopPropagation(); // detiene el redireccionamiento predeterminado de los navegadores
        let id = e.originalEvent.dataTransfer.getData('text/plain');
        id = parseInt(id); // estaremos trabajando con el identificador de cada moneda
        // creamos una variable de la altura del contenedor de la marimba que iremos modificando sobre la marcha
        //let altact=$('#nieto3').height();
        //alt=altact/10;
        // guardamos la imagen de la moneda en una variable 
        let imagen = new Image();
        imagen.src = 'img/img1/coin.png';

        // Creamos una funcion que cambiando las alturas del contenedor marimba de acuerdo a como se dispongan las monedas
        function marimba(n) {
            if (n===1) {
                //$('#nieto31').height(alt);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B1.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===2) {
                //$('#nieto31').height(alt*2);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B2.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===3) {
                //$('#nieto31').height(alt*3);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B3.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===4) {
                //$('#nieto31').height(alt*4);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B4.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===5) {
                //$('#nieto31').height(alt*5);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B5.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===6) {
                //$('#nieto31').height(alt*6);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B6.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===7) {
                //$('#nieto31').height(alt*7);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B7.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===8) {
                //$('#nieto31').height(alt*8);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B8.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===9) {
                //$('#nieto31').height(alt*9);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B9.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
            }
            if (n===10) {
                //$('#nieto31').height(alt*10);
                $('#nieto31').css({"background":"url('img/img1/cylinder2B10.svg')","background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
                $('#nieto31').css("border","5px solid green");
            }
        }
        // Para el caso particular de la primera moneda arrojada obtenemos el identificador de que moneda fue
        // y escribimos lo siguiente al vuelo. Recuperamos el valor del contador de la funcion Start
        if(newcounter===1){
            if (id===10) {
                $('#hijo4').append('<div class="alert alert-success"><strong>CORRECTO</strong> <i class="fa-solid fa-check"></i> Metiste las 10 monedas, pero solo tomaste un conjunto. ¿Por qué?. Da click en el 10 para averiguar más de ese número. <br><br> Da click nuevamente en el botón Segunda Parte pero arrastra y suelta 2 conjuntos de monedas.</div>'
                );
            }
            // Creamos las sumas al vuelo
            $('#hijo4').append(
                '<h4 id="titSuma">La suma de monedas que estas agregando es:</h4>'+
                '<button class="numberVuelo">'+id+'</button>'+
                '<p class="textVuelo">+ ____ = '+id+'</p>'
            );
            // Declaramos la funcion con la que iremos generando al vuelo los primeros sumandos de los numeros manejados, es importante colocarla aquí para que no se repitan los eventos de la primera ronda
            function NumberValue1(e) {
                let numBot = parseInt(e.target.innerText);// El numero que tiene el boton en cuestion
                let sumDiv = document.createElement('div');
                sumDiv.setAttribute("class", "sumasVuelo");
        
                if (numBot===1) {
                    let sum1 = document.createTextNode("1+0=1");
                    sumDiv.appendChild(sum1);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click', ()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===2) {
                    let sum1 = document.createTextNode("2+0=2");
                    let sum2 = document.createTextNode("1+1=2");
                    let salto = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===3) {
                    let sum1 = document.createTextNode("3+0=3");
                    let sum2 = document.createTextNode("1+1+1=3");
                    let sum3 = document.createTextNode("1+2=3");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===4) {
                    let sum1 = document.createTextNode("4+0=4");
                    let sum2 = document.createTextNode("1+1+1+1=4");
                    let sum3 = document.createTextNode("1+1+2=4");
                    let sum4 = document.createTextNode("1+3=4");
                    let sum5 = document.createTextNode("2+2=4");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===5) {
                    let sum1 = document.createTextNode("5+0=5");
                    let sum2 = document.createTextNode("1+1+1+1+1=5");
                    let sum3 = document.createTextNode("1+1+1+2=5");
                    let sum4 = document.createTextNode("1+1+3=5");
                    let sum5 = document.createTextNode("1+4=5");
                    let sum6 = document.createTextNode("1+2+2=5");
                    let sum7 = document.createTextNode("2+3=5");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===6) {
                    let sum1 = document.createTextNode("6+0=6");
                    let sum2 = document.createTextNode("1+1+1+1+1+1=6");
                    let sum3 = document.createTextNode("1+1+1+1+2=6");
                    let sum4 = document.createTextNode("1+1+1+3=6");
                    let sum5 = document.createTextNode("1+1+4=6");
                    let sum6 = document.createTextNode("1+5=6");
                    let sum7 = document.createTextNode("1+1+2+2=6");
                    let sum8 = document.createTextNode("2+2+2=6");
                    let sum9 = document.createTextNode("2+4=6");
                    let sum10 = document.createTextNode("3+3=6");
                    let sum11 = document.createTextNode("1+2+3=6");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    let salto6 = document.createElement('br');
                    let salto9 = document.createElement('br');
                    let salto10 = document.createElement('br');
                    let salto11 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    sumDiv.appendChild(salto6);
                    sumDiv.appendChild(sum8);
                    sumDiv.appendChild(salto9);
                    sumDiv.appendChild(sum9);
                    sumDiv.appendChild(salto10);
                    sumDiv.appendChild(sum10);
                    sumDiv.appendChild(salto11);
                    sumDiv.appendChild(sum11);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===7) {
                    let sum1 = document.createTextNode("7+0=7");
                    let sum2 = document.createTextNode("6+1=7");
                    let sum3 = document.createTextNode("5+2=7");
                    let sum4 = document.createTextNode("4+3=7");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===8) {
                    let sum1 = document.createTextNode("8+0=8");
                    let sum2 = document.createTextNode("7+1=8");
                    let sum3 = document.createTextNode("6+2=8");
                    let sum4 = document.createTextNode("5+3=8");
                    let sum5 = document.createTextNode("4+4=8");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===9) {
                    let sum1 = document.createTextNode("9+0=9");
                    let sum2 = document.createTextNode("8+1=9");
                    let sum3 = document.createTextNode("7+2=9");
                    let sum4 = document.createTextNode("6+3=9");
                    let sum5 = document.createTextNode("5+4=9");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===10) {
                    let sum1 = document.createTextNode("10+0=10");
                    let sum2 = document.createTextNode("9+1=10");
                    let sum3 = document.createTextNode("8+2=10");
                    let sum4 = document.createTextNode("7+3=10");
                    let sum5 = document.createTextNode("6+4=10");
                    let sum6 = document.createTextNode("5+5=10");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                }
            }
            // Asociamos el evento a las clases de botones creados al vuelo dependientes de las monedas previamente arrastradas.
            $('.numberVuelo').on('click',NumberValue1);
            marimba(id); // hacemos que cambie la altura.
            id1 = id; // id del primer conjunto de monedas arrojado.
        }
        // A continuacion, despues de arrojar la primera moneda, hacemos un censo de cual fue la segunda moneda
        // que se arrojo y con base en esa informacion escribimos la segunda y ultima suma.
        if (newcounter===2) {
            $('.numberVuelo').off('click',NumberValue1);
            if (id===1) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===2) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===3) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===4) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===5) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===6) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===7) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===8) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===9) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            if (id===10) {
                $('#hijo4').append(
                    '<br>'+'<br>'+
                    '<button class="numberVuelo">'+id1+'</button> '+
                    '<p class="textVuelo">+ '+
                    '<button class="numberVuelo">'+id+'</button>'+
                    ' = '+(id1+id)+'</p>'
                );
                marimba(id1+id);
            }
            // Checamos posibles casos de conclusion de la actividad de acuerdo con lo realizado.
            if ((id1+id)<10){
                $('#hijo4').append(
                    '<div class="alert alert-danger">No llenaste la marimba, debes meter 10 monedas. <strong>RECUERDA</strong> <i class="fa-solid fa-circle-exclamation"></i> Solo puedes tomar dos veces cada conjunto de monedas. <br><br> Intentalo nuevamente dando click en botón Parte 2.</div>'
                );
                $('#nieto31').css("border","5px solid red");
            } else if ((id1+id)>10){
                $('#hijo4').append(
                    '<div class="alert alert-danger"><strong>CUIDADO</strong> <i class="fa-solid fa-circle-exclamation"></i>Te sobran monedas, te has pasado de las 10 monedas que debes meter. <br><br> Intenta nuevamente dando click en el botón Segunda Parte cuidando que el total de monedas sume 10.</div>'
                );
                //$('#nieto31').height(alt*10);
                $('#nieto31').css("border","5px solid red");
            } else {
                $('#hijo4').append(
                    '<div class="alert alert-success"><strong>CORRECTO</strong> <i class="fa-solid fa-check"></i> Llenaste el portamonedas con las 10 monedas. Da clik sobre los números y explora sus posibles sumas. <br><br> Intenta hacer otra suma de monedas que resulte 10, da click en Segunda Parte o pasa a otra actividad.</div>'
                );
            }
            // Declaramos la funcion con la que iremos generando al vuelo los primeros sumandos de los numeros manejados, es importante colocarla aquí para que no se repitan los eventos de la primera ronda
            function NumberValue(e) {
                let numBot = parseInt(e.target.innerText);// El numero que tiene el boton en cuestion
                let sumDiv = document.createElement('div');
                sumDiv.setAttribute("class", "sumasVuelo");
        
                if (numBot===1) {
                    let sum1 = document.createTextNode("1+0=1");
                    sumDiv.appendChild(sum1);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click', ()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===2) {
                    let sum1 = document.createTextNode("2+0=2");
                    let sum2 = document.createTextNode("1+1=2");
                    let salto = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===3) {
                    let sum1 = document.createTextNode("3+0=3");
                    let sum2 = document.createTextNode("1+1+1=3");
                    let sum3 = document.createTextNode("1+2=3");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===4) {
                    let sum1 = document.createTextNode("4+0=4");
                    let sum2 = document.createTextNode("1+1+1+1=4");
                    let sum3 = document.createTextNode("1+1+2=4");
                    let sum4 = document.createTextNode("1+3=4");
                    let sum5 = document.createTextNode("2+2=4");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===5) {
                    let sum1 = document.createTextNode("5+0=5");
                    let sum2 = document.createTextNode("1+1+1+1+1=5");
                    let sum3 = document.createTextNode("1+1+1+2=5");
                    let sum4 = document.createTextNode("1+1+3=5");
                    let sum5 = document.createTextNode("1+4=5");
                    let sum6 = document.createTextNode("1+2+2=5");
                    let sum7 = document.createTextNode("2+3=5");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===6) {
                    let sum1 = document.createTextNode("6+0=6");
                    let sum2 = document.createTextNode("1+1+1+1+1+1=6");
                    let sum3 = document.createTextNode("1+1+1+1+2=6");
                    let sum4 = document.createTextNode("1+1+1+3=6");
                    let sum5 = document.createTextNode("1+1+4=6");
                    let sum6 = document.createTextNode("1+5=6");
                    let sum7 = document.createTextNode("1+1+2+2=6");
                    let sum8 = document.createTextNode("2+2+2=6");
                    let sum9 = document.createTextNode("2+4=6");
                    let sum10 = document.createTextNode("3+3=6");
                    let sum11 = document.createTextNode("1+2+3=6");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    let salto5 = document.createElement('br');
                    let salto6 = document.createElement('br');
                    let salto9 = document.createElement('br');
                    let salto10 = document.createElement('br');
                    let salto11 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    sumDiv.appendChild(salto5);
                    sumDiv.appendChild(sum7);
                    sumDiv.appendChild(salto6);
                    sumDiv.appendChild(sum8);
                    sumDiv.appendChild(salto9);
                    sumDiv.appendChild(sum9);
                    sumDiv.appendChild(salto10);
                    sumDiv.appendChild(sum10);
                    sumDiv.appendChild(salto11);
                    sumDiv.appendChild(sum11);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===7) {
                    let sum1 = document.createTextNode("7+0=7");
                    let sum2 = document.createTextNode("6+1=7");
                    let sum3 = document.createTextNode("5+2=7");
                    let sum4 = document.createTextNode("4+3=7");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===8) {
                    let sum1 = document.createTextNode("8+0=8");
                    let sum2 = document.createTextNode("7+1=8");
                    let sum3 = document.createTextNode("6+2=8");
                    let sum4 = document.createTextNode("5+3=8");
                    let sum5 = document.createTextNode("4+4=8");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===9) {
                    let sum1 = document.createTextNode("9+0=9");
                    let sum2 = document.createTextNode("8+1=9");
                    let sum3 = document.createTextNode("7+2=9");
                    let sum4 = document.createTextNode("6+3=9");
                    let sum5 = document.createTextNode("5+4=9");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                } else if (numBot===10) {
                    let sum1 = document.createTextNode("10+0=10");
                    let sum2 = document.createTextNode("9+1=10");
                    let sum3 = document.createTextNode("8+2=10");
                    let sum4 = document.createTextNode("7+3=10");
                    let sum5 = document.createTextNode("6+4=10");
                    let sum6 = document.createTextNode("5+5=10");
                    let salto = document.createElement('br');
                    let salto1 = document.createElement('br');
                    let salto2 = document.createElement('br');
                    let salto3 = document.createElement('br');
                    let salto4 = document.createElement('br');
                    sumDiv.appendChild(sum1);
                    sumDiv.appendChild(salto);
                    sumDiv.appendChild(sum2);
                    sumDiv.appendChild(salto1);
                    sumDiv.appendChild(sum3);
                    sumDiv.appendChild(salto2);
                    sumDiv.appendChild(sum4);
                    sumDiv.appendChild(salto3);
                    sumDiv.appendChild(sum5);
                    sumDiv.appendChild(salto4);
                    sumDiv.appendChild(sum6);
                    e.target.appendChild(sumDiv);
                    if (sumDiv.innerHTML!=null) {
                        $('.numberVuelo').on('click',()=>{sumDiv.style.display="none"});
                    }
                }
            }
            // Asociamos el evento a las clases de botones creados al vuelo dependientes de las monedas previamente arrastradas.
            $('.numberVuelo').on('click',NumberValue);
        }
    }

    //Hacemos una funcion que cada ves que entre nuevamente a la primera actividad el alumno se borre lo anterior y se desacien los eventos.
    $('#parte2').mousedown('click', function () {
        for (let i = 0; i < $('.moneda1').length; i++) {
            $('.moneda1')[i].removeEventListener('dragstart', dragStart);
            $('.moneda1')[i].removeEventListener('dragend', dragEnd);
            $('.moneda1')[i].removeEventListener('drop dragdrop', dragDrop);
        }
        $('#hijo4').empty();
        $('#hijo3').off();
        $('body').off();
        $('#nieto31').css({"border":"none"});
    });
    $('#parte1').mousedown('click', function () {
        for (let i = 0; i < $('.moneda1').length; i++) {
            $('.moneda1')[i].removeEventListener('dragstart', dragStart);
            $('.moneda1')[i].removeEventListener('dragend', dragEnd);
            $('.moneda1')[i].removeEventListener('drop dragdrop', dragDrop);
        }
        $('#hijo4').empty();
        $('#hijo3').off();
        $('body').off();
        $('#nieto31').css({"border":"none"});
    });
}

$('#hijo2').hide();

$('#parte1').mouseup('click', primeraA);
$('#parte2').mouseup('click', segundaA);