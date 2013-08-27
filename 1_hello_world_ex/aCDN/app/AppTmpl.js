viewDir = 'aCDN/view/';
console.log('v0.03');
cloud = new CloudAPI();

var but1 = document.getElementById('flotBut');
but1.addEventListener('click', show);

function show() {
    console.log('load d3');
    forward('flot', 'flot');
}
;

var NameForm = (function () {
    function NameForm() {
        var but1 = document.getElementById('formId');
        but1.addEventListener('click', this._transition.bind(this));
    }
    NameForm.prototype._transition = function (transEnum, ctx) {
        forward('nameForm', 'form', this.onFormLoaded.bind(this));
    };
    NameForm.prototype.onFormLoaded = function (new_id) {
        console.log(new_id);
        cleanUpViews(1);
        var but1 = document.getElementById('create');
        but1.addEventListener('click', this.doInsert.bind(this));
    };
    NameForm.prototype.doInsert = function () {
        console.log('ins');
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        console.log('clicked ' + firstname + ', ' + lastname);
        var ename = new Object();
        ename.first_name = firstname;
        ename.last_name = lastname;
        cloud.insert('my_table', ename, this.onPK.bind(this));
    };
    NameForm.prototype.onPK = function (data, er) {
        console.log('back ' + JSON.stringify(data) + er);
    };
    return NameForm;
})();

var Templ = (function () {
    function Templ() {
        var but1 = document.getElementById('transparencyBut');
        but1.addEventListener('click', this._transition.bind(this));
    }
    Templ.prototype._transition = function (transEnum, ctx) {
        forward('trans2', 'transId', this.onLoaded.bind(this));
    };
    Templ.prototype.onLoaded = function (nid) {
        cleanUpViews(1);
        cloud.select('my_table', null, this.onSelectRet.bind(this));
    };
    Templ.prototype.onSelectRet = function (data, er) {
        console.log('back2 ' + JSON.stringify(data) + er);
        $('#template').render(data.array_);
    };
    return Templ;
})();

var App = (function () {
    function App() {
        var templ = new Templ();
        var frm = new NameForm();
    }
    return App;
})();
new App();
//@ sourceMappingURL=AppTmpl.js.map
