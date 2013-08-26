//zepto or jq ?
head.js('/cdn/more/jquery-2.0.3.min.js', '/cdn/more/transparency.min.js', '/cdn/fastclick.js', '/cdn/TweenLite.min.js', '/cdn/signals.min.js', '/cdn/more/moment.min.js', '/cdn/CSSPlugin.min.js', '/cdn/blueGrass.js', 'http://ca_1.primusapi.com/acdn/libs/cloudAPI.js', 'aCDN/app/Pres.js');

head.ready(function () {
    viewDir = 'aCDN/view/';
    console.log('v1');

    //console.log(getBrowserInfo())
    FastClick.attach(document.body);
    new App();
});

var App = (function () {
    function App() {
        //setup slider
        //create views
        this.hashSignal = new signals.Signal();
        var enterF = new EnterForm(this);
        var about = new About(this);
        var home = new Home(this);

        this.loadFirst();
        cAPI = new CloudAPI();

        //DeepLink
        window.addEventListener('hashchange', this._onHashChanged.bind(this));
        this._setupNavDispatching();
    }
    App.prototype._setupNavDispatching = function () {
        //set up slider
        this.navFlag = false;
        var menu = document.getElementById('navMenu');
        menu.addEventListener('click', this.toggleSideNav.bind(this), false);
        var nav = document.getElementById('navBut');
        nav.addEventListener('click', this.toggleSideNav.bind(this), false);

        //setup menu items, # should also work
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
