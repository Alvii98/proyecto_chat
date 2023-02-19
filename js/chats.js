
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
})