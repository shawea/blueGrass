window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.4');
    new App();
});

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        forward('JoinLogin', 'joinLogin', this.onLoaded.bind(this));
    }
    JoinLogin.prototype.onLoaded = function () {
        var Lbut = document.getElementById('loginBut');
        Lbut.addEventListener('click', this.onLogBut.bind(this));
    };
    JoinLogin.prototype.onLogBut = function () {
        //new Account(this.app)
        var loginModel = this._getModel(null);

        if (loginModel == null)
            return;
        this.app.cloudAPI._call('JoinLogin', loginModel, this.onLoginRet.bind(this), null);
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
    JoinLogin.prototype._getModel = function (arg) {
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
        console.log(name);
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
    };

    Account.prototype.onRet = function (data) {
        this.srv.list = data.array_;
        console.log(this.srv.list);
        $('#template').render(this.srv.list);
    };

    Account.prototype.onClicked = function (e) {
        //console.log(e)
        var name = e.target.textContent;
        console.log(name);
        this.srv.getApp(this.onAppData.bind(this));
    };

    Account.prototype.onAppData = function (dat) {
        console.log(dat);
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
