
//start
var but = document.getElementById('sendBut')
but.addEventListener('click', function() {
        onSendClicked()
    },false
)

function onSendClicked() {
    console.log('save ')

    var msg:Object = new Object();
    msg.email= $('#signup-email').val()

    new CloudAPI()._call('resetPswd', msg, _onRetSaved,null)
    $('#saved').show()
}

function _onRetSaved(data_, errorString) {
    console.log('L')
    console.log(JSON.stringify(data_))
    setTimeout(function() {
        location="http://primusAPI.com"
        }, 5*1000
    )
}//()




