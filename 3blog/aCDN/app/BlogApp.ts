viewDir = '../aCDN/view/'
console.log('v0.0')

snapper = new Snap({
    element: document.getElementById('content')
})
snapper.close()


class EnterForm {
    constructor() {
        forward('enterForm', 'enterForm')
    }

}

frm = new EnterForm()