viewDir = '../aCDN/view/';
console.log('v0.0');

snapper = new Snap({
    element: document.getElementById('content')
});
snapper.close();

var EnterForm = (function () {
    function EnterForm() {
        forward('enterForm', 'enterForm');
    }
    return EnterForm;
})();

frm = new EnterForm();
//@ sourceMappingURL=BlogApp.js.map
