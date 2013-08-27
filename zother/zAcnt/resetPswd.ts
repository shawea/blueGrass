
head.js( 'http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js'
)//head

head.ready(function() {
    console.log('ready')
})


var but = document.getElementById('saveBut')
but.addEventListener('click', function() {
        onSavedClicked()
})

function onSavedClicked() {
    console.log('save ')
    var pswd= $('#loginPswd').val()
    var pswd2= $('#loginPswd2').val()

    if(pswd!=pswd2) {
        $('#notMatching').show()
        return;
    }
    $('#notMatching').hide()

    var msg:Object = new Object();
    msg.pswd=pswd;
    msg.reset= getGuerryString('reset')
    msg.reset_token= getGuerryString('reset_token')

    new CloudAPI()._call('resetPswd', msg, _onRetSaved,null)
    $('#saved').show()
}

function _onRetSaved(data_, errorString) {
    console.log('L')
    console.log(JSON.stringify(data_))
    setTimeout(function() {
        location='http://primusAPI.com'
        }, 8*1000
    )
}//()




