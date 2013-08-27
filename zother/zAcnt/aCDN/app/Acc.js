head.js('http://scdn.primus.netdna-cdn.com/latest/more/jquery-2.0.3.min.js', 'http://scdn.primus.netdna-cdn.com/latest/more/transparency.min.js', 'http://scdn.primus.netdna-cdn.com/latest/TweenLite.min.js', 'http://scdn.primus.netdna-cdn.com/latest/signals.min.js', 'http://scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js', 'http://scdn.primus.netdna-cdn.com/latest/blueGrass.js', 'http://scdn.primus.netdna-cdn.com/latest/cloudAPI.js', 'aCDN/app/Srv.js');

head.ready(function () {
    viewDir = 'aCDN/view/';
    console.log('0.2');
    new App();
});

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        this.srv = new JoinLoginSrv(app_);
        forward('JoinLogin', 'joinLogin', this.onLoaded.bind(this));
    }
    JoinLogin.prototype.resetPassword = function () {
        console.log('reset');
        location = 'aCDN/reset/requestPswd.html';
    };
    JoinLogin.prototype.onLoaded = function () {
        var Lbut = document.getElementById('loginBut');
        Lbut.addEventListener('click', this.onLogBut.bind(this));
        var jbut = document.getElementById('joinBut');
        jbut.addEventListener('click', this.getJoinModel.bind(this));
        var resetPassword = document.getElementById('resetPassword');
        resetPassword.addEventListener('click', this.resetPassword.bind(this));
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
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        if (typeof first_name == 'undefined' || typeof last_name == 'undefined') {
            $('#nameError').show();
            return null;
        }
        if (first_name.length < 2 || last_name.length < 2) {
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
        msg.first_name = first_name;
        msg.last_name = last_name;
        msg.pswd = pswd;
        msg.pswd2 = pswd2;
        msg.email = email;
        msg.promo_code = $('#promo_code').val();

        this.srv.join(msg, this.onJoinRet.bind(this));
        return;
    };
    return JoinLogin;
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
        var dataviewBut = document.getElementById('dataviewBut');
        dataviewBut.addEventListener('click', function (e) {
            location = 'http://ca_1.primusAPI.com/dataView/';
        });

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
