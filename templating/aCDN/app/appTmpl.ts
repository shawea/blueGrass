console.log('v0.0')
viewDir = '../aCDN/views/'
cloud = new CloudAPI()
frm = new NameForm()

class NameForm implements IPresenter {
    constructor() {// when created via new
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this._transition )
    }
    _transition(transEnum:number, ctx:any):void {
        console.log('form')
        forward('nameForm', 'form', this.onFormLoaded)
        // is it loaded here??
    }
    onFormLoaded(new_id){
        cleanUpViews(1)// remove other views in kontainer
        var but1 = document.getElementById('create')
        but1.addEventListener('click', this.doInsert )
    }

    doInsert() {
        var firstname = $('#firstname').val()
        var lastname = $('#lastname').val()
        console.log('clicked ' + firstname +', ' + lastname)
        var ename =new Object()
        ename.firstname=firstname
        ename.lastname=lastname
        cAPI.insert('my_app',ename, this.onPK)
    }


    onPK(data, er){
        console.log('back ' + JSON.stringify(data) + er)
    }

}//class

class List implements IPresenter {
    constructor() {
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this._transition )
    }

    _transition(transEnum:number, ctx:any):void {
        forward('nameForm', 'form', this.onFormLoaded)
    }

}