$(document).ready(function(){
    $("#div_correo").attr("style", "display: none !important")
    $("#correo_enviado").attr("style", "display: none !important")
    $("#div_mensaje").attr("style", "display: none !important")
    $("#mensaje_enviado").attr("style", "display: none !important")
    $("#boton_correo_ingresar").attr("style", "display: none")
    $('#por_correo').click(function(){
        $("#div_login").attr("style", "display: none !important")
        $("#div_correo").attr("style", "display: flex !important")
    })  
    $('#por_mensaje').click(function(){
        alertify.alert('Esta opcion todavia no esta habilitada.')
        return false
        $("#div_login").attr("style", "display: none !important")
        $("#div_mensaje").attr("style", "display: flex !important")
    })
    $('.flecha-login').click(function(){
        $("#div_correo").attr("style", "display: none !important")
        $("#correo_enviado").attr("style", "display: none !important")
        $("#div_mensaje").attr("style", "display: none !important")
        $("#mensaje_enviado").attr("style", "display: none !important")
        $("#div_login").attr("style", "display: flex !important")
        $("#boton_correo_ingresar").attr("style", "display: none")
        $("#boton_correo").attr("style", "display: block")
    })
    $('#boton_mensaje').click(function(){
        $("#mensaje_enviado").attr("style", "display: block !important")
    })

    $('#boton_correo').click(function(){
        let param = {
            'correo' : $('#correo').val(),
            '_token': $('input[name="_token"]').val()
        }
        
        if($.trim(param.correo) == ''){
            alertify.alert('No puede dejar el campo correo vacio.')
            return false
        }else if(!validateEmail($.trim(param.correo))){
            alertify.alert("El correo igresado no es valido.");
            return false;
        }
        $.ajax({
            url: "/proyecto_chat/enviarCorreo",
            type: "POST",
            dataType : 'JSON',
            data:param,
            beforeSend: function() {
                $('#loader').html(crearLoader())
            },
            success: function(data) {
                eliminarLoader($('#loader'))
                if(data == 'Error al enviar correo, por favor verifique el correo y vuelva a intentar.'){
                    alertify.alert(data)
                    return false
                }else{
                    codigoGlobal = data.codigo
                    if(data.usuario != ''){
                        $('#numero_correo').attr('readonly', 'true')
                        $('#usuario_correo').attr('readonly', 'true')
                        $('#numero_correo').val(data.numero)
                        $('#usuario_correo').val(data.usuario)
                    }
                    $("#boton_correo").attr("style", "display: none")
                    $("#boton_correo_ingresar").attr("style", "display: block")
                    $("#correo_enviado").attr("style", "display: block !important")        
                    alertify.alert('Se envio un correo con el codigo de verificacion.')
                }
            },
            error: function() {
                eliminarLoader($('#loader'))
                alertify.alert('No se pudo enviar el correo, compruebe el correo o la conexion y vuelva a intentarlo.')
            }
        })
    })
    $('#boton_correo_ingresar').click(function(){
        let param = {
            'correo' : $('#correo').val(),
            'usuario' : $('#usuario_correo').val(),
            'numero' : $('#numero_correo').val(),
            'codigo' : $('#codigo_correo').val(),
            'codigoComparar' : codigoGlobal,
            '_token': $('input[name="_token"]').val()
        }
        //return false
        $.ajax({
            url: "/proyecto_chat/ingresarPorCorreo",
            type: "POST",
            //dataType : 'JSON',
            data:param,
            beforeSend: function() {
                $('#loader').html(crearLoader())
            },
            success: function(data) {
                eliminarLoader($('#loader'))
                if(data == ''){
                    $(location).attr('href',"/proyecto_chat/conversaciones");
                }else{
                    alertify.alert(data)
                }
            },
            error: function() {
                eliminarLoader($('#loader'))
                //Fallo al buscar datos
                alertify.alert('Fallo carga de datos.')
            }
        })
    })
})

function validateEmail(email) {
    let re =/\S+@\S+\.\S+/;
    return re.test(email);
}
function crearLoader(){
    return '<div class="loader"><div class="spinner"></div></div>'
}
function eliminarLoader(){
    $('.loader').remove()
}