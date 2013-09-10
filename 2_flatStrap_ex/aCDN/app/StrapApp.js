viewDir = 'view/';
console.log('v0.02');

var Welcome = (function () {
    function Welcome(app) {
        open('headerwrap', '#kontainer', this.onLoad1);
        app.positionSignal.add(this.onEOD);
    }
    //_transition(transEnum:number, ctx:any):void {}
    Welcome.prototype.onLoad1 = function () {
        TweenLite.to(document.getElementById('nav'), .050, { css: { opacity: 1 }, ease: Power3.easeOut });
        TweenLite.to(document.getElementsByTagName('body'), .250, { css: { opacity: 1 }, ease: Power3.easeOut });
        open('welcomewrap', '#kontainer');
    };
    Welcome.prototype.onEOD = function (info) {
        console.log(JSON.stringify(info));
        new Service();
    };
    return Welcome;
})();

var Service = (function () {
    function Service() {
        open('servicewrap', '#kontainer');
    }
    return Service;
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
