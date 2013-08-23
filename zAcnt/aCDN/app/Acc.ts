declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    new App()
})


class JoinLogin {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        forward('JoinLogin','joinLogin')
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
