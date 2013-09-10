console.log('ready 0.01');
viewDir = 'view/';

document.querySelector('#load1').addEventListener('click', onclickone)
function onclickone() {
    console.log('I just got clicked thank you')
    open('view1', 'body', iloaded1)
    console.log('is it loaded?');
}

function iloaded1(){
    console.log('loaded1')
}

var load2But = document.getElementById('load2')
load2But.addEventListener('click', function() {
    console.log ('Test')
    open('view2', 'body', iloaded2)
})


function iloaded2(){
    console.log('loaded 2')
}


