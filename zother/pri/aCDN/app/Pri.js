var Tut = (function () {
    function Tut(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Tut.prototype.transition = function () {
        forward('tutorials', 'tut', this.onLoaded.bind(this));
    };
    Tut.prototype.onLoaded = function () {
        TweenLite.from('#code1', .7, { x: 400 });
        TweenLite.from('#code2', 1.4, { x: 600 });
        TweenLite.from('#code3', 2, { x: 800 });
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
//# sourceMappingURL=Pri.js.map
