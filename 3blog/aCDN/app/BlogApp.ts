viewDir = '../aCDN/view/'
console.log('v0.1')

snapper = new Snap({
    element: document.getElementById('content')
})
snapper.close()

class EnterForm {
    constructor() {
        forward('enterForm', 'enterForm')
    }//()
}
//frm = new EnterForm()

class Posting {
    constructor() {
        forward('Posting', 'Posting')
    }//()
}

pst = new Posting()

