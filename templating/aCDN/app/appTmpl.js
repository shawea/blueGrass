viewDir = '../aCDN/views/';
console.log('v0.01');
cloud = new CloudAPI();

var NameForm = (function () {
    function NameForm() {
        var but1 = document.getElementById('formId');
        but1.addEventListener('click', this._transition);
    }
    NameForm.prototype._transition = function (transEnum, ctx) {
        forward('nameForm', 'form', frm.onFormLoaded);
    };
    NameForm.prototype.onFormLoaded = function (new_id) {
        console.log(new_id);
        cleanUpViews(1);
        var but1 = document.getElementById('create');
        but1.addEventListener('click', frm.doInsert);
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
frm = new NameForm();

var Pure = (function () {
    function Pure() {
        var but1 = document.getElementById('pureBut');
        but1.addEventListener('click', this._transition);
    }
    Pure.prototype._transition = function (transEnum, ctx) {
        forward('pure', 'pure', pure.onLoaded);
    };
    Pure.prototype.onLoaded = function (nid) {
        cleanUpViews(1);
        cloud.select('my_table', null, pure.onSelectRet);
    };
    Pure.prototype.onSelectRet = function (data, er) {
        console.log('back2 ' + JSON.stringify(data) + er);
        $('#pureRend').autoRender(data);
    };
    return Pure;
})();
pure = new Pure();
//@ sourceMappingURL=appTmpl.js.map
