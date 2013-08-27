
head.js( 'http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js'
)//head

head.ready(function() {
    console.log('ready')
})

//start
var but = document.getElementById('resetBut')
but.addEventListener('click', function() {
        onSendClicked()
    },false
)

function onSendClicked() {
    console.log('save ')

    var msg:Object = new Object();
    msg.email= $('#email').val()

    new CloudAPI()._call('resetPswd', msg, _onRetSaved,null)
    $('#saved').show()
}

function _onRetSaved(data_, errorString) {
    setTimeout(function() {
        location='http://primusAPI.com'
        }, 6*1000
    )
}//()




