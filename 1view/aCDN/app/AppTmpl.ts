viewDir = 'aCDN/view/'
console.log('v0.03')
cloud = new CloudAPI()

var but1 = document.getElementById('d3')
but1.addEventListener('click', showD3 )

function showD3():void {
    console.log('load d3')
    forward('D3', 'd3')
};


class NameForm implements IPresenter {
    constructor() {// when created via new
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this._transition.bind(this) )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('nameForm', 'form', this.onFormLoaded.bind(this) )
        // is DOM loaded here??
    }
    onFormLoaded(new_id){
        console.log(new_id)
        cleanUpViews(1)// remove other views in kontainer
        var but1 = document.getElementById('create')
        but1.addEventListener('click', this.doInsert.bind(this) )
    }
    doInsert() {
        console.log('ins')
        var firstname = $('#firstname').val()
        var lastname = $('#lastname').val()
        console.log('clicked ' + firstname +', ' + lastname)
        var ename = new Object()
        ename.first_name=firstname
        ename.last_name=lastname
        cloud.insert('my_table',ename, this.onPK.bind(this) )
    }
    onPK(data, er){
        console.log('back ' + JSON.stringify(data) + er)
    }
}//class

class Templ implements IPresenter {
    constructor() {
        var but1 = document.getElementById('transparencyBut')
        but1.addEventListener('click', this._transition.bind(this) )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('trans2', 'transId', this.onLoaded.bind(this))
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, this.onSelectRet.bind(this))
    }
    onSelectRet(data, er) {
        console.log('back2 ' + JSON.stringify(data) + er)
        $('#template').render(data.array_);
    }
}

class App {

    constructor() {
        var templ = new Templ()
        var frm  = new NameForm()
    }
}
new App();

