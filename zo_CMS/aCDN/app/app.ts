snapper = new Snap({
    element: document.getElementById('content')
})

viewDir = '../aCDN/view/'
showRead()
function showRead() {
    forward('read','read', onLoadedR)
}
function onLoadedR() {
    console.log("loaded")
    cleanUpViews()
    snapper.close()
}

cAPI=new CloudAPI()
var editBut = document.getElementById('edit')
editBut.addEventListener('click', function() {
    console.log('edit')
    forward('form','form', onLoadedF)
})
function onLoadedF() {
    console.log("loaded")
    cleanUpViews()
    snapper.close()
}

var showBut = document.getElementById('show')
showBut.addEventListener('click', showRead )


/*

var newAppBut = document.getElementById('create')
newAppBut.addEventListener('click', function(e) {
    var ename =new Object()
    var firstname = $('#firstname').val()
    var lastname = $('#lastname').val()
    ename.firstname=firstname
    ename.lastname=lastname
    console.log("clicked " + firstname +", " + lastname)
    cAPI.insert("nameapp",ename, onPK)
})

function onPK(data){
    console.log('back')
    //console.log(data)
}

$('#lookup').click(function(){
    var ename =new Object()
    var firstname = $('#firstname').val()
    ename.firstname=firstname
    console.log("clicked " + firstname)
    cAPI.select("nameapp", ename, onFound)
})

function onFound(data){
    console.log(data.array_)
    $("#firstname").val(data.array_[0].firstname)
    $("#lastname").val(data.array_[0].lastname)
}

*/
