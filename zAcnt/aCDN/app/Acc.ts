declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.3')
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
        //console.log(loginModel)
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
        //console.log(data)
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
    private loginDat:Object;
    private _list:Array;
    private app:App;
    constructor(data:Object,app_:App) {
        this.app = app_;
        this.loginDat = data;
        forward('Account','account',this.onLoaded.bind(this))
        cleanUpViews(0)
    }//
    private onLoaded() {
        this.getApps()
        var newBut = document.getElementById('newAppBut')
        newBut.addEventListener('click',this.onNew.bind(this))
    }
    private getApps() {
        var msg:Object = new Object()
        msg.account_id = this.loginDat._id
        this.app.cloudAPI._call('ListApps', msg, this.onRet.bind(this),null)
    }
    private onRet(data) {
        this._list = data.array_
        console.log(this._list)
        $('#template').render(this._list);
        var temp = document.getElementById('template')
        temp.addEventListener('click', this.onClicked.bind(this))
    }

    private onClicked(e) {
        //console.log(e)
        var name:string = e.target.innerText
        console.log(name)
        console.log(e.target.textContent)

        var msg:Object = new Object()
        msg.app_name=name.replace(/\s/g, "")
        msg.account_id =  app.accData._id
        console.log(JSON.stringify(msg))
        app.cloudAPI._call('GetApp', msg, app._profile._onRowRet,null)

    }

    private onNew() {
        var msg:Object = new Object()
        msg.account_id =  this.loginDat._id
        msg.app_name = $('#new_app').val()
        $('#new_app').val('')
        this.app.cloudAPI._call('ListApps', msg, this.onRet.bind(this),null)
    }

}



class App {
    cloudAPI:Object;
    constructor () {
        this.cloudAPI = new CloudAPI();
        this.loadFirst()
    }//()
    showAccount(data) {
         new Account(data,this)
    }

    loadFirst() {
        new JoinLogin(this)
    }


}//class
