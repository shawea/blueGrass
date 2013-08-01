console.log('v0.0');
viewDir = '../aCDN/views/';
cloud = new CloudAPI();
frm = new NameForm();

var NameForm = (function () {
    function NameForm() {
        var but1 = document.getElementById('formId');
        but1.addEventListener('click', this._transition);
    }
    NameForm.prototype._transition = function (transEnum, ctx) {
        console.log('form');
        forward('nameForm', 'form', this.onFormLoaded);
    };
    NameForm.prototype.onFormLoaded = function (new_id) {
        cleanUpViews(1);
        var but1 = document.getElementById('create');
        but1.addEventListener('click', this.doInsert);
    };

    NameForm.prototype.doInsert = function () {
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        console.log('clicked ' + firstname + ', ' + lastname);
        var ename = new Object();
        ename.firstname = firstname;
        ename.lastname = lastname;
        cAPI.insert('my_app', ename, this.onPK);
    };

    NameForm.prototype.onPK = function (data, er) {
        console.log('back ' + JSON.stringify(data) + er);
    };
    return NameForm;
})();

var List = (function () {
    function List() {
        var but1 = document.getElementById('formId');
        but1.addEventListener('click', this._transition);
    }
    List.prototype._transition = function (transEnum, ctx) {
        forward('nameForm', 'form', this.onFormLoaded);
    };
    return List;
})();
//@ sourceMappingURL=appTmpl.js.map
