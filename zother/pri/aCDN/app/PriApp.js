head.ready(function () {
    viewDir = 'aCDN/view/';
    console.log('0.01');

    //console.log(getBrowserInfo())
    new FastClick(document.body);
    new App();
});

var Tut = (function () {
    function Tut(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Tut.prototype.transition = function () {
        forward('tutorials', 'tut', this.onLoaded.bind(this));
    };
    Tut.prototype.onLoaded = function () {
        TweenLite.from('#code1', .2, { x: 200 });
        TweenLite.from('#code2', 1, { x: 600 });
        TweenLite.from('#code3', 2, { x: 1200 });
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
    About.prototype.transition = function () {
        forward('About', 'about');
    };
    About.prototype.onView = function (view) {
        if ('about' == view)
            this.transition();
    };
    return About;
})();

var App = (function () {
    function App() {
        //create views
        this.hashSignal = new signals.Signal();
        new About(this);
        new Tut(this);
        new Insert(this);
        new Select(this);

        this.loadFirst();

        //DeepLink
        window.addEventListener('hashchange', this._onHashChanged.bind(this));

        this._setupNavDispatching();

        var loginBut = document.getElementById('login');
        loginBut.addEventListener('click', function () {
            location = 'http://ca_1.primusAPI.com/account';
        });
    }
    App.prototype._setupNavDispatching = function () {
        //setup Nav slider
        this.navFlag = false;
        var menu = document.getElementById('topMenu');
        menu.addEventListener('click', this.toggleSideNav.bind(this), false);
        var nav = document.getElementById('navBut');
        nav.addEventListener('click', this.toggleSideNav.bind(this), false);

        //setup menu items
        var aboutBut = document.getElementById('aboutBut');
        aboutBut.addEventListener('click', function () {
            setHash('about');
        });
        var tutBut = document.getElementById('tutBut');
        tutBut.addEventListener('click', function () {
            setHash('tut');
        });
        var insBut = document.getElementById('insert');
        insBut.addEventListener('click', function () {
            setHash('ins');
        });
        var selBut = document.getElementById('select');
        selBut.addEventListener('click', function () {
            setHash('sel');
        });
    };

    App.prototype.loadFirst = function () {
        var view = getHash();
        if (view == null)
            view = 'about';
        console.log('first ' + view);
        this.hashSignal.dispatch(view);
        showSpinner(false);
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

var Insert = (function () {
    function Insert(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Insert.prototype.transition = function () {
        forward('insert', 'insert');
    };
    Insert.prototype.onView = function (view) {
        if ('ins' == view)
            this.transition();
    };
    return Insert;
})();

var Select = (function () {
    function Select(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Select.prototype.transition = function () {
        forward('select', 'select');
    };
    Select.prototype.onView = function (view) {
        if ('sel' == view)
            this.transition();
    };
    return Select;
})();
//# sourceMappingURL=PriApp.js.map
