addEventListener("keyup", (event) => {
    if(event.target.className != 'emojionearea-editor') return

    if (event.keyCode === 13) {
        $("#boton_enviar").click();
    }
})

$(document).ready(function(){
    ////////////// ACCION CON EL ENTER PARA MANDAR EL MENSAJE /////////////////

    $('#boton_enviar').click(function(){
        let param = {
            'mensaje' : $('#mensaje').val() == '' ? $('.emojionearea-editor').text() : $('#mensaje').val(),
            'usuario_id' : $('#usuario_id').val(),
            '_token': $('input[name="_token"]').val()
        }

        if(!param.mensaje.trim().length){
            $('.emojionearea').addClass('focuss')
            $('.emojionearea-editor').text('')
            return false
        }
        $('.emojionearea').removeClass('focuss')
        $.ajax({
            url: "/proyecto_chat/mensaje",
            type: "POST",
            data:param,
            success: function(data) {
                $('.emojionearea-editor').text('')
                actualizar_chat()
            },
            error: function() {
                $('.emojionearea').addClass('focuss')
                $('.emojionearea-editor').text('')
                //Fallo al buscar datos
                alertify.alert('No se pudo enviar el mensaje, vuelva a intentar.')
            }
        })
    })

    // PARA EMOJIS DE MSJ
    $("#mensaje").emojioneArea();
})
setInterval(actualizar_chat, 20000)
function actualizar_chat(){
    let param = {
        'usuario_id' : $('#usuario_id').val(),
        'id_mensaje_ultimo' : $('#id_mensaje_ultimo').val(),
        'id_perfil_origen': $('#id_perfil_origen').val(),
        'id_perfil_destino': $('#id_perfil_destino').val(),
        '_token': $('input[name="_token"]').val()
    }
    //console.log(param)
    $.ajax({
        url: "/proyecto_chat/chatStatus",
        type: "POST",
        data:param,
        success: function(data) {
            //console.log(data)
            $('#mensajesSinLeerAqui').html(data)
            var id = document.getElementById("messages")
            id.scrollTop = id.scrollHeight;
        },
        error: function() {
            console.log('Error al actualizar chat')
        }
    })
}