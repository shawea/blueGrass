declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('1')
    new App()
})


class JoinLogin {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        forward('JoinLogin','joinLogin',this.onLoaded.bind(this))
    }//
    onLoaded() {
        var but = document.getElementById('joinBut')
        but.addEventListener('click',this.onBut.bind(this))



    }
    onBut() {
        new Account(this.app)
    }
}

class Account {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        forward('Account','account')
        cleanUpViews(0)
    }//

}



class App {
    constructor () {
        this.loadFirst()
    }//()

    loadFirst() {
        new JoinLogin(this)
    }

}//class
