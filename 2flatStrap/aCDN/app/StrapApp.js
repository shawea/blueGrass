viewDir = '../aCDN/view/';
console.log('v0.01');

var Welcome = (function () {
    function Welcome(app) {
        open('headerwrap', '#kontainer', this.onLoad1);
        app.scrolledSignal.add(this.onEOD);
    }
    Welcome.prototype.onLoad1 = function () {
        TweenLite.to(document.getElementById('nav'), .050, { css: { opacity: 1 }, ease: Power3.easeOut });
        TweenLite.to(document.getElementsByTagName('body'), .250, { css: { opacity: 1 }, ease: Power3.easeOut });
        open('welcomewrap', '#kontainer');
    };
    Welcome.prototype.onEOD = function (diff) {
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
        this.scrolledSignal = new signals.Signal();
        this.scrolledSignal.add(this.onEOD);

        wel = new Welcome(this);
        $(window).scroll(function () {
            this.didScroll = true;
        });
        setInterval(function () {
            if (this.didScroll) {
                this.didScroll = false;

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() - 20;

                var diff = docBot - docTop;
                app.scrolledSignal.dispatch(diff, app);
                this.lastDiff = diff;
            }
        }, 200);
    }
    App.prototype.onEOD = function (diff) {
        console.log('s' + diff);
    };
    return App;
})();
app = new App();
//@ sourceMappingURL=StrapApp.js.map
