declare var TweenLite;
declare var App;

console.log('0.03')

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
    private onForm() {
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
        cAPI.prevRows('blog', 1, 3, this.onData.bind(this))
    }

    private getNext() {
        cAPI.prevRows('blog', 1, 3, this.onData.bind(this))
    }

    private onData(data,err) {
        console.log('onData')
        console.log(data)

     var dirs =  {
                dat :  {
                    text: function(p) {
                        var s=new moment(this._daoc).format('ddd MMMM Do ha')
                        //console.log(s,p)
                        return s
                    } //()
                }//dat

        }

        $('#postsTpl').render(data.array_,dirs)
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

