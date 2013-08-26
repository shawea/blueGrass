declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.2')
    new App()
})

class JoinLoginSrv {
    private app:App;
    constructor(app_:App) {
        this.app = app_
    }

    login(model:Object, cb:any) {
        this.app.cloudAPI._call('JoinLogin', model, cb ,null)
    }
}

class JoinLogin {
    private app:App;
    private srv:JoinLoginSrv;
    constructor(app_:App) {
        this.app = app_
        this.srv = new JoinLoginSrv(app_)
        forward('JoinLogin','joinLogin',this.onLoaded.bind(this))
    }//
    private onLoaded() {
        var Lbut = document.getElementById('loginBut')
        Lbut.addEventListener('click',this.onLogBut.bind(this))
        var jbut = document.getElementById('joinBut')
        jbut.addEventListener('click',this.getJoinModel.bind(this))
    }
    private onLogBut() {
        var loginModel=this.getLoginModel()
        //console.log(loginModel)
        if(loginModel==null) return;
        this.srv.login(loginModel, this.onLoginRet.bind(this))

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
    private getLoginModel():Object {
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

    private getJoinModel():Object  {
        var full_name:string= $('#full_name').val()
        if(full_name.length<2) {
            $('#nameError').show()
            return null;
        }
        $('#nameError').hide()

        var email:String = $('#Jemail').val()
        if(!isEmailValid(email)) {
            $('#signupEmailError').show()
            return null;
        }
        $('#signupEmailError').hide()

        var terms:bool = $('#checkboxT').is(":checked")
        console.log(terms)
        if(!terms) {
            $('#termsError').show()
            return null;
        }
        $('#termsError').hide()

        var pswd:String =  $('#Jpassword').val()
        var pswd2:String = $('#Jpassword2').val()
        if(pswd!=pswd2||pswd.length<2) {
            $('#notMatching').show()
            return null;
        }
        $('#notMatching').hide()

        var msg = new Object()
        msg.full_name= full_name
        msg.pswd= pswd
        msg.pswd2= pswd2
        msg.email= email;
        msg.promo_code= $('#promo_code').val()
        return msg;
    }
}


class AccountSrv {//Account services
    loginDat:Object;
    list:Array;
    row:Object;
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
        //console.log(this.srv.list)
        $('#template').render(this.srv.list);
    }

    private onClicked(e) {
        //console.log(e)
        var name:string = e.target.textContent
        this.srv.getApp(name,this.onAppData.bind(this))
    }

    private onAppData(dat) {
        this.srv.row = dat
        //console.log(dat)
        $('#app_name').val(dat.app_name)
        $('#app_key').val(dat.secret_app_key)
        $('#domain').val(dat.domain)
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
