window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    new App();
});

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        forward('JoinLogin', 'joinLogin');
    }
    return JoinLogin;
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
