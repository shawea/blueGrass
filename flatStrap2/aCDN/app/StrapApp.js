viewDir = '../aCDN/views/';
console.log('v0.03');

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
        scrolledSignal = new signals.Signal();
        wel = new Welcome();
        $(window).scroll(function () {
            this.didScroll = true;
        });
        setInterval(function () {
            if (this.didScroll) {
                this.didScroll = false;

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() - 20;

                this.diff = docBot - docTop;
                console.log('s' + diff);
                this.scrolledSignal.dispatch(this.diff);
            }
        }, 200);
    }
    return App;
})();
app = new App();
//@ sourceMappingURL=StrapApp.js.map
