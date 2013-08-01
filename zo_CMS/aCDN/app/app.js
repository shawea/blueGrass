snapper = new Snap({
    element: document.getElementById('content')
});

viewDir = '../aCDN/view/';
showRead();
function showRead() {
    forward('read', 'read', onLoadedR);
}
function onLoadedR() {
    console.log("loaded");
    cleanUpViews();
    snapper.close();
}

cAPI = new CloudAPI();
var editBut = document.getElementById('edit');
editBut.addEventListener('click', function () {
    console.log('edit');
    forward('form', 'form', onLoadedF);
});
function onLoadedF() {
    console.log("loaded");
    cleanUpViews();
    snapper.close();
}

var showBut = document.getElementById('show');
showBut.addEventListener('click', showRead);
//@ sourceMappingURL=app.js.map
