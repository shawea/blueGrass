
//start
var but = document.getElementById('saveBut')
but.addEventListener('click', function() {
        onSavedClicked()
    },false
)

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
    msg.reset= getGuerryString("reset")
    msg.reset_token= getGuerryString("reset_token")

    new CloudAPI()._call('resetPswd', msg, _onRetSaved,null)
    $('#saved').show()
}

function _onRetSaved(data_, errorString) {
    console.log('L')
    console.log(JSON.stringify(data_))
    setTimeout(function() {
        location="http://primusAPI.com"
        }, 10*1000
    )
}//()




