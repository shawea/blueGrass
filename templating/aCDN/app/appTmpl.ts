viewDir = '../aCDN/views/'
console.log('v0.01')
cloud = new CloudAPI()

class NameForm implements IPresenter {
    constructor() {// when created via new
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('nameForm', 'form', frm.onFormLoaded)
        // is DOM loaded here??
    }
    onFormLoaded(new_id){
        console.log(new_id)
        cleanUpViews(1)// remove other views in kontainer
        var but1 = document.getElementById('create')
        but1.addEventListener('click', frm.doInsert )
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
frm = new NameForm()

class Templ implements IPresenter {
    constructor() {
        var but1 = document.getElementById('transparencyBut')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('trans', 'transId', templ.onLoaded)
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, templ.onSelectRet)
    }
    onSelectRet(data, er) {
        console.log('back2 ' + JSON.stringify(data) + er)

        $('#template').render(data.array_);

    }
}
templ = new Templ()


class Pure implements IPresenter {
    constructor() {
        var but1 = document.getElementById('pureBut')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('pure', 'pure', pure.onLoaded)
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, pure.onSelectRet)
    }
    onSelectRet(data, er) {
        console.log('back2 ' + JSON.stringify(data) + er)

        $('#pureRend').autoRender(data)
        }
}
pure = new Pure()


class ListPg implements IPresenter {
    constructor() {
       var but1 = document.getElementById('list')
       but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('list', 'listId', lst.onLoaded)
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, lst.onSelectRet)
    }
    onSelectRet(data, er) {
        console.log('back ' + JSON.stringify(data) + er)
        var options = {
            item: 'items'
        }
        list= new List('my_list', options, data.array_)
    }
}
//lst = new ListPg()

