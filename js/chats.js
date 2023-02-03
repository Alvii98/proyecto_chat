
function chat_usuario(id){
    $('#form_char_'+id).submit()
}
$(document).ready(function(){
    $('#configuracion').click(function(){
        if($('.configuracion').css('display') == 'none'){
            $('.configuracion').css('display', 'block')
        }else{
            $('.configuracion').css('display', 'none')
        }
    })
    $('#edit-usuario').click(function(){
        if($('#guardar-usuario').css('display') == 'none'){
            $('#guardar-usuario').css('display', '')
            $('.bi-x-circle').css('display', '')
            $('#edit-usuario').css('display', 'none')
            $('#nombre-usuario').css('display', '')
            $('#usuario-perfil').css('display', 'none')
        }
    })
    $('.bi-x-circle').click(function(){
        if($('#edit-usuario').css('display') == 'none'){
            $('#edit-usuario').css('display', '')
            $('.bi-x-circle').css('display', 'none')
            $('#guardar-usuario').css('display', 'none')
            $('#nombre-usuario').css('display', 'none')
            $('#usuario-perfil').css('display', '')
        }
    })

    $('#fotoPerfil').change(function() {
        $('#form_perfil').submit()
    });

    $('#guardar-usuario').click(function(){
        let param = {
            'nombre_usuario' : $('#nombre-usuario').val(),
            '_token': $('input[name="_token"]').val()
        }
        if($.trim(param.nombre_usuario) == ''){
            alertify.alert('Complete el campo usuario para cambiar.')
            return false 
        }
        $.ajax({
            url: "/proyecto_chat/editar_usuario",
            // dataType: 'json',
            type: "POST",
            data: param,
            success: function(data) {
                if(data == 'Usuario cambiado correctamente.'){
                    $('#usuario-perfil,#nombre_usuario').text($.trim($('#nombre-usuario').val()))
                    $('#edit-usuario').css('display', '')
                    $('.bi-x-circle').css('display', 'none')
                    $('#guardar-usuario').css('display', 'none')
                    $('#nombre-usuario').css('display', 'none')
                    $('#usuario-perfil').css('display', '')
                    alertify.alert(data)
                }else{
                    alertify.alert(data)
                }
            },
            error: function(error) {
                alertify.alert('Error al cambiar el usuario, intente mas tarde.')
                console.log(error)
            }
        })    
    })
})
