window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.2');
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
        console.log(loginModel);
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
        console.log(data);
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
    function Account(data) {
        this._data = data;
        forward('Account', 'account', this.onLoaded.bind(this));
        cleanUpViews(0);
    }
    Account.prototype.onLoaded = function () {
    };
    return Account;
})();

var App = (function () {
    function App() {
        this.cloudAPI = new CloudAPI();
        this.loadFirst();
    }
    App.prototype.showAccount = function (data) {
        new Account(data);
    };

    App.prototype.loadFirst = function () {
        new JoinLogin(this);
    };
    return App;
})();
//@ sourceMappingURL=Acc.js.map
