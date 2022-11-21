function escaleraA() {
    let m = random(60,100); // minuendo
    let nr = random(1,55);  
    let s = nr; // sustraendo para suma
    let sus = nr // sustraendo original que no se modificara
    let sp = 0; // declaramos una variable para ir sumando uno por uno cada input ingresado
    let ct = 3; // contador apartir del cual se iran agregando filas en caso que se clickee el boton adecuado
    $('.btn-sm.ori').attr('disabled','disabled');
    $('#anadirBoton').attr('disabled','disabled');
    $('.operacionx').text(parseInt(m)+' - '+parseInt(sus));
    $('#nunMin').text(m);
    $('#nunSus').text(sus);
    $('#sumafx').html('<p id="hojasag">Hojas que vas agregando a la bandeja:'+'<br>'+' <span class="sumaf1"></span><span id="sumaf2"></span><span class="sumaf3"></span>'+'<br>'+'<span class="sumaf1"></span><span id="sumaf4"></span><span class="sumaf3"></span></p>');
    $("#replay").hide();
    $('#ea').off('click',escaleraA);
    // Creamos la rutina para anadir filas a la tabla, identificando sobre todo que id tendran los nuevos inputs
    // y colocando un id especifico para el correspondiente espacio para poner la actualizacion del número.
    function anadirfil() {
        $('.ent').off('blur');
        ct++;
        $('#tablaBody').append('<tr class="prov"><td><div class="form-floating mb-3 x"><input type="text" class="form-control ent" id="'+ct.toString()+'" onkeypress="return event.charCode >= 48 && event.charCode <= 57"><label for="'+ct.toString()+'">Hojas</label></div></td><td><p class="parr" id="llegoa'+ct.toString()+'">...</p><button id="'+ct.toString()+'" type="button" class="btn btn-secondary btn-sm ori">Eliminar</button></td></tr>');
        $('.ent').blur(anadirNum);
        $('.btn-sm.ori').on('click',eliminarfil);
        $('#anadirBoton').attr('disabled','disabled');
    }

    // funcion para identificar que numero se ingreso y en que input
    function anadirNum(e) {
        
        // Un if que filtra inputs sin numeros, solo acepta inputs llenos con numeros positivos y menores que 100.
        if (this.value>=100) {
            alert("Cuidado, estas considerando cantidades grandes, checa los números que estas manejando");
            return;
        } else if (this.value <= 0) {
            return
        }
        s = s + parseInt(this.value);
        console.log(e.target.id,this.value,s);
        sp = sp + parseInt(this.value); // actualizamos la suma que llevan con los inputs ingresados
        
        if (s<m) {
            $("#llegoa"+e.target.id).text(s.toString());
            $("#llegoa"+e.target.id).css({'color':'green'});
            e.target.disabled = true;
            $('.sumaf1').html(sus)
            $('#sumaf2').append('<span id="spa'+e.target.id+'">'+' + '+this.value+'</span>');
            $("#sumaf2,#sumaf4,.sumaf3").css({'color':'green', 'font-weight':'bold', 'font-size':'1.2rem'});
            $('.sumaf3').html(' = '+s);
            $('#sumaf4').html(' + '+sp);
        } else if (s==m) {
            e.target.disabled = true;
            $("#llegoa"+e.target.id).text(s.toString());
            $("#llegoa"+e.target.id).css({'color':'green', 'font-weight':'bold'});
            $('.sumaf1').html(sus)
            $('#sumaf2').append('<span id="spa'+e.target.id+'">'+' + '+this.value+'</span>');
            $("#sumaf2,.sumaf3,#sumaf4").css({'color':'green', 'font-weight':'bold'});
            $('.sumaf3').html(' = '+s);
            $('#sumaf4').html(' + '+sp);
            $('#sumaf4').css({'font-size':'1.5rem','title':'Resultado de la Resta'})
            for (let i = 0; i < 5 ; i++) {
                $("#sumaf4").fadeOut( 100 );
                $("#sumaf4").fadeIn( 500 );
            }
            $("#replay").text('Bien hecho. Comenzar');
            $("#replay").css({'background-color':'green'});
            $("#replay").show();
            $("#anadirBoton").hide();
            $("#replay").on('click',rePlay);
        } else if (s>m) {
            e.target.disabled = true;
            $("#llegoa"+e.target.id).text(s.toString());
            $("#llegoa"+e.target.id).css({'color':'red', 'font-weight':'bold'});
            $('.sumaf1').html(sus)
            $('#sumaf2').append('<span id="spa'+e.target.id+'">'+' + '+this.value+'</span>');
            $('.sumaf3').html(' = '+s);
            $('#sumaf4').html(' + '+sp);
            $("#sumaf2,.sumaf3,#sumaf4").css({'color':'red', 'font-weight':'bold'});
            // Estoy estructurando muy mal esto, pero es un if para verificar si el usuario ha superado el valor dentro de los 3 primeros inputs
            if (e.target.id==1 || e.target.id==2 || e.target.id==3) {
                $("#replay").text('Te pasaste. Reiniciar');
                $("#replay").css({'background-color':'red'});
                $("#replay").show();
                $("#anadirBoton").hide();
                $("#replay").on('click',rePlay);
                return;
            }
            $("#replay").text('Te pasaste. Reiniciar');
            $("#replay").css({'background-color':'red'});
            $("#replay").show();
            $("#anadirBoton").hide();
            $("#replay").on('click',rePlay);
            $('.btn-sm.ori').removeAttr('disabled');
            $('#anadirBoton').removeAttr('disabled');
        }
        // Un if para activar por primera ves el anadir fila despues del target.id igual a 3
        if (e.target.id>=3){
            $('#anadirBoton').removeAttr('disabled');
        }
    }

    // funcion para eliminar filas y toda la informacion de esta.
    function eliminarfil(e) {
        $('#1.btn-sm').attr('disabled','disabled');
        $('span').css({'color':'black'});
        console.log(ct, e.target.id);
        // Un if para cuando el usuario borre una fila vacia, se puede seguir trabajando normal.
        if ($('.ent#'+e.target.id).val()==='' || $('.ent#'+e.target.id).val()===undefined) {
            for (let i = parseInt(e.target.id); i < ct+1; i++) {
                s = s - 0;
                sp = sp - 0;
                $('.ent#'+i).closest('tr').remove();
                $('#spa'+i).remove();
            }
            ct = ct - 1;
            $('.btn-sm.ori').off('click',eliminarfil);
            $('#anadirBoton').removeAttr('disabled');
            $('#sumaf4').html(' + '+sp.toString());
            $('.sumaf3').text(' = '+s);
            return;
        } 
        
        // console.log($('.ent#'+e.target.id).val()); el valor de la entrada input correspondiente
        for (let i = parseInt(e.target.id); i < ct+1; i++) {
            if ($('.ent#'+i).val()==='') {
                s = s - 0;
                sp = sp - 0;
            } else {
                s = s - parseInt($('.ent#'+i).val());
                sp = sp - parseInt($('.ent#'+i).val());
            }
            $('.ent#'+i).closest('tr').remove();
            $('#spa'+i).remove();
        }
        $('#sumaf4').html(' + '+sp.toString());
        $('.sumaf3').text(' = '+s.toString());
        ct = ct-1; // Decrementamos el 'ultimo valor del contador ct que lleva la cuenta de las filas que se han agregado.
        $('.btn-sm.ori').off('click',eliminarfil);
    }

    function rePlay() {
        $(".mb-3.x>input").removeAttr('disabled');
        $(".mb-3.x>input").val('');
        $("td>.parr").text('...');
        $("#anadirBoton").show();
        $("#replay").hide();
        $("#hojasag>span").empty();
        $('#sumaf4').css({'font-size':'1rem'});
        s = nr;
        sp = 0;
    }
    function random(min, max) {
        let i = Math.floor((Math.random() * (max - min + 1)) + min);
        return i;
    }

    $('.ent').blur(anadirNum);
    $('#anadirBoton').on('click',anadirfil);
    $('.btn-sm.ori').on('click',eliminarfil);
}
function escaleraD() {
    let mr = random(60,100); // minuendo
    let nr = random(1,55);  
    let m = mr // minuendo para la suma
    let min = mr // minuendo original
    let s = nr; // sustraendo para suma
    let sus = nr // sustraendo original que no se modificara
    let sp = 0; // declaramos una variable para ir sumando uno por uno cada input ingresado
    let ct = 3; // contador apartir del cual se iran agregando filas en caso que se clickee el boton adecuado
    $('.btn-sm.ori1').attr('disabled','disabled');
    $('#anadirBoton1').attr('disabled','disabled');
    $('.operacion2').text(parseInt(min)+' - '+parseInt(sus));
    $('#nunMin1').text(sus);
    $('#nunSus1').text(min);
    $('#sumafy').html('<p id="hojasag1">Hojas que vas agregando a la bandeja:'+'<br>'+' <span class="sumafy1"></span><span id="sumafy2"></span><span class="sumafy3"></span>'+'<br>'+'<span class="sumafy1"></span><span id="sumafy4"></span><span class="sumafy3"></span></p>');
    $("#replay1").hide();
    $('#ed').off('click',escaleraD);
    // Creamos la rutina para anadir filas a la tabla, identificando sobre todo que id tendran los nuevos inputs
    // y colocando un id especifico para el correspondiente espacio para poner la actualizacion del número.
    function anadirfil1() {
        $('.ent1').off('blur');
        ct++;
        $('#tablaBody1').append('<tr><td><div class="form-floating mb-3 x1"><input type="text" class="form-control ent1" id="'+ct.toString()+'" onkeypress="return event.charCode >= 48 && event.charCode <= 57"><label for="'+ct.toString()+'">Hojas</label></div></td><td><p class="parr1" id="llegoax'+ct.toString()+'">...</p><button id="'+ct.toString()+'" type="button" class="btn btn-secondary btn-sm ori1">Eliminar</button></td></tr>');
        $('.ent1').blur(anadirNum1);
        $('.btn-sm.ori1').on('click',eliminarfil1);
        $('#anadirBoton1').attr('disabled','disabled');
    }

    // funcion para identificar que numero se ingreso y en que input
    function anadirNum1(e) {
        
        // Un if que filtra inputs sin numeros, solo acepta inputs llenos con numeros positivos y menores que 100.
        if (this.value>=100) {
            alert("Cuidado, estas considerando cantidades grandes, checa los números que estas manejando");
            return;
        } else if (this.value <= 0) {
            return
        }
        m = m - parseInt(this.value);
        console.log(e.target.id,this.value,s);
        sp = sp + parseInt(this.value); // actualizamos la suma que llevan con los inputs ingresados
        
        if (m>s) {
            $("#llegoax"+e.target.id).text(m.toString());
            e.target.disabled = true;
            $('.sumafy1').html(min)
            $('#sumafy2').append('<span id="spay'+e.target.id+'">'+' - '+this.value+'</span>');
            $("#llegoax"+e.target.id).css({'color':'green', 'font-weight':'bold'});
            $("#sumafy2,.sumafy3,#sumafy4").css({'color':'green', 'font-weight':'bold'});
            $('.sumafy3').html(' = '+m);
            $('#sumafy4').html(' - '+sp);
        } else if (s==m) {
            e.target.disabled = true;
            $("#llegoax"+e.target.id).text(m.toString());
            $("#llegoax"+e.target.id).css({'color':'green', 'font-weight':'bold'});
            $('.sumafy1').html(min)
            $('#sumafy2').append('<span id="spay'+e.target.id+'">'+' - '+this.value+'</span>');
            $("#sumafy2,.sumafy3,#sumafy4").css({'color':'green', 'font-weight':'bold'});
            $('.sumafy3').html(' = '+m);
            $('#sumafy4').html(' - '+sp);
            $('#sumafy4').css({'font-size':'1.5rem','title':'Resultado de la Resta'})
            for (let i = 0; i < 5 ; i++) {
                $("#sumafy4").fadeOut( 100 );
                $("#sumafy4").fadeIn( 500 );
            }
            $("#replay1").text('Bien hecho. Comenzar');
            $("#replay1").css({'background-color':'green'});
            $("#replay1").show();
            $("#anadirBoton1").hide();
            $("#replay1").on('click',rePlay1);
        } else if (s>m) {
            e.target.disabled = true;
            $('#1.btn-sm,#2.btn-sm,#3.btn-sm').attr('disabled','disabled');
            $("#llegoax"+e.target.id).text("#");
            $("#llegoax"+e.target.id).css({'color':'red', 'font-weight':'bold'});
            $('.sumafy1').html(min);
            $('#sumafy2').append('<span id="spay'+e.target.id+'">'+' - '+this.value+'</span>');
            $('.sumafy3').html(' = #');
            $('#sumafy4').html(' - #');
            $("#sumafy2,.sumafy3,#sumafy4").css({'color':'red', 'font-weight':'bold'});
            // Estoy estructurando muy mal esto, pero es un if para verificar si el usuario ha superado el valor dentro de los 3 primeros inputs
            if (e.target.id==1 || e.target.id==2 || e.target.id==3) {
                $("#replay1").text('Ya consumiste más hojas. Reiniciar');
                $("#replay1").css({'background-color':'red'});
                $("#replay1").show();
                $("#anadirBoton1").hide();
                $("#replay1").on('click',rePlay1);
                return;
            }
            $("#replay1").text('Ya consumiste más hojas. Reiniciar');
            $("#replay1").css({'background-color':'red'});
            $("#replay1").show();
            $("#anadirBoton1").hide();
            $("#replay1").on('click',rePlay1);
            $('.btn-sm.ori1').removeAttr('disabled');
            $('#anadirBoton1').removeAttr('disabled');
        }
        // Un if para activar por primera ves el anadir fila despues del target.id igual a 3
        if (e.target.id>=3){
            $('#anadirBoton1').removeAttr('disabled');
        }
    }

    // funcion para eliminar filas y toda la informacion de esta.
    function eliminarfil1(e) {
        $('#1.btn-sm,#2.btn-sm,#3.btn-sm').attr('disabled','disabled');
        $('span').css({'color':'black'});
        console.log(ct, e.target.id);
        // Un if para cuando el usuario borre una fila vacia, se puede seguir trabajando normal.
        if ($('.ent1#'+e.target.id).val()==='' || $('.ent1#'+e.target.id).val()===undefined) {
            for (let i = parseInt(e.target.id); i < ct+1; i++) {
                m = m + 0;
                sp = sp + 0;
                $('.ent1#'+i).closest('tr').remove();
                $('#spay'+i).remove();
            }
            ct = ct - 1;
            $('.btn-sm.ori1').off('click',eliminarfil1);
            $('#anadirBoton1').removeAttr('disabled');
            $('#sumafy4').html(' - '+sp.toString());
            $('.sumafy3').text(' = '+m);
            return;
        } 
        console.log(ct, e.target.id);
        // console.log($('.ent1#'+e.target.id).val()); el valor de la entrada input correspondiente
        for (let i = parseInt(e.target.id); i < ct+1; i++) {
            if ($('.ent1#'+i).val()==='') {
                m = m + 0;
                sp = sp + 0;
            } else {
                m = m + parseInt($('.ent1#'+i).val());
                sp = sp - parseInt($('.ent1#'+i).val());
            }
            $('.ent1#'+i).closest('tr').remove();
            $('#spay'+i).remove();
        }
        $('#sumafy4').html(' - '+sp.toString());
        $('.sumafy3').text(' = '+m.toString());
        ct = ct-1; // Decrementamos el 'ultimo valor del contador ct que lleva la cuenta de las filas que se han agregado.
        $('.btn-sm.ori1').off('click',eliminarfil1);
    }

    function rePlay1() {
        $(".mb-3.x1>input").removeAttr('disabled');
        $(".mb-3.x1>input").val('');
        $("td>.parr1").text('...');
        $("#anadirBoton1").show();
        $("#replay1").hide();
        $("#hojasag1>span").empty();
        $('#sumafy4').css({'font-size':'1rem'});
        m = mr;
        sp = 0;
    }
    function random(min, max) {
        let i = Math.floor((Math.random() * (max - min + 1)) + min);
        return i;
    }

    $('.ent1').blur(anadirNum1);
    $('#anadirBoton1').on('click',anadirfil1);
    $('.btn-sm.ori1').on('click',eliminarfil1);
}
function suma1() {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
    })  // Se inicializan los popovers
    let pn = random(1,50,);
    let sn = random(1,50);
    let s1 = 0;
    let s2 = 0;
    let menor = 0;
    let mayor = 0;
    if (pn>sn) {
        s1 = pn;
        s2 = sn;
        menor = sn;
        mayor = pn;
    } else {
        s1 = sn;
        s2 = pn;
        menor = pn;
        mayor = sn;
    }
    let sumaR = s1 + s2;
    let sp = 0; // declaramos una variable para ir sumando uno por uno cada input ingresado
    let ct = 3; // contador apartir del cual se iran agregando filas en caso que se clickee el boton adecuado
    $('.btn-sm.ori2').attr('disabled','disabled');
    $('#anadirBoton2').attr('disabled','disabled');
    $('.operacion3').text(parseInt(s1)+' + '+parseInt(s2));
    $('#nunMin2').text(s1);
    $('#nunSus2').text(s2);
    $('#sumafz').html('<p id="hojasag2">Canicas que vas pasando: '+'<br>'+' <span class="sumafz1"></span><span id="sumafz2"></span><span class="sumafz3"></span>'+'<br>'+'<span class="sumafz1"></span><span id="sumafz4"></span><span class="sumafz3"></span></p>');
    $("#replay2").hide();
    $('#fs').off('click',suma1);

    function anadirfil2() {
        $('.ent2').off('blur');
        $('.parrs').off('blur');
        ct++;
        $('#tablaBody2').append('<tr><td><div class="form-floating mb-3 x2"><input type="text" class="form-control ent2" id="'+ct.toString()+'" onkeypress="return event.charCode >= 48 && event.charCode <= 57"><label for="'+ct.toString()+'">Canicas</label></div></td><td><p class="parr2" id="llegoam'+ct.toString()+'">...</p></td><td><div class="form-floating mb-3 x2"><input type="text" class="form-control parrs" id="llegoas'+ct.toString()+'" onkeypress="return event.charCode >= 48 && event.charCode <= 57"><label for="llegoas'+ct.toString()+'">Suma canicas</label></div><button id="'+ct.toString()+'" type="button" class="btn btn-secondary btn-sm ori2">Eliminar</button></td></tr>');
        $('.ent2').blur(anadirNum2);
        $('.btn-sm.ori2').on('click',eliminarfil2);
        $('#anadirBoton2').attr('disabled','disabled');
        $('.parrs').attr('disabled','disabled');
        $('.parrs').blur(verSuma);
        $('.ent2,.parrs').on('click',function () { 
            $('.bs-popover-top').remove();
        });
    }

    function anadirNum2(e) {
        
        // Un if que filtra inputs sin numeros, solo acepta inputs llenos con numeros positivos y menores que 100.
        if (this.value>=100) {
            alert("Cuidado, estas considerando cantidades grandes, checa los números que estas manejando");
            return;
        } else if (this.value <= 0) {
            return
        }
        s2 = s2 - parseInt(this.value);
        sp = sp + parseInt(this.value); // actualizamos la resta que llevan con los inputs ingresados
        s1 = s1 + parseInt(this.value); // actualizamos la suma que llevan con los inputs ingresados
        
        if (s2>0) {
            $("#llegoam"+e.target.id).text(s2.toString());
            $("#llegoas"+e.target.id).text(s1.toString());
            $("#llegoas"+e.target.id).removeAttr('disabled');
            e.target.disabled = true;
            $('.sumafz1').html(menor);
            $('#sumafz2').append('<span id="spayx'+e.target.id+'">'+' - '+this.value+'</span>');
            $("#llegoam"+e.target.id).css({'color':'green', 'font-weight':'bold'});
            $("#sumafz2,.sumafz3,#sumafz4").css({'color':'green', 'font-weight':'bold'});
            $('.sumafz3').html(' = '+s2);
            $('#sumafz4').html(' - '+sp);
        } else if (s2==0) {
            e.target.disabled = true;
            $("#llegoam"+e.target.id).text(s2.toString());
            $("#llegoas"+e.target.id).text(s1.toString());
            $("#llegoas"+e.target.id).removeAttr('disabled');
            $("#llegoam"+e.target.id).css({'color':'green', 'font-weight':'bold'});
            $('.sumafz1').html(menor);
            $('#sumafz2').append('<span id="spayx'+e.target.id+'">'+' - '+this.value+'</span>');
            $("#sumafz2,.sumafz3,#sumafz4").css({'color':'green', 'font-weight':'bold'});
            $('.sumafz3').html(' = '+s2);
            $('#sumafz4').html(' - '+sp);
            $('#sumafz4').css({'font-size':'1.5rem'})
            for (let i = 0; i < 5 ; i++) {
                $("#llegoam"+e.target.id).fadeOut( 100 );
                $("#llegoam"+e.target.id).fadeIn( 500 );
            }
            $("#anadirBoton2").hide();
        } else if (s2<0) {
            e.target.disabled = true;
            $('#1.btn-sm.ori2,#2.btn-sm.ori2,#3.btn-sm.ori2').attr('disabled','disabled');
            $("#llegoam"+e.target.id).text("#");
            $("#llegoam"+e.target.id).css({'color':'red', 'font-weight':'bold'});
            $('.sumafz1').html(menor);
            $('#sumafz2').append('<span id="spayx'+e.target.id+'">'+' - '+this.value+'</span>');
            $('.sumafz3').html(' = #');
            $('#sumafz4').html(' - #');
            $("#sumafz2,.sumafz3,#sumafz4").css({'color':'red', 'font-weight':'bold'});
            // Estoy estructurando muy mal esto, pero es un if para verificar si el usuario ha superado el valor dentro de los 3 primeros inputs
            if (e.target.id==1 || e.target.id==2 || e.target.id==3) {
                $("#llegoas"+e.target.id).text(s1.toString());
                $("#replay2").text('No tienes tantas canicas como las que quieres mover. Reiniciar');
                $("#replay2").css({'background-color':'red'});
                $("#replay2").show();
                $("#anadirBoton2").hide();
                $("#replay2").on('click',rePlay2);
                return;
            }
            $("#llegoas"+e.target.id).text(s1.toString());
            $("#replay2").text('Ya moviste más canicas. Reiniciar');
            $("#replay2").css({'background-color':'red'});
            $("#replay2").show();
            $("#anadirBoton2").hide();
            $("#replay2").on('click',rePlay2);
            $('.btn-sm.ori2').removeAttr('disabled');
            $('#anadirBoton2').removeAttr('disabled');
        }
        // Un if para activar por primera ves el anadir fila despues del target.id igual a 3
        if (e.target.id>=3){
            $('#anadirBoton2').removeAttr('disabled');
        }
    }

    function verSuma(e) {
        // Para validar la suma
        let popover1 = new bootstrap.Popover(document.querySelector("#"+e.target.id), {trigger: 'manual',title: 'Suma Incorrecta, revisa y corrige', placement:'top', content: 'La suma debe ser una cantidad menor, te pasaste. Revisa la cantidad que le quitaste al número menor, es la que agregas al mayor.'});
        let popover2 = new bootstrap.Popover(document.querySelector("#"+e.target.id), {trigger: 'manual',title: 'Suma Incorrecta, revisa y corrigela', placement:'top', content: 'Tu suma quedo por debajo de la que debe ser, fijate cuantas canicas le has pasado al número mayor'});
        let popover3 = new bootstrap.Popover(document.querySelector("#"+e.target.id), {trigger: 'manual',title: 'Exito, Bien hecho. Continua', placement:'top', content: 'Has sumado correctamente la cantidad que acabas de mover, da click en el siguiente espacio de añadir.'});
        $('.parrs').attr('disabled','disabled');
        if (this.value!='') {
            console.log(s1,this.value)
            if (s1<parseInt(this.value)) {
                $("#"+e.target.id).removeAttr('disabled');
                $('.ent2').attr('disabled','disabled');
                $('.bs-popover-top').remove();
                popover1.show();
            } else if (parseInt(this.value)<s1) {
                $("#"+e.target.id).removeAttr('disabled');
                $('.ent2').attr('disabled','disabled');
                $('.bs-popover-top').remove();
                popover2.show();
            } else {
                $('.ent2').removeAttr('disabled');
                $('.bs-popover-top').remove();
                popover3.show();
                if (parseInt(this.value) == sumaR) {
                    $('.bs-popover-top').remove();
                    for (let i = 0; i < 5 ; i++) {
                        $("#"+e.target.id).fadeOut( 100 );
                        $("#"+e.target.id).fadeIn( 500 );
                    }
                    $("#replay2").text('Bien hecho. Comenzar');
                    $("#replay2").css({'background-color':'green'});
                    $("#replay2").show();
                    $("#anadirBoton2").hide();
                    $("#replay2").on('click',rePlay2);
                }
            }
        }
        else {
            console.log('algo anda mal');
        }
    }

    function eliminarfil2(e) {
        $('#1.btn-sm.ori2,#2.btn-sm.ori2,#3.btn-sm.ori2').attr('disabled','disabled');
        $('span').css({'color':'black'});
        // Un if para cuando el usuario borre una fila vacia, se puede seguir trabajando normal.
        if ($('.ent2#'+e.target.id).val()==='' || $('.ent2#'+e.target.id).val()===undefined) {
            for (let i = parseInt(e.target.id); i < ct+1; i++) {
                $('.ent2#'+i).closest('tr').remove();
                $('#spayx'+i).remove();
            }
            ct = ct - 1;
            $('.btn-sm.ori2').off('click',eliminarfil2);
            $('#anadirBoton2').removeAttr('disabled');
            $('#sumafz4').html(' - '+sp.toString());
            $('.sumafz3').text(' = '+s2);
            return;
        } 
        console.log(ct, e.target.id);
        // console.log($('.ent1#'+e.target.id).val()); el valor de la entrada input correspondiente
        for (let i = parseInt(e.target.id); i < ct+1; i++) {
            if ($('.ent2#'+i).val()==='') {
                s2 = s2 + 0;
                sp = sp + 0;
            } else {
                s2 = s2 - parseInt($('.ent2#'+i).val());
                sp = sp - parseInt($('.ent2#'+i).val());
            }
            $('.ent2#'+i).closest('tr').remove();
            $('#spayx'+i).remove();
        }
        $('#sumafz4').html(' - '+sp.toString());
        $('.sumafz3').text(' = '+s2.toString());
        ct = ct-1; // Decrementamos el 'ultimo valor del contador ct que lleva la cuenta de las filas que se han agregado.
        $('.btn-sm.ori2').off('click',eliminarfil2);
    }

    function rePlay2() {
        $(".mb-3.x2>input").removeAttr('disabled');
        $(".mb-3.x2>input").val('');
        $("td>.parr2").text('...');
        $("td>.parrs").text('...');
        $("#anadirBoton2").show();
        $("#replay2").hide();
        $("#hojasag2>span").empty();
        $('#sumafz4').css({'font-size':'1rem'});
        s2 = menor;
        sp = 0;
        s1 = mayor;
    }

    function random(min, max) {
        let i = Math.floor((Math.random() * (max - min + 1)) + min);
        return i;
    }
    $('.ent2').blur(anadirNum2);
    $('#anadirBoton2').on('click',anadirfil2);
    $('.btn-sm.ori2').on('click',eliminarfil2);
    $('.parrs').blur(verSuma);
    $('.ent2,.parrs').on('click',function () { 
        $('.bs-popover-top').remove();
    });
}

$('#ea').on('click',escaleraA);
$('#ed').on('click',escaleraD);
$('#fs').on('click',suma1);