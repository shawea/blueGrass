var EnterForm = (function () {
    function EnterForm() { }
    EnterForm.prototype._transition = function (enu, ctx) {
        forward('enterForm', 'enterForm', this._onLoaded);
    };
    EnterForm.prototype._onLoaded = function (n_id) {
        cleanUpViews(1);
        TweenLite.from(document.getElementById(n_id), 0.5, {
            x: 300
        });
    };
    return EnterForm;
})();
var Posting = (function () {
    function Posting() {
        forward('Posting', 'Posting');
    }
    return Posting;
})();
var App = (function () {
    function App() {
        viewDir = '../aCDN/view/';
        console.log('v0.2');
        this.frm = new EnterForm();
        initHasher(this);
        this.snapper = new Snap({
            element: document.getElementById('content')
        });
        this.snapper.close();
    }
    App.prototype._onUrlChanged = function (newUrl, oldUrl) {
        console.log('newUrl::', newUrl);
        this.dispatch(newUrl);
    };
    App.prototype.dispatch = function (view, ctx) {
        this.frm._transition();
        hasher.changed.active = false;
        hasher.setHash(view);
        hasher.changed.active = true;
    };
    return App;
})();
app = new App();
//@ sourceMappingURL=BlogApp.js.map
