declare var TweenLite;
declare var App;

console.log('0.06')

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
        cAPI.prevRows('blog', 1, 20, this.onData)
    }

    private onData(data,err) {
        console.log('onData')
        console.log(JSON.stringify(data))
        $('#postsTpl').render(data.array_)
        alert(new moment(1376948749872).format('llll'))
    }
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

