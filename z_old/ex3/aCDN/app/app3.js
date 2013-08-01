var FirstPg = (function () {
    function FirstPg() {
    }
    FirstPg.prototype._transition = function (transEnum, ctx) {
        forward('listTmpl', 'listTmpl', this.iloaded1);
    };

    FirstPg.prototype.iloaded1 = function (id) {
        cleanUpViews();
        console.log("loaded1 " + id);
        var but1 = document.getElementById('but1');
        but1.addEventListener('click', function () {
            console.log("clicked ");
            gapp.dispatch('pg2');
        });

        cloudAPI.select('todo', null, gapp.pg1.onRet);
    };

    FirstPg.prototype.onRet = function (data) {
        console.log(JSON.stringify(data));
        console.log(data);

        var options = {
            item: 'hacker-item'
        };

        var values = [
            { name: 'Jonny', city: 'Stockholm' },
            { name: 'Jonas', city: 'Berlin' }
        ];

        var hackerList = new List('hacker-list', options, values);
    };
    return FirstPg;
})();

var Pg2 = (function () {
    function Pg2() {
    }
    Pg2.prototype._transition = function (transEnum, ctx) {
        console.log('form now');
    };
    return Pg2;
})();

var GWebApp = (function () {
    function GWebApp() {
        console.log("ready 0.3");
        viewDir = '../aCDN/views/';
        cloudAPI = new CloudAPI();
        this.pg1 = new FirstPg();
        this.pg2 = new Pg2();
        initHController(this);
    }
    GWebApp.prototype._onUrlChanged = function (newUrl, oldUrl) {
        this.dispatch(newUrl, null);
    };

    GWebApp.prototype.dispatch = function (view, ctx) {
        console.log('controller sayz: ', view);
        if ('pg1' == view || view == null || view.length < 1)
            this.pg1._transition();

        hasher.changed.active = false;
        hasher.setHash(view);
        hasher.changed.active = true;
        return false;
    };
    return GWebApp;
})();

gapp = new GWebApp();
//@ sourceMappingURL=app3.js.map
