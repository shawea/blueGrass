window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';

    FastClick.attach(document.body);
    new App();
});

var App = (function () {
    function App() {
        this.hashSignal = new signals.Signal();
        var enterF = new EnterForm(this);
        var about = new About(this);
        var home = new Home(this);

        this.loadFirst();
        cAPI = new CloudAPI();

        window.addEventListener('hashchange', this._onHashChanged.bind(this));
        this._setupNavDispatching();
    }
    App.prototype._setupNavDispatching = function () {
        this.navFlag = false;
        var menu = document.getElementById('navMenu');
        menu.addEventListener('click', this.toggleSideNav.bind(this), false);
        var nav = document.getElementById('navBut');
        nav.addEventListener('click', this.toggleSideNav.bind(this), false);

        var aboutBut = document.getElementById('aboutBut');
        aboutBut.addEventListener('click', function () {
            setHash('about');
        });
        var homeBut = document.getElementById('home');
        homeBut.addEventListener('click', function () {
            setHash('home');
        });
        var enter = document.getElementById('enterBut');
        enter.addEventListener('click', function () {
            setHash('enter');
        });
    };

    App.prototype.loadFirst = function () {
        var view = getHash();
        if (view == null)
            view = 'about';
        console.log('first ' + view);
        this.hashSignal.dispatch(view);
    };

    App.prototype._onHashChanged = function () {
        var view = getHash();
        console.log('changed ' + view);
        this.hashSignal.dispatch(view);
        this.toggleSideNavOff();
        cleanUpViews(0);
    };

    App.prototype.toggleSideNavOff = function () {
        TweenLite.to('#slider', .2, { x: 0 });
        TweenLite.to('#kontainer', .2, { x: 0 });
    };

    App.prototype.toggleSideNav = function () {
        console.log('slider');
        if (!this.navFlag) {
            TweenLite.to('#slider', .2, { x: 405 });
            TweenLite.to('#kontainer', .2, { x: 405 });
        } else {
            this.toggleSideNavOff();
        }
        this.navFlag = !this.navFlag;
    };
    return App;
})();
//@ sourceMappingURL=App.js.map
