window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('1');
    new App();
});

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        forward('JoinLogin', 'joinLogin', this.onLoaded.bind(this));
    }
    JoinLogin.prototype.onLoaded = function () {
        var but = document.getElementById('joinBut');
        but.addEventListener('click', this.onBut.bind(this));
    };
    JoinLogin.prototype.onBut = function () {
        new Account(this.app);
    };
    return JoinLogin;
})();

var Account = (function () {
    function Account(app_) {
        this.app = app_;
        forward('Account', 'account');
        cleanUpViews(0);
    }
    return Account;
})();

var App = (function () {
    function App() {
        this.loadFirst();
    }
    App.prototype.loadFirst = function () {
        new JoinLogin(this);
    };
    return App;
})();
//@ sourceMappingURL=Acc.js.map
