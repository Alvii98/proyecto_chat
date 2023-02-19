$(document).ready(function(){
    $('#edit-usuario').click(function(){
        if($('#guardar-usuario').css('display') == 'none'){
            $('#guardar-usuario').css('display', '')
            $('#exit-usuario').css('display', '')
            $('#edit-usuario').css('display', 'none')
            $('#nombre-usuario').css('display', '')
            $('#usuario-perfil').css('display', 'none')
        }
    })
    $('#exit-usuario').click(function(){
        if($('#edit-usuario').css('display') == 'none'){
            $('#edit-usuario').css('display', '')
            $('#exit-usuario').css('display', 'none')
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
                    $('#exit-usuario').css('display', 'none')
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




    $('#edit-correo').click(function(){
        if($('#guardar-correo').css('display') == 'none'){
            $('#guardar-correo').css('display', '')
            $('#exit-correo').css('display', '')
            $('#edit-correo').css('display', 'none')
            $('#correo-usuario').css('display', '')
            $('#correo-perfil').css('display', 'none')
        }
    })
    $('#exit-correo').click(function(){
        if($('#edit-correo').css('display') == 'none'){
            $('#edit-correo').css('display', '')
            $('#exit-correo').css('display', 'none')
            $('#codigo-usuario').css('display', 'none')
            $('#guardar-correo').css('display', 'none')
            $('#correo-usuario').css('display', 'none')
            $('#correo-perfil').css('display', '')
        }
    })

    $('#guardar-correo').click(function(){
        if($('#codigo-usuario').css('display') == 'none'){
            let param = {
                'correo' : $('#correo-usuario').val(),
                '_token': $('input[name="_token"]').val()
            }
            if($.trim(param.correo) == ''){
                alertify.alert('Complete el campo correo para cambiar.')
                return false 
            }
            $.ajax({
                url: "/proyecto_chat/enviarCorreo",
                // dataType: 'json',
                type: "POST",
                data: param,
                success: function(data) {
                    if(data == 'Error al enviar correo, por favor verifique el correo y vuelva a intentar.'){
                        alertify.alert(data)
                        return false
                    }else{
                        codigoGlobal = data.codigo
                        $('#codigo-usuario').css('display', '')
                        $('#correo-usuario').val('')
                        $('#codigo-usuario').attr("placeholder", "Igrese el nuevo correo.");
                        alertify.alert('Se envio un correo con el codigo de verificacion.')
                    }
                },
                error: function(error) {
                    alertify.alert('Error al cambiar el usuario, intente mas tarde.')
                    console.log(error)
                }
            })  
        }else{
            let param = {
                'codigo' : $('#codigo-usuario').val(),
                'codigoComparar' : codigoGlobal,
                'correo' : $('#correo-usuario').val(),
                '_token': $('input[name="_token"]').val()
            }
            if($.trim(param.correo) == ''){
                alertify.alert('Complete el campo correo para cambiar.')
                return false 
            }
            $.ajax({
                url: "/proyecto_chat/enviarCorreo",
                // dataType: 'json',
                type: "POST",
                data: param,
                success: function(data) {
                    if(data == 'Error al enviar correo, por favor verifique el correo y vuelva a intentar.'){
                        alertify.alert(data)
                        return false
                    }else{
                        codigoGlobal = data.codigo
                        $('#codigo-usuario').css('display', '')
                        alertify.alert('Se envio un correo con el codigo de verificacion.')
                    }
                },
                error: function(error) {
                    alertify.alert('Error al cambiar el usuario, intente mas tarde.')
                    console.log(error)
                }
            })  
        }
    })

})