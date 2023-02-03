/*setInterval(actualizar_no_leidos, 1000)
function actualizar_no_leidos(){
    let param = {
        'no_leidos' : true
    }
    $.ajax({
        url: "/conversaciones",
        type: "GET",
        data:param,
        success: function(data) {
            console.log(data)
            if(data.actualizar == 'actualizar'){
                $('#msj_no_leidos').text(data.cantidad)
                $('#msj_no_leidos').attr('style','display: inline;')
                data.id_usuario.forEach(id => {
                    $('#msj_no_leidos_'+id.id_usuario_origen).attr('style','color: #506856;')
                })
            }
        },
        error: function() {
            console.log('Error al actualizar chat')
        }
    })
}*/