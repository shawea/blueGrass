window.addEventListener('load', function () {
    viewDir = 'aCDN/view/';
    console.log('0.04');

    FastClick.attach(document.body);
    new App();
});

var EnterForm = (function () {
    function EnterForm(app_) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this);
    }
    EnterForm.prototype._onAppNav = function (view) {
        if ('enter' == view)
            forward('EnterForm', 'enterForm', this.onForm.bind(this));
    };
    EnterForm.prototype.onForm = function () {
        var saveFormBut = document.getElementById('saveFormBut');
        saveFormBut.addEventListener('click', this.onSave.bind(this), false);
    };

    EnterForm.prototype.onSave = function () {
        var post = makeFormMessage('formE');
        console.log(post);
        console.log(JSON.stringify(post));
        cAPI.insert('blog', post, this.onIns);
    };

    EnterForm.prototype.onIns = function (data, err) {
        console.log(data, err);
        setHash('home');
    };
    return EnterForm;
})();

function makeFormMessage(id) {
    var msg = new Object();
    var form = $('#' + id).serializeArray();
    $.each(form, function () {
        if (msg[this.name]) {
            if (!msg[this.name].push) {
                msg[this.name] = [msg[this.name]];
            }
            msg[this.name].push(this.value || '');
        } else {
            msg[this.name] = this.value || '';
        }
    });
    return msg;
}

var Home = (function () {
    function Home(app_) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this);
    }
    Home.prototype._onAppNav = function (view) {
        if ('home' == view)
            forward('HomePg', 'home');
    };
    return Home;
})();

var About = (function () {
    function About(app_) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this);
    }
    About.prototype._onAppNav = function (view) {
        if ('about' == view)
            forward('About', 'about');
    };
    return About;
})();

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
