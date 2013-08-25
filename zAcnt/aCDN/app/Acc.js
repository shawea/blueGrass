window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.3');
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

        this.app.showAccount(data);
    };
    JoinLogin.prototype._getModel = function (arg) {
        console.log(this);
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

var Account = (function () {
    function Account(data, app_) {
        this.app = app_;
        this._Ldata = data;
        forward('Account', 'account', this.onLoaded.bind(this));
        cleanUpViews(0);
    }
    Account.prototype.onLoaded = function () {
        this.getApps();
        var newBut = document.getElementById('newAppBut');
        newBut.addEventListener('click', this.onNew.bind(this));
    };
    Account.prototype.getApps = function () {
        var msg = new Object();
        msg.account_id = this._Ldata._id;
        this.app.cloudAPI._call('ListApps', msg, this.onRet.bind(this), null);
    };
    Account.prototype.onRet = function (data) {
        console.log(data);
    };

    Account.prototype.onNew = function () {
        var msg = new Object();
        msg.account_id = this._Ldata._id;
        msg.app_name = $('#new_app').val();
        $('#new_app').val('');
        this.app.cloudAPI._call('ListApps', msg, this.onRet.bind(this), null);
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
