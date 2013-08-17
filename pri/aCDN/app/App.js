window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.22');
    console.log(getBrowserInfo());
    FastClick.attach(document.body);
    new App();
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

        var _this = this;
        var aboutBut = document.getElementById('aboutBut');
        aboutBut.addEventListener('click', function () {
            _this.display('about');
        });
        var tutBut = document.getElementById('tutBut');
        tutBut.addEventListener('click', function () {
            _this.display('tut');
        });

        this.viewSignal.dispatch('about');
    }
    App.prototype.display = function (view, ctx) {
        this.viewSignal.dispatch(view);
        this.toggleSideNav();
        cleanUpViews(0);
        this.toggleSideNav();
    };

    App.prototype.toggleSideNav = function () {
        console.log('slider');
        if (!this.navFlag) {
            TweenLite.to('#slider', .2, { x: 405 });
            TweenLite.to('#kontainer', .2, { x: 405 });
        } else {
            TweenLite.to('#slider', .2, { x: 0 });
            TweenLite.to('#kontainer', .2, { x: 0 });
        }
        this.navFlag = !this.navFlag;
    };
    return App;
})();
//@ sourceMappingURL=App.js.map
