window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.2');
    new App();
});

var JoinLoginSrv = (function () {
    function JoinLoginSrv(app_) {
        this.app = app_;
    }
    JoinLoginSrv.prototype.login = function (model, cb) {
        this.app.cloudAPI._call('JoinLogin', model, cb, null);
    };

    JoinLoginSrv.prototype.join = function (model, cb) {
        this.app.cloudAPI._call('JoinLogin', model, cb, null);
    };
    return JoinLoginSrv;
})();

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        this.srv = new JoinLoginSrv(app_);
        forward('JoinLogin', 'joinLogin', this.onLoaded.bind(this));
    }
    JoinLogin.prototype.onLoaded = function () {
        var Lbut = document.getElementById('loginBut');
        Lbut.addEventListener('click', this.onLogBut.bind(this));
        var jbut = document.getElementById('joinBut');
        jbut.addEventListener('click', this.getJoinModel.bind(this));
    };
    JoinLogin.prototype.onLogBut = function () {
        var loginModel = this.getLoginModel();

        if (loginModel == null)
            return;
        this.srv.login(loginModel, this.onLoginRet.bind(this));
    };
    JoinLogin.prototype.onLoginRet = function (data, er) {
        if (typeof er != 'undefined') {
            console.log(er);
            $('#loginEmailError').show();
            return;
        }
        $('#loginEmailError').hide();

        //console.log(data)
        this.app.showAccount(data);
    };
    JoinLogin.prototype.getLoginModel = function () {
        var email = $('#email').val();
        if (!isEmailValid(email)) {
            $('#loginEmailError').show();
            return null;
        }
        $('#loginEmailError').hide();

        var msg = new Object();
        msg.pswd = $('#password').val();
        msg.email = email;
        return msg;
    };

    JoinLogin.prototype.onJoinRet = function (data, er) {
        console.log(er);
        if (typeof er != 'undefined') {
            $('#customEr').text(er);
            return;
        }
        this.app.showAccount(data);
    };
    JoinLogin.prototype.getJoinModel = function () {
        var full_name = $('#full_name').val();
        if (full_name.length < 2) {
            $('#nameError').show();
            return null;
        }
        $('#nameError').hide();

        var email = $('#Jemail').val();
        if (!isEmailValid(email)) {
            $('#signupEmailError').show();
            return null;
        }
        $('#signupEmailError').hide();

        var terms = $('#terms').is(":checked");
        console.log(terms);
        if (!terms) {
            $('#termsError').show();
            return null;
        }
        $('#termsError').hide();

        var pswd = $('#Jpassword').val();
        var pswd2 = $('#Jpassword2').val();
        if (pswd != pswd2 || pswd.length < 2) {
            $('#notMatching').show();
            return null;
        }
        $('#notMatching').hide();

        var msg = new Object();
        msg.full_name = full_name;
        msg.pswd = pswd;
        msg.pswd2 = pswd2;
        msg.email = email;
        msg.promo_code = $('#promo_code').val();

        this.srv.join(msg, this.onJoinRet.bind(this));
        return;
    };
    return JoinLogin;
})();

var AccountSrv = (function () {
    function AccountSrv(app_) {
        this.app = app_;
    }
    AccountSrv.prototype.getApps = function (cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        this.app.cloudAPI._call('ListApps', msg, cb, null);
    };

    AccountSrv.prototype.getApp = function (name, cb) {
        var msg = new Object();
        msg.app_name = name;
        msg.account_id = this.loginDat._id;
        console.log(JSON.stringify(msg));
        this.app.cloudAPI._call('GetApp', msg, cb, null);
    };

    AccountSrv.prototype.insertNew = function (name, cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        msg.app_name = name;
        $('#new_app').val('');
        this.app.cloudAPI._call('ListApps', msg, cb, null);
    };
    return AccountSrv;
})();

var Account = (function () {
    function Account(data, app_) {
        this.srv = new AccountSrv(app_);
        this.app = app_;
        this.srv.loginDat = data;
        forward('Account', 'account', this.onLoaded.bind(this));
        cleanUpViews(0);
    }
    Account.prototype.onLoaded = function () {
        var newBut = document.getElementById('newAppBut');
        newBut.addEventListener('click', this.onNew.bind(this));
        var temp = document.getElementById('template');
        temp.addEventListener('click', this.onClicked.bind(this));

        this.srv.getApps(this.onRet.bind(this));
        this.srv.getApp('firstapp', this.onAppData.bind(this));
    };

    Account.prototype.onRet = function (data) {
        this.srv.list = data.array_;

        //console.log(this.srv.list)
        $('#template').render(this.srv.list);
    };

    Account.prototype.onClicked = function (e) {
        //console.log(e)
        var name = e.target.textContent;
        this.srv.getApp(name, this.onAppData.bind(this));
    };

    Account.prototype.onAppData = function (dat) {
        this.srv.row = dat;

        //console.log(dat)
        $('#app_name').val(dat.app_name);
        $('#app_key').val(dat.secret_app_key);
        $('#domain').val(dat.domain);
    };

    Account.prototype.onNew = function () {
        this.srv.insertNew($('#new_app').val(), this.onRet.bind(this));
    };
    return Account;
})();

var App = (function () {
    function App() {
        this.cloudAPI = new CloudAPI();
        this.loadFirst();
    }
    App.prototype.showAccount = function (data) {
        new Account(data, this);
    };

    App.prototype.loadFirst = function () {
        new JoinLogin(this);
    };
    return App;
})();
//@ sourceMappingURL=Acc.js.map
