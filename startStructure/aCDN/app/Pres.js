console.log('0.03');

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
        var post = cAPI.makeFormMessage('formE');
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

var Home = (function () {
    function Home(app_) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this);
    }
    Home.prototype._onAppNav = function (view) {
        if ('home' == view)
            forward('HomePg', 'home', this.onHome.bind(this));
    };

    Home.prototype.onHome = function () {
        console.log('onHome');
        cAPI.prevRows('blog', 1, 20, this.onData.bind(this));
    };

    Home.prototype.onData = function (data, err) {
        console.log('onData');
        console.log(data);

        var dirs = {
            dat: {
                text: function (p) {
                    var s = new moment(this._daoc).format('ddd MMMM Do ha');

                    return s;
                }
            }
        };

        $('#postsTpl').render(data.array_, dirs);
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
//@ sourceMappingURL=Pres.js.map
