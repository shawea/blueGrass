declare var TweenLite;
declare var App;


class EnterForm {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){
        if('enter'==view)
            forward('EnterForm','enterForm',this.onForm.bind(this))
    }
    private onForm(nid) {
      //  TweenLite.from('#'+nid,{})

        var saveFormBut = document.getElementById('saveFormBut')
        saveFormBut.addEventListener('click', this.onSave.bind(this), false)
    }

    private onSave() {
        var post:Object = cAPI.makeFormMessage('formE')
        console.log(post)
        console.log(JSON.stringify(post))
        cAPI.insert('blog',post,this.onIns)
    }

    private onIns(data,err) {
        console.log(data,err)
        setHash('home')
    }
}//()

class Home {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }

    private _onAppNav(view:string){
        if('home'==view)
            forward('HomePg','home', this.onHome.bind(this))
    }

    private onHome() {
        console.log('onHome')
        // load first 2
        cAPI.prevRows('blog', 0, 3, this.onData.bind(this))
    }

    private getNext() {
        cAPI.prevRows('blog', 1, 3, this.onData.bind(this))
    }

    private onData(data,err) {
        console.log('onData')
        console.log(data)
     var dirs =  {
          dat :  {
            text: function(p) {//format the date using moment js via transprency js template
                var s=new moment(this._daoc).format('ddd MMMM Do ha')
                //console.log(s,p)
                return s
            } //()
          },
          Hfull : {
            html : function() {
                return this.full
            }
          }//dat
     }
     $('#postsTpl').render(data.array_,dirs)
     //$('#bla').html('aaaaaaaa<b>bb</b>aaaaaaaa')
    }//()

}

class About {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){
        if('about'==view)
            forward('About','about')
    }//()
}

