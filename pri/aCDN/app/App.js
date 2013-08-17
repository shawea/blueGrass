window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.6');

    FastClick.attach(document.body);
    app = new App();
});

var Tut = (function () {
    function Tut(app_) {
        this.app = app_;
        app_.viewSignal.add(this.onView, this);
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
        app_.viewSignal.add(this.onView, this);
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
        this.navFlag = false;
        var menu = document.getElementById('navMenu');
        menu.addEventListener('click', this.toggleSideNav, false);
        var nav = document.getElementById('navBut');
        nav.addEventListener('click', this.toggleSideNav, false);

        this.viewSignal = new signals.Signal();
        this.about = new About(this);
        this.tut = new Tut(this);

        var aboutBut = document.getElementById('aboutBut');
        aboutBut.addEventListener('click', function () {
            setHash('about');
        });
        var tutBut = document.getElementById('tutBut');
        tutBut.addEventListener('click', function () {
            setHash('tut');
        });

        window.addEventListener('hashchange', this.onHashChanged);
    }
    App.prototype.onHashChanged = function () {
        var view = getHash();
        if (view == null)
            view = 'about';
        console.log('changed ' + view);
        app.viewSignal.dispatch(getHash());
        app.toggleSideNavOff();
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
            app.toggleSideNavOff();
        }
        this.navFlag = !this.navFlag;
    };
    return App;
})();
//@ sourceMappingURL=App.js.map
