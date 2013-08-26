window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.03');

    FastClick.attach(document.body);
    new App();
});

var Tut = (function () {
    function Tut(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Tut.prototype.transition = function (transEnum, ctx) {
        forward('tut', 'tut');
    };
    Tut.prototype.onView = function (view) {
        if ('tut' == view)
            this.transition();
    };
    return Tut;
})();

var About = (function () {
    function About(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    About.prototype.transition = function (transEnum, ctx) {
        forward('about', 'about');
    };
    About.prototype.onView = function (view) {
        if ('about' == view)
            this.transition();
    };
    return About;
})();

var App = (function () {
    function App() {
        this.hashSignal = new signals.Signal();
        var about = new About(this);
        var tut = new Tut(this);

        this.loadFirst();

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
        var tutBut = document.getElementById('tutBut');
        tutBut.addEventListener('click', function () {
            setHash('tut');
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
//@ sourceMappingURL=PriApp.js.map
