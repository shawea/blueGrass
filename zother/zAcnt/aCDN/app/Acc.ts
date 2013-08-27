declare var TweenLite;

head.js( 'http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/more/transparency.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/TweenLite.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/signals.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js'
        ,'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js'

    ,'aCDN/app/Srv.js'
)//head

head.ready(function() {
    viewDir = 'aCDN/view/'
    console.log('0.2')
    new App()
})

class JoinLogin {
    private app:App;
    private srv:JoinLoginSrv;
    constructor(app_:App) {
        this.app = app_
        this.srv = new JoinLoginSrv(app_)
        forward('JoinLogin','joinLogin',this.onLoaded.bind(this))
    }//

    private resetPassword() {
        console.log('reset')
        location='aCDN/reset/requestPswd.html'
    }
    private onLoaded() {
        var Lbut = document.getElementById('loginBut')
        Lbut.addEventListener('click',this.onLogBut.bind(this))
        var jbut = document.getElementById('joinBut')
        jbut.addEventListener('click',this.getJoinModel.bind(this))
        var resetPassword = document.getElementById('resetPassword')
        resetPassword.addEventListener('click',this.resetPassword.bind(this))
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

    private onJoinRet(data,er) {
        console.log(er)
        if(typeof er != 'undefined') {
            $('#customEr').text(er)
            return
        }
        this.app.showAccount(data)
    }
    private getJoinModel()  {
        var first_name:string= $('#first_name').val()
        var last_name:string=  $('#last_name').val()
        if(typeof first_name == 'undefined' || typeof last_name == 'undefined') {
            $('#nameError').show()
            return null;
        }
        if(first_name.length<2 || last_name.length <2 ) {
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

        var terms:bool = $('#terms').is(":checked")
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
        msg.first_name= first_name
        msg.last_name = last_name
        msg.pswd= pswd
        msg.pswd2= pswd2
        msg.email= email;
        msg.promo_code= $('#promo_code').val()

        this.srv.join(msg, this.onJoinRet.bind(this))
        return
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
        var dataviewBut = document.getElementById('dataviewBut')
        dataviewBut.addEventListener('click', function(e) {
            location='http://ca_1.primusAPI.com/dataView/'
        })

        this.srv.getApps(this.onRet.bind(this))
        this.srv.getApp('firstapp',this.onAppData.bind(this))//load first



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
