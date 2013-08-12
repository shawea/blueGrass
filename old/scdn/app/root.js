var app;
$(document).ready(function () {
    viewDir = '../scdn/view/';
    $('#tabs').show();
    $('#content').fadeIn();
    setTimeout(function () {
        app = new MyApp();
        $('#tabs a').click(function (e) {
            e.preventDefault();
            var view = $(this).attr('name');
            app.dispatch(view, null);
        });
        var el = document.querySelector('#botBut');
        el.addEventListener('pointerdown', app.gotoAccount);
        el = document.querySelector('#topBut');
        el.addEventListener('pointerdown', app.gotoAccount);
    }, 1);
});
var Tutorial = (function () {
    function Tutorial() {
    }
    Tutorial.prototype._transition = function (transEnum, ctx) {
        forward('tutorial', 'tutorial', this._onLoaded);
    };
    Tutorial.prototype._onLoaded = function (guid) {
        console.log('sol');
        $('#' + guid).fadeIn(1200);
        cleanUpViews();
        var el = document.querySelector('#rightTut');
        el.addEventListener('pointerdown', app.tut._rightClicked);
        el = document.querySelector('#leftTut');
        el.addEventListener('pointerdown', app.tut._leftClicked);
    };
    Tutorial.prototype._rightClicked = function () {
        console.log('right clicked');
        document.getElementById('itut').contentWindow.rightClicked();
    };
    Tutorial.prototype._leftClicked = function () {
        console.log('right clicked');
        document.getElementById('itut').contentWindow.leftClicked();
    };
    return Tutorial;
})();
var MyApp = (function () {
    function MyApp() {
        this.sol = new Solution();
        this.tut = new Tutorial();
        this.pricing = new Pricing();
        initHRouter(this);
    }
    MyApp.prototype._onUrlChanged = function (newUrl, oldUrl) {
        console.log('ch', newUrl);
        this.dispatch(newUrl, null);
    };
    MyApp.prototype.dispatch = function (view, ctx) {
        console.log(view);
        if(null == view || view.length < 2) {
            view = 'solution';
        }
        $('#tabs li').attr('id', '');
        var n = '[name="' + view + '"]';
        $(n).attr('id', 'current');
        if('solution' == view) {
            this.sol._transition(null, null);
        } else if('tutorial' == view) {
            this.tut._transition(null, null);
        } else if('pricing' == view) {
            this.pricing._transition(null, null);
        } else if('blog' == view) {
            hasher.stop();
            location = 'http://blog.primusapi.com';
            return;
        } else {
            forward(view, view, onCLoaded);
        }
        hasher.changed.active = false;
        hasher.setHash(view);
        hasher.changed.active = true;
        return false;
    };
    MyApp.prototype.gotoAccount = function () {
        location = "http://ca_1.primusapi.com/account";
    };
    return MyApp;
})();
function onCLoaded(guid) {
    $('#' + guid).fadeIn(300);
    cleanUpViews();
}
var Solution = (function () {
    function Solution() { }
    Solution.prototype._transition = function (transEnum, ctx) {
        forward('solution', 'solution', this._onLoaded);
    };
    Solution.prototype._onLoaded = function (guid) {
        console.log('sol');
        $('#' + guid).fadeIn(400);
        cleanUpViews();
    };
    return Solution;
})();
var Pricing = (function () {
    function Pricing() { }
    Pricing.prototype._transition = function (transEnum, ctx) {
        forward('pricing', 'pricing', this._onLoaded);
    };
    Pricing.prototype._onLoaded = function (guid) {
        console.log('pricing');
        $('#' + guid).fadeIn(200);
        cleanUpViews();
        var el = document.querySelector('#sign1');
        el.addEventListener('pointerdown', app.gotoAccount);
        el = document.querySelector('#sign2');
        el.addEventListener('pointerdown', app.gotoAccount);
    };
    return Pricing;
})();
//@ sourceMappingURL=root.js.map
