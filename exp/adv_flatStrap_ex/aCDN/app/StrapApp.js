viewDir = 'view/';
console.log('v0.15');

var Welcome = (function () {
    function Welcome(app) {
        this._app = app;
        open('headerwrap', '#kontainer', this.onLoad1);
        app.positionSignal.addOnce(this.onEOD, this);
    }
    //_transition(transEnum:number, ctx:any):void {}
    Welcome.prototype.onLoad1 = function () {
        TweenLite.to(document.getElementById('nav'), .050, { css: { opacity: 1 }, ease: Power3.easeOut });
        TweenLite.to(document.getElementsByTagName('body'), .250, { css: { opacity: 1 }, ease: Power3.easeOut });
        open('welcomewrap', '#kontainer');
    };
    Welcome.prototype.onEOD = function (info) {
        console.log(JSON.stringify(info));
        new Service(this._app);
    };
    return Welcome;
})();

var Service = (function () {
    function Service(app) {
        console.log(app);
        open('servicewrap', '#kontainer');
        app.positionSignal.add(this.onEOD, this);
    }
    Service.prototype.onEOD = function (info) {
        console.log('on EOD of Service');
        console.log(JSON.stringify(info));
        new SomeView();
    };
    return Service;
})();

var SomeView = (function () {
    function SomeView() {
        open('clients', '#kontainer');
        open('intro', '#kontainer');
    }
    return SomeView;
})();

var App = (function () {
    function App() {
        this.presenters = [];
        this.positionSignal = setupPosSignal(this.positionSignal, this);

        wel = new Welcome(this);
    }
    return App;
})();
new App();
//# sourceMappingURL=StrapApp.js.map
