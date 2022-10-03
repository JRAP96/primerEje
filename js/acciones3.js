function comenzar() {
    let oNumber = Math.floor((Math.random() * (100 - 10 + 1)) + 10); //Primero se genera un numero aleatorio entre 10 y 100 ya que se da comenzar
    $('#originalText').text(oNumber.toString());
    $('.inputNumber').removeAttr("disabled"); // Y se activan los primeros inputs para que puedan escribir
    $('.inputNumberx').attr("disabled","disabled"); // Permanecen desactivados los segundos inputs
    $('.inputNumber').val(''); // Limpiamos los resultados del juego cada ves que comenzamos nuevamente con dando clic en el boton del numero random.
    $('label').empty();
    $('.tit').text('Consumo de sustancia química');
    $('.cont2').css({'border':'0px', 'height':'0px'});
    $('.cont4').css({'border':'0px', 'height':'0px'});
    $('#op1').text('Verifica la cantidad de sustancia química que juntaste con tus contenedores');
    $('#op21').text('Verifica la nueva distribución que tendrá tu primer contenedor');
    $('#op22').text('Verifica la nueva distribución que tendrá tu segundo contenedor');
    $('#op23').text('Distribución final del líquido químico');
    function sumarNum1() {  // Verificaremos en que input el alumno escribe e ira recibiendo retroalimentacion dependiendo la descompisicion que vaya generando. En orden, primero verificamos que haya algun valor valido en el input y despues que valor es y se da retroalimentacion.  (PERDONE la falta de acentos).
        let n = parseInt($('#n').val());
        let m = parseInt($('#m').val());
        if (n<2 || n>=100 || m<2 || m>=100) {
            console.log(n,m);
            $('.tit').text('No puedes poner más de 100 mililitros, ni menos de 2, en estos contenedores. Mira cuántos mililitros tienes');
            return;
        }
        $('.tit').text('Consumo de sustancia química');
        if (0<=parseInt($('#n').val())&&parseInt($('#n').val())<=100) {
            if (n<oNumber) {
                $('#op1').html($('#n').val()+'+'+'----'+'='+$('#n').val()+'<br>'+'<div class="alert alert-success" role="alert"></div>');
                $('.alert-success').text('Vas bien, ¿Cuántos mililitros de líquido químico deben caber en tu otro contenedor para juntar la cantidad necesaria?');
                let alt = (n*200)/oNumber;
                $('#cont21').height(alt);
                $('#cont21').css({'border':'none'});
                $('#m').removeAttr('disabled');
            } else if (n==oNumber) {
                $('#op1').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de químico, mira la suma abajo. ¿Qué significa eso?</p>'+$('#n').val()+'+'+'0'+'='+$('#n').val()+'<br>'+'<div class="alert alert-warning" role="alert"></div>');
                $('.alert-warning').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+oNumber.toString()+' mililitros. Cambia la capacidad de este y distribuye esa líquido químico en dos contenedores');
                let alt = (n*200)/oNumber;
                $('#cont21').height(alt);
                $('#cont21').css({'border':'skyblue solid 3px'});
                $('#m').attr('disabled','disabled');
                return;
            } else if (n>oNumber) {
                $('#op1').html($('#n').val()+'+'+'----'+'='+$('#n').val()+'<br>'+'<div class="alert alert-danger" role="alert"></div>');
                $('.alert-danger').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-2).toString()+' mililitros y '+'2 mililitros');
                $('#cont21').height(200);
                $('#cont21').css({'border':'red solid 3px'});
                $('#m').removeAttr('disabled');
            }
        } 
        if (0<=parseInt($('#m').val())&&parseInt($('#m').val())<=100) {
            if (m<oNumber) {
                $('#op1').html('----'+'+'+$('#m').val()+'='+$('#m').val()+'<br>'+'<div class="alert alert-success" role="alert"></div>');
                $('.alert-success').text('Vas bien, ¿Cuántos mililitros de químico deben caber en tu otro contenedor?');
                let alt = (m*200)/oNumber;
                $('#cont21').height(alt);
                $('#cont21').css({'border':'none'});
                $('#n').removeAttr('disabled');
            } else if (m==oNumber) {
                $('#op1').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de químico, mira la suma abajo. ¿Qué significa eso?</p>'+'0'+'+'+$('#m').val()+'='+$('#m').val()+'<br>'+'<div class="alert alert-warning" role="alert"></div>');
                $('.alert-warning').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+oNumber.toString()+' mililitros. Cambia la capacidad y distribuye ese químico en dos contenedores');
                let alt = (m*200)/oNumber;
                $('#cont21').height(alt);
                $('#cont21').css({'border':'skyblue solid 3px'});
                $('#n').attr('disabled','disabled');
                return;
            } else if (m>oNumber) {
                $('#op1').html('----'+'+'+$('#m').val()+'='+$('#m').val()+'<br>'+'<div class="alert alert-danger" role="alert"></div>');
                $('.alert-danger').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-2).toString()+' mililitros y '+'2 mililitros');
                $('#cont21').height(200);
                $('#cont21').css({'border':'red solid 3px'});
                $('#m').removeAttr('disabled');
            }
        }
        if (0<=parseInt($('#n').val())&&parseInt($('#n').val())<=100  &&  0<=parseInt($('#m').val())&&parseInt($('#m').val())<=100) {
            let pS = parseInt($('#n').val())+parseInt($('#m').val());
            if (pS<oNumber) {
                $('#op1').html($('#n').val()+'+'+$('#m').val()+'='+pS+'<br>'+'<div class="alert alert-danger" role="alert"></div>');
                $('.alert-danger').text('Con contenedores de esas capacidades consumes menos líquido químico del que se requiere, aumenta las capacidades');
                let alt = (pS*200)/oNumber;
                $('#cont21').height(alt);
                $('#cont21').css({'border':'none'});
            } else if (pS>oNumber) {
                $('#op1').html($('#n').val()+'+'+$('#m').val()+'='+pS+'<br>'+'<div class="alert alert-danger" role="alert"></div>');
                $('.alert-danger').text('Con contenedores de esas capacidades estás consumiendo más químico de la que se te pide. Disminuye las capacidades');
                $('#cont21').height(200);
                $('#cont21').css({'border':'red solid 3px'});
            } else if (pS==oNumber) {
                $('#op1').html($('#n').val()+'+'+$('#m').val()+'='+pS+'<br>'+'<div class="alert alert-success" role="alert"></div>');
                $('.alert-success').text('Correcto, distribuiste bien los '+oNumber.toString()+' mililitros de químico necesarios en contenedores de las capacidades que especificaste. Prosigue con la segunda distribución en contenedores más pequeños');
                $('#cont21').height(200);
                $('#cont21').css({'border':'blue solid 3px'});
                // Ya que este solucionada la primera descomposcion se bloquean los primeros inputs
                $('.inputNumbern').attr("disabled","disabled");
                // AHORA, cuando el alumno ha llegado a esta parte se procede a la segunda descomposicion
                $('.inputNumberx').removeAttr('disabled'); // Removemos el disabled de esos inputs y puede escribir
                // Lanzamos un toasts que indica que se debe hacer en la segunda descomposicion.
                const toastLiveExample = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                // Hacemos la funcion que sera llamada en los eventos de los inputs w,x,y y z.
                function sumarNum2() {
                    let arrsums = [0,0,0,0]; // Creamos un array donde se colocaran los 4 valores de los inputs dados en las condiciones de numeros dados menores al original, y al final se sumaran en "sums" para obtener el total de la descomposicion.
                    let sums = 0;
                    let w = parseInt($('#w').val());
                    let x = parseInt($('#x').val());
                    let y = parseInt($('#y').val());
                    let z = parseInt($('#z').val());
                    if (w<0 || w>=100) {
                        $('.tit').text('No puedes poner más de 100 mililitros en los contenedores. ¿Cuántos litros debes repartir?');
                        $('#x').attr("disabled","disabled");
                        $('#y').attr("disabled","disabled");
                        $('#z').attr("disabled","disabled");
                        return;
                    }
                    if (x<0 || x>=100) {
                        $('.tit').text('No puedes poner más de 100 mililitros en los contenedores. ¿Cuántos mililitros debes repartir?');
                        $('#w').attr("disabled","disabled");
                        $('#y').attr("disabled","disabled");
                        $('#z').attr("disabled","disabled");
                        return;
                    }
                    if (y<0 || y>=100) {
                        $('.tit').text('No puedes poner más de 100 mililitros en los contenedores. ¿Cuántos mililitros debes repartir?');
                        $('#x').attr("disabled","disabled");
                        $('#w').attr("disabled","disabled");
                        $('#z').attr("disabled","disabled");
                        return;
                    }
                    if (z<0 || z>=100) {
                        $('.tit').text('No puedes poner más de 100 mililitros en los contenedores. ¿Cuántos mililitros debes repartir?');
                        $('#w').attr("disabled","disabled");
                        $('#y').attr("disabled","disabled");
                        $('#x').attr("disabled","disabled");
                        return;
                    }
                    $('.tit').text('Consumo de sustancia química');
                    $('.inputNumberx').removeAttr('disabled');
                    $('#op23').html('<p id="df0">Descomposición Final</p><label id="df1">--</label>'+'+'+'<label id="df2">--</label>'+'+'+'<label id="df3">--</label>'+'+'+'<label id="df4">--</label>'+'='+'<label id="df5">--</label>');  // Escribimos al vuelo la descomposicon final dando de antemano 4 espacios para escribir los numeros correspondientes.
                    // Repetimos el codigo para la segunda descomposcion del primer numero

                    if (0<=parseInt($('#w').val())&&parseInt($('#w').val())<=100) {
                        arrsums[0] = w;
                        if (w<n) {
                            $('#x').removeAttr("disabled");
                            $('#op21').html($('#w').val()+'+'+'----'+'='+$('#w').val()+'<br>'+'<div class="alert alert-success success1" role="alert"></div>');
                            $('.success1').text('Vas bien, ¿Cuántos mililitros de líquido químico deben caber en tu otro contenedor?');
                            $('#df1').text($('#w').val());
                            let alt = (w*100)/n;
                            $('#cont23').height(alt);
                            $('#cont23').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                        } else if (w==n) {
                            $('#x').attr("disabled","disabled");
                            $('#y').attr("disabled","disabled");
                            $('#z').attr("disabled","disabled");
                            $('#op21').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de líquido químico, mira la suma abajo. ¿Qué significa eso?</p>'+$('#w').val()+'+'+'0'+'='+$('#w').val()+'<br>'+'<div class="alert alert-warning warning1" role="alert"></div>');
                            $('.warning1').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+n.toString()+' mililitros. Cambia la capacidad y distribuye esa químico en dos contenedores');
                            $('#df1').text($('#w').val());
                            $('#df2').text('0');
                            let alt = (w*100)/n;
                            $('#cont23').height(alt);
                            $('#cont23').css({'border':'skyblue solid 3px'});
                            $('#cont22').css({'border':'none','height':'0px'});
                            $('#x').attr('disabled','disabled');
                            return;
                        } else if (w>n) {
                            $('#op21').html($('#w').val()+'+'+'----'+'='+$('#w').val()+'<br>'+'<div class="alert alert-danger danger1" role="alert"></div>');
                            $('.danger1').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-1).toString()+' mililitros y '+'1 mililitros');
                            $('#df1').text($('#w').val());
                            $('#cont23').height(100);
                            $('#cont23').css({'border':'red solid 3px'});
                            $('#cont22').css({'border':'red solid 3px'});
                            $('#x').removeAttr('disabled');
                        }
                    }
                    if (0<=parseInt($('#x').val())&&parseInt($('#x').val())<=100) {
                        arrsums[1] = x;
                        if (x<n) {
                            $('#op21').html('----'+'+'+$('#x').val()+'='+$('#x').val()+'<br>'+'<div class="alert alert-success success1" role="alert"></div>');
                            $('.success1').text('Vas bien, ¿Cuántos mililitros de químico deben caber en tu otro contenedor?');
                            $('#df2').text($('#x').val());
                            let alt = (x*100)/n;
                            $('#cont23').height(alt);
                            $('#cont23').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                            $('#w').removeAttr('disabled');
                        } else if (x==n) {
                            $('#op21').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de químico, mira la suma abajo. ¿Qué significa eso?</p>'+'0'+'+'+$('#x').val()+'='+$('#x').val()+'<br>'+'<div class="alert alert-warning warning1" role="alert"></div>');
                            $('.warning1').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+n.toString()+' mililitros. Cambia la capacidad y distribuye ese químico en dos contenedores');
                            $('#df2').text($('#x').val());
                            $('#df1').text('0');
                            let alt = (x*100)/n;
                            $('#cont23').height(alt);
                            $('#cont23').css({'border':'skyblue solid 3px'});
                            $('#cont22').css({'border':'none','height':'0px'});
                            $('#w').attr('disabled','disabled');
                            return;
                        } else if (x>n) {
                            $('#op21').html('----'+'+'+$('#x').val()+'='+$('#x').val()+'<br>'+'<div class="alert alert-danger danger1" role="alert"></div>');
                            $('.danger1').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-1).toString()+' mililitros y '+'1 mililitro');
                            $('#df2').text($('#x').val());
                            $('#cont23').height(100);
                            $('#cont23').css({'border':'red solid 3px'});
                            $('#cont22').css({'border':'red solid 3px'});
                            $('#w').removeAttr('disabled');
                        }
                    }
                    if (0<=parseInt($('#w').val())&&parseInt($('#w').val())<=100  &&  0<=parseInt($('#x').val())&&parseInt($('#x').val())<=100) {
                        let pS = parseInt($('#w').val())+parseInt($('#x').val());
                        if (pS<n) {
                            $('#op21').html($('#w').val()+'+'+$('#x').val()+'='+pS+'<br>'+'<div class="alert alert-danger danger1" role="alert"></div>');
                            $('.danger1').text('Con contenedores de esas capacidades consumes menos líquido químico del que se requiere, aumenta las capacidades');
                            let alt = (pS*100)/n;
                            $('#cont23').height(alt);
                            $('#cont23').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                        } else if (pS>n) {
                            $('#op21').html($('#w').val()+'+'+$('#x').val()+'='+pS+'<br>'+'<div class="alert alert-danger danger1" role="alert"></div>');
                            $('.danger1').text('Con contenedores de esas capacidades estás consumiendo más químico del que se te pide. Disminuye las capacidades');
                            $('#cont23').height(100);
                            $('#cont23').css({'border':'red solid 3px'});
                            $('#cont22').css({'border':'none'});
                        } else if (pS==n) {
                            $('#op21').html($('#w').val()+'+'+$('#x').val()+'='+pS+'<br>'+'<div class="alert alert-success success1" role="alert"></div>');
                            $('.success1').text('Correcto, distribuiste bien los '+n.toString()+' mililitros de químico del primer contenedor en contenedores más pequeños de las capacidades que especificaste');
                            $('#cont23').height(100);
                            $('#cont23').css({'border':'blue solid 3px'});
                            $('#cont22').css({'border':'skyblue solid 3px'});
                        }
                    }
                    
                    // Repetimos el codigo para la segunda descomposicion del segundo numero
                    if (0<=parseInt($('#y').val())&&parseInt($('#y').val())<=100) {
                        arrsums[2] = y;
                        if (y<m) {
                            $('#op22').html($('#y').val()+'+'+'----'+'='+$('#y').val()+'<br>'+'<div class="alert alert-success success2" role="alert"></div>');
                            $('.success2').text('Vas bien, ¿Cuántos mililitros de químico deben caber en tu otro contenedor?');
                            $('#df3').text($('#y').val());
                            let alt = (y*100)/m;
                            $('#cont24').height(alt);
                            $('#cont24').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                            $('#z').removeAttr('disabled');
                        } else if (y==m) {
                            $('#z').attr("disabled","disabled");
                            $('#op22').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de químico, mira la suma abajo. ¿Qué significa eso?</p>'+$('#y').val()+'+'+'0'+'='+$('#y').val()+'<br>'+'<div class="alert alert-warning warning2" role="alert"></div>');
                            $('.warning2').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+m.toString()+' mililitros. Cambia la capacidad y distribuye esa cantidad de químico en dos contenedores');
                            $('#df3').text($('#y').val());
                            $('#df4').text('0');
                            let alt = (y*100)/m;
                            $('#cont24').height(alt);
                            $('#cont24').css({'border':'skyblue solid 3px'});
                            $('#cont22').css({'border':'none','height':'0px'});
                            return;
                        } else if (y>m) {
                            $('#op22').html($('#y').val()+'+'+'----'+'='+$('#y').val()+'<br>'+'<div class="alert alert-danger danger2" role="alert"></div>');
                            $('.danger2').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-1).toString()+' mililitros y '+'1 mililitro');
                            $('#df3').text($('#y').val());
                            $('#cont24').height(100);
                            $('#cont24').css({'border':'red solid 3px'});
                            $('#cont22').css({'border':'red solid 3px'});
                            $('#z').removeAttr('disabled');
                        }
                    }
                    if (0<=parseInt($('#z').val())&&parseInt($('#z').val())<=100) {
                        arrsums[3] = z;
                        if (z<m) {
                            $('#y').removeAttr("disabled");
                            $('#op22').html('----'+'+'+$('#z').val()+'='+$('#z').val()+'<br>'+'<div class="alert alert-success success2" role="alert"></div>');
                            $('.success2').text('Vas bien, ¿Cuántos mililitros de químico deben caber en tu otro contenedor?');
                            $('#df4').text($('#z').val());
                            let alt = (z*100)/m;
                            $('#cont24').height(alt);
                            $('#cont24').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                        } else if (z==m) {
                            $('#y').attr("disabled","disabled");
                            $('#op22').html('<p>Lo que intentas solo funciona si a uno de tus dos contenedores le cabe 0 mililitros de químico, mira la suma abajo. ¿Qué significa eso?</p>'+'0'+'+'+$('#z').val()+'='+$('#z').val()+'<br>'+'<div class="alert alert-warning warning2" role="alert"></div>');
                            $('.warning2').text('Recuerda que debes elegir las capacidades de dos contenedores. No hay un solo contenedor al que le quepan '+m.toString()+' mililitros. Cambia la capacidad y distribuye ese líquido químico en dos contenedores');
                            $('#df4').text($('#z').val());
                            $('#df3').text('0');
                            let alt = (z*100)/m;
                            $('#cont24').height(alt);
                            $('#cont24').css({'border':'skyblue solid 3px'});
                            $('#cont22').css({'border':'none','height':'0px'});
                            return;
                        } else if (z>m) {
                            $('#op22').html('----'+'+'+$('#z').val()+'='+$('#z').val()+'<br>'+'<div class="alert alert-danger danger2" role="alert"></div>');
                            $('.danger2').text('Cuidado, en tu distribución estas considerando a un contenedor de más capacidad de la necesaria, no se puede debido a los costos. Prueba poniendo '+(oNumber-1).toString()+' mililitros y '+'1 mililitros');
                            $('#df4').text($('#z').val());
                            $('#cont22').css({'border':'red solid 3px'});
                            $('#cont24').height(100);
                            $('#cont24').css({'border':'red solid 3px'});
                            $('#y').removeAttr("disabled");
                        }
                    }
                    if (0<=parseInt($('#y').val())&&parseInt($('#y').val())<=100  &&  0<=parseInt($('#z').val())&&parseInt($('#z').val())<=100) {
                        let pS = parseInt($('#y').val())+parseInt($('#z').val());
                        if (pS<m) {
                            $('#op22').html($('#y').val()+'+'+$('#z').val()+'='+pS+'<br>'+'<div class="alert alert-danger danger2" role="alert"></div>');
                            $('.danger2').text('Con contenedores de esas capacidades consumes menos líquido químico del que se requiere, aumenta las capacidades');
                            let alt = (pS*100)/m;
                            $('#cont24').height(alt);
                            $('#cont24').css({'border':'none'});
                            $('#cont22').css({'border':'none'});
                        } else if (pS>m) {
                            $('#op22').html($('#y').val()+'+'+$('#z').val()+'='+pS+'<br>'+'<div class="alert alert-danger danger2" role="alert"></div>');
                            $('.danger2').text('Con contenedores de esas capacidades estás consumiendo más líquido químico del que se te pide. Disminuye las capacidades');
                            $('#cont24').height(100);
                            $('#cont24').css({'border':'red solid 3px'});
                            $('#cont22').css({'border':'red solid 3px'});
                        } else if (pS==m) {
                            $('#op22').html($('#y').val()+'+'+$('#z').val()+'='+pS+'<br>'+'<div class="alert alert-success success2" role="alert"></div>');
                            $('.success2').text('Correcto, distribuiste bien los '+m.toString()+' mililitros de químico del segundo contenedor en contenedores más pequeños de las capacidades que especificaste');
                            $('#cont24').height(100);
                            $('#cont24').css({'border':'blue solid 3px'});
                            $('#cont22').css({'border':'skyblue solid 3px'});
                        }
                    }
                    for (let i = 0; i < arrsums.length; i++) {  // Una peque;a rutina para sumar en este punto todos los elementos del array con los valores de los inputs
                        sums = sums + arrsums[i];
                    }
                    $('#df5').text(sums.toString());
                    if (sums<oNumber) {
                        let alt = (sums*200)/oNumber;
                        $('#cont22').height(alt);
                    } if (sums==oNumber) {
                        $('#cont22').css({'border':'blue solid 3px'});
                        let alt = (sums*200)/oNumber;
                        $('#cont22').height(alt);
                        const toastLiveExample1 = document.getElementById('liveToast1');
                        const toast1 = new bootstrap.Toast(toastLiveExample1);
                        toast1.show();
                    } if (sums>oNumber) {
                        $('#cont22').css({'border':'red solid 3px','height':'200px'});
                    }
                    console.log(arrsums);
                    console.log(sums);
                }
            }
        }
        $('.inputNumberx').blur(sumarNum2);
    }
    $('.inputNumbern').blur(sumarNum1);
}

$('#original').on('click',comenzar);
$('.inputNumber').attr('disabled',"disabled");

/* 
Mapa logico:
Activa comenzar --> Hace primera descomposicion correcta --> En ese condicional se ejecuta el codigo de de la segunda descomposicion
*/