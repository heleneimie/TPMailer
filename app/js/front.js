$(document).ready(function () {




    // évènement btn nouvelle campagne - action de création dynamique du formulaire HTML
    $('#btn_add_campaigns').on('click', function () {
        $('.campaigns_list').prepend(
        );
    });

    // évènement btn modifier campagne
    $('.campaigns_list').on('click', '.btn_update', function () {
        alert('Ce code fonctionne !');
    });

    // évènement btn supprimer campagne
    $('.campaigns_list').on('click', '.btn_delete', function () {
        alert('Ce code fonctionne !');
    });

    // évènement btn envoie campagne
    $('.campaigns_list').on('click', '.btn_send', function () {
        alert('Ce code fonctionne !');
    });

    // évènement btn formulaire campagne
    $('.primary form').on('submit', function(e) {
        e.preventDefault();

        var datas = {
            name: $('input[name="name"]').val(),
            subject: $('input[name="subject"]').val(),
            content: $('input[name="content"]').val(),
            dateSend: $('input[name="dateSend"]').val()
        }

        $.ajax({
            url: 'http://localhost:3000/api/v1/campaigns',
            type: 'POST',
            dataType: 'json',
            data: {
                name: datas.name,
                subject: datas.subject,
                content: datas.content,
                dateSend: datas.dateSend
            },
            success: function(result){
                console.log(result);
            } 
        }).fail(function(){
            alert('error');
        });
    });

});
