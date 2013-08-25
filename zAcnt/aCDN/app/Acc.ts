declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.2')
    new App()
})


class JoinLogin {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        forward('JoinLogin','joinLogin',this.onLoaded.bind(this))
    }//
    private onLoaded() {
        var Lbut = document.getElementById('loginBut')
        Lbut.addEventListener('click',this.onLogBut.bind(this))
    }
    private onLogBut() {
       //new Account(this.app)
        var loginModel=this._getModel(null)
        console.log(loginModel)
        if(loginModel==null) return;
        this.app.cloudAPI._call('JoinLogin', loginModel, this.onLoginRet.bind(this),null)

    }
    private onLoginRet(data,er) {
        if(typeof er != 'undefined') {
            console.log(er)
            $('#loginEmailError').show()
            return;
        }
        $('#loginEmailError').hide()
        console.log(data)
        this.app.showAccount(data)
    }
    private _getModel(arg:any):Object {
        console.log(this)
        var email:String = $('#email').val()
        if(!isEmailValid(email)) {
            $('#loginEmailError').show()
            return null;
        }
        $('#loginEmailError').hide();

        var msg:Object = new Object()
        msg.pswd= $('#password').val()
        msg.email = email
        return msg;
    }


}

class Account {
    _data:Object;
    constructor(data:Object) {
        this._data = data;
        forward('Account','account',this.onLoaded.bind(this))
        cleanUpViews(0)
    }//
    private onLoaded() {

    }
}


class App {
    cloudAPI:Object;
    constructor () {
        this.cloudAPI = new CloudAPI();
        this.loadFirst()
    }//()
    showAccount(data) {
         new Account(data)
    }

    loadFirst() {
        new JoinLogin(this)
    }


}//class
