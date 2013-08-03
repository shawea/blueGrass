viewDir = '../aCDN/views/'
console.log('v0.01')
cloud = new CloudAPI()


var but1 = document.getElementById('formId')
but1.addEventListener('click', showD3 )

//function showD3():void {
//    forward('D3', 'd3')
//};



class NameForm implements IPresenter {
    constructor() {// when created via new
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('nameForm', 'form', app.frm.onFormLoaded)
        // is DOM loaded here??
    }
    onFormLoaded(new_id){
        console.log(new_id)
        cleanUpViews(1)// remove other views in kontainer
        var but1 = document.getElementById('create')
        but1.addEventListener('click', app.frm.doInsert )
    }
    doInsert() {
        var firstname = $('#firstname').val()
        var lastname = $('#lastname').val()
        console.log('clicked ' + firstname +', ' + lastname)
        var ename = new Object()
        ename.first_name=firstname
        ename.last_name=lastname
        cloud.insert('my_table',ename, frm.onPK)
    }
    onPK(data, er){
        console.log('back ' + JSON.stringify(data) + er)
    }
}//class

class Templ implements IPresenter {
    constructor() {
        var but1 = document.getElementById('transparencyBut')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('trans', 'transId', app.templ.onLoaded)
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, app.templ.onSelectRet)
    }
    onSelectRet(data, er) {
        console.log('back2 ' + JSON.stringify(data) + er)
        $('#template').render(data.array_);
    }
}

class App {
    templ:Templ;
    frm:NameForm;
    constructor() {
        this.templ = new Templ()
        this.frm  = new NameForm()
    }
}
app = new App();

