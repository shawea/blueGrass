var Tut = (function () {
    function Tut(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Tut.prototype.transition = function () {
        forward('tutorials', 'tut', this.onLoaded.bind(this));
    };
    Tut.prototype.onLoaded = function (nid) {
        /* TweenLite.from('#code1',.7, {x:400})
        TweenLite.from('#code2',1.4,{x:600})
        TweenLite.from('#code3',2,  {x:800})
        */
        TweenLite.from('#' + nid, 2, {
            css: { rotationY: 90, transformOrigin: "100% " }
        });
    };

    Tut.prototype.onView = function (view) {
        if ('tut' == view)
            this.transition();
    };
    return Tut;
})();

var Vid = (function () {
    function Vid(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Vid.prototype.transition = function () {
        forward('vid', 'vid', this.onLoaded);
    };
    Vid.prototype.onLoaded = function () {
        $('#ytplayer').width($(document).width());
        $('#ytplayer').height($(document).height() - 90);
        TweenLite.to($('#ytplayer'), .25, { opacity: 1, delay: .3 });
    };
    Vid.prototype.onView = function (view) {
        if ('vid' == view)
            this.transition();
    };
    return Vid;
})();

var Pricing = (function () {
    function Pricing(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    Pricing.prototype.transition = function () {
        forward('pricing', 'pricing');
    };
    Pricing.prototype.onView = function (view) {
        if ('pricing' == view)
            this.transition();
    };
    return Pricing;
})();

var About = (function () {
    function About(app_) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this);
    }
    About.prototype.transition = function () {
        forward('About', 'about');
    };
    About.prototype.onLoaded = function () {
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
//# sourceMappingURL=Pre.js.map
