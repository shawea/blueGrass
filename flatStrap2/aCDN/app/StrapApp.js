viewDir = '../aCDN/views/';
console.log('v0.02');

var Welcome = (function () {
    function Welcome() {
        open('headerwrap', '#kontainer', this.onLoad1);
    }
    Welcome.prototype.onLoad1 = function () {
        TweenLite.to(document.getElementById('nav'), .050, { css: { opacity: 1 }, ease: Power3.easeOut });
        TweenLite.to(document.getElementsByTagName('body'), .250, { css: { opacity: 1 }, ease: Power3.easeOut });
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
        wel = new Welcome();
        scrolledSignal = new signals.Signal();
        $(window).scroll(function () {
            this.didScroll = true;
        });
        setInterval(function () {
            if (this.didScroll) {
                this.didScroll = false;

                console.log('scroll');
                this.scrolledSignal.dispatch();
            }
        }, 100);
    }
    return App;
})();
app = new App();
//@ sourceMappingURL=StrapApp.js.map
