viewDir = '../aCDN/views/'
console.log('v0.0')
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
        cleanupViews(1)// remove other views in kontainer
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

class ListPg implements IPresenter {
    constructor() {
       var but1 = document.getElementById('list')
       but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        forward('list', 'listId', this.onLoaded)
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cloud.select('my_table', null, this.onSelectRet)
    }
    onSelectRet(data, er) {
        console.log('back ' + JSON.stringify(data) + er)
        list= new List('todo-list', map, data.array_ )
    }
}
lst = new ListPg()

