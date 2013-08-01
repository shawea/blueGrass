declare var List;   // templates
declare var CloudAPI;   // templates
declare var $;

class FirstPg implements IModPresenter { // each view should be separate
    constructor() {

    }
    _transition(transEnum:number, ctx:any):void {
          forward('listTmpl', 'listTmpl', this.iloaded1)
    }

    iloaded1(id){
        cleanUpViews()
        console.log ("loaded1 " + id)
        var but1 = document.getElementById('but1')
        but1.addEventListener('click', function() {
            console.log ("clicked ")
            gapp.dispatch('pg2')
        })


        cloudAPI.select('todo', null, gapp.pg1.onRet)      // see docs on selectAll

    }

    onRet(data) {
        console.log(JSON.stringify(data))
        console.log(data)
        // templates starts
        var options = {
            item: 'hacker-item'
        };

        var values = [
            { name: 'Jonny', city:'Stockholm' }
            , { name: 'Jonas', city:'Berlin' }
        ];

        var hackerList = new List('hacker-list', options, values);
        //template ends
    }

}

class Pg2 implements IModPresenter {

    _transition(transEnum:number, ctx:any):void {
         console.log('form now')
    }

}

class GWebApp implements IAppNController {
    pg1:FirstPg;
    pg2:Pg2;
    constructor() {
        console.log ("ready 0.3")
        viewDir = '../aCDN/views/'
        cloudAPI = new CloudAPI()
        this.pg1 = new FirstPg();
        this.pg2 = new Pg2();
        initHController(this)

    }//()
    _onUrlChanged(newUrl, oldUrl):void {//boilerplate code
        this.dispatch(newUrl,null)
    }

    dispatch(view:string, ctx:any):bool {
        console.log('controller sayz: ',view)
        if('pg1'==view || view==null || view.length<1)
            this.pg1._transition()

        //if('pg2'==view)
            //this.pg2._transition()

        //boilerplate code
        hasher.changed.active = false; //disable changed signal
        hasher.setHash(view); //set hash without dispatching changed signal
        hasher.changed.active = true;
        return false;
    }//()

}//class

gapp = new GWebApp()//calls constructor


