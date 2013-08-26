declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.4')
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

class AccountSrv {//Account services
    loginDat:Object;
    list:Array;
    private app:App;

    constructor(app_:App) {
        this.app = app_
    }

    getApps(cb) {
        var msg:Object = new Object()
        msg.account_id = this.loginDat._id
        this.app.cloudAPI._call('ListApps', msg, cb,null)
    }

    getApp(name:string,cb) {
        console.log(name)
        var msg:Object = new Object()
        msg.app_name=name
        msg.account_id =  this.loginDat._id
        console.log(JSON.stringify(msg))
        this.app.cloudAPI._call('GetApp', msg, cb,null)
    }

    insertNew(name:string,cb) { //this.onRet.bind(this)
        var msg:Object = new Object()
        msg.account_id =  this.loginDat._id
        msg.app_name = name//
        $('#new_app').val('')
        this.app.cloudAPI._call('ListApps', msg, cb ,null)
    }

}

class Account {
    private srv:AccountSrv;
    private app:App;
    constructor(data:Object,app_:App) {
        this.srv = new AccountSrv(app_)
        this.app = app_;
        this.srv.loginDat = data;
        forward('Account','account',this.onLoaded.bind(this))
        cleanUpViews(0)
    }//
    private onLoaded() {
        var newBut = document.getElementById('newAppBut')
        newBut.addEventListener('click',this.onNew.bind(this))
        var temp = document.getElementById('template')
        temp.addEventListener('click', this.onClicked.bind(this))

        this.srv.getApps(this.onRet.bind(this))
    }

    private onRet(data) {
        this.srv.list = data.array_
        console.log(this.srv.list)
        $('#template').render(this.srv.list);
    }

    private onClicked(e) {
        //console.log(e)
        var name:string = e.target.textContent
        console.log(name)
        this.srv.getApp(this.onAppData.bind(this))
    }

    private onAppData(dat) {
        console.log(dat)
    }

    private onNew() {
        this.srv.insertNew($('#new_app').val(), this.onRet.bind(this) )
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
