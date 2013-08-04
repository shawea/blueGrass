viewDir = '../aCDN/views/';
console.log('v0.01');
cloud = new CloudAPI();

var but1 = document.getElementById('formId');
but1.addEventListener('click', showD3);

var NameForm = (function () {
    function NameForm() {
        var but1 = document.getElementById('formId');
        but1.addEventListener('click', this._transition);
    }
    NameForm.prototype._transition = function (transEnum, ctx) {
        forward('nameForm', 'form', app.frm.onFormLoaded);
    };
    NameForm.prototype.onFormLoaded = function (new_id) {
        console.log(new_id);
        cleanUpViews(1);
        var but1 = document.getElementById('create');
        but1.addEventListener('click', app.frm.doInsert);
    };
    NameForm.prototype.doInsert = function () {
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        console.log('clicked ' + firstname + ', ' + lastname);
        var ename = new Object();
        ename.first_name = firstname;
        ename.last_name = lastname;
        cloud.insert('my_table', ename, frm.onPK);
    };
    NameForm.prototype.onPK = function (data, er) {
        console.log('back ' + JSON.stringify(data) + er);
    };
    return NameForm;
})();

var Templ = (function () {
    function Templ() {
        var but1 = document.getElementById('transparencyBut');
        but1.addEventListener('click', this._transition);
    }
    Templ.prototype._transition = function (transEnum, ctx) {
        forward('trans', 'transId', app.templ.onLoaded);
    };
    Templ.prototype.onLoaded = function (nid) {
        cleanUpViews(1);
        cloud.select('my_table', null, app.templ.onSelectRet);
    };
    Templ.prototype.onSelectRet = function (data, er) {
        console.log('back2 ' + JSON.stringify(data) + er);
        $('#template').render(data.array_);
    };
    return Templ;
})();

var App = (function () {
    function App() {
        this.templ = new Templ();
        this.frm = new NameForm();
    }
    return App;
})();
app = new App();
//@ sourceMappingURL=AppTmpl.js.map
