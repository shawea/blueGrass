
class Login implements IModPresenter {
	constructor() {
		forward('login','login',this._onLoaded)
	}

	_transition(transEnum:number, ctx:any):void {	}
	_onLoaded(guid:string) {
        console.log('READY')
        var loginBut = document.getElementById('loginBut')
        loginBut.addEventListener('click', function(e) {
            app._login._onLoginClicked()
            },false)

        var signupBut = document.getElementById('signupBut')
        signupBut.addEventListener('click', function(e) {
            app._login._onSignupClicked()
        },false)


        var resetPassword = document.getElementById('resetPassword')
        resetPassword.addEventListener('click', function(e) {
            app._login._resetPassword()
        },false)

    }//()

    _resetPassword() {
        location="requestPswd.html"
    }

    _onLoginClicked() {
        console.log('login ')
        var email:String = $('#loginEmail').val()
        console.log(email)
        if(!isEmailValid(email)) {

            $('#loginEmailError').show()
            return;
        }
        $('#loginEmailError').hide()

        var msg:Object = new Object();
        msg.pswd= $('#loginPswd').val()
        msg.email = email
        app.cloudAPI._call('JoinLogin', msg, app._login._onRetLogin,null)
        _gaq.push(['_trackEvent', 'Button', 'Click', 'Join'])


    }
    _onRetLogin(data_, errorString) {
        console.log('L')
        console.log(JSON.stringify(data_))
        if(errorString) {
            console.log(errorString)
            $('#loginEmailError').show()
            return;
        }
        app.accData=data_
        app._profile._transition()
    }//()


    _onSignupClicked() {
        console.log('signup ')

        var full_name:string= $('#signup-name').val()
        if(full_name.length<2) {
            $('#nameError').show()
            return;
        }
        $('#nameError').hide()

        var email:String = $('#signup-email').val()
        if(!isEmailValid(email)) {
            $('#signupEmailError').show()
            return;
        }
        $('#signupEmailError').hide()

        var terms:bool = $('#checkboxT').is(":checked")
        console.log(terms)
        if(!terms) {
            $('#termsError').show()
            return;
        }
        $('#termsError').hide()

        var pswd:String =  $('#signup-pass').val()
        var pswd2:String = $('#signup-pass2').val()
        if(pswd!=pswd2||pswd.length<2) {
            $('#notMatching').show()
            return;
        }
        $('#notMatching').hide()


        var promo_code:String = $('#promo_code').val()

        var msg:Object = new Object();
        msg.full_name=full_name
        msg.email = email
        msg.pswd=pswd
        msg.pswd2=pswd2
        msg.promo_code=promo_code
        console.log(JSON.stringify(msg))
        app.cloudAPI._call('JoinLogin', msg, app._login._onSignUpRet,null)

    }

    _onSignUpRet(data_, errorString) {
        console.log('S')
        console.log(JSON.stringify(data_))
        if(errorString) {
            console.log(errorString)
            $('#dataSignUpError').text(errorString)
            $('#dataSignUpError').show()
            return;
        }

        app.accData=data_
        app._profile._transition()
        _gaq.push(['_trackEvent', 'Button', 'Click', 'Sign Up'])
    }

}//class

class Profile implements IModPresenter {
    constructor() {    }

    _transition(transEnum:number, ctx:any):void {
        forward('profile','profile',this._onLoaded)
    }

    _onNewApp() {
        var msg:Object = new Object()
        msg.account_id =  app.accData._id
        msg.app_name = $('#new_app_name').val()
        console.log(JSON.stringify(msg))

        $('#new_app_name').val('')
        //clear

        app.cloudAPI._call('ListApps', msg, app._profile._onRet,null)
    }

    _onLoaded(guid:string) {

        console.log('profile')
        cleanUpViews()

        var newAppBut = document.getElementById('newAppBut')
        newAppBut.addEventListener('click', function(e) {
            app._profile._onNewApp()
        },false)


        var dataviewBut = document.getElementById('dataviewBut')
        dataviewBut.addEventListener('click', function(e) {
            location="http://ca_1.primusAPI.com/dataView/"
        },false)


        var options = {
            valueNames: ['_id', 'app_name' ]
        }
        list = new List('apps-list', options)
        var el = document.querySelector('#apps-list');
        el.addEventListener('click', function(evt) {
            //console.log((this))
            var t:string=evt.target.textContent
            //console.log(t)

            var rows = list.search(t)
            list.search()
            var val = rows[0].elm
            //console.log(val)
            var name:string = val.textContent
            //console.log(name)

            var msg:Object = new Object()
            msg.app_name=name.replace(/\s/g, "")
            msg.account_id =  app.accData._id
            console.log(JSON.stringify(msg))
            app.cloudAPI._call('GetApp', msg, app._profile._onRowRet,null)
        },false);

        app._profile._getApps()
    }//()

    _onRowRet(data_) {
        $('#app_name').text(data_.app_name)
        $('#secret_app_key').text(data_.secret_app_key)
    }

    _getApps() {
        var msg:Object = new Object()
        msg.account_id =  app.accData._id
        app.cloudAPI._call('ListApps', msg, app._profile._onRet,null)
    }
    _onRet(data_) {
        app.appsData=data_
        console.log(app.appsData.array_)
        var sz=1
        while(sz>0) {
            var r=list.removeAll();
            sz=list.size();
            console.log(sz)
        }
        list.add(app.appsData.array_)
        list.sort('app_name', { asc: true });

        var firstRow=data_.array_[0]
        $('#app_name').text(firstRow.app_name)
        $('#secret_app_key').text(firstRow.secret_app_key)

    }

}//class

class MyApp implements IAppNRouter {
	_login:Login;
    _profile:Profile;
    accData:Object;
    appsData:Object;   // list of applications
    cloudAPI:any;
	constructor() {
        this.cloudAPI = new CloudAPI('Primus')
		this._login = new Login()
        this._profile = new Profile()
    }//()

	_onUrlChanged(newUrl, oldUrl):void {
	}

	dispatch(view:string, ctx:any):bool {
		return false
	}//()

}//class

console.log('acc v0.0706')
viewDir = '../acdn/view/'
var app:MyApp = new MyApp()

