viewDir = 'view/'
console.log('v0.15')

class Welcome implements IPresenter {
    _app:App;
    constructor(app) {
        this._app=app
        open('headerwrap', '#kontainer', this.onLoad1)
        app.positionSignal.addOnce(this.onEOD,this)
    }
    //_transition(transEnum:number, ctx:any):void {}
    onLoad1() {
        TweenLite.to(document.getElementById('nav'),.050,{css:{opacity:1},ease: Power3.easeOut})
        TweenLite.to(document.getElementsByTagName('body'),.250,{css:{opacity:1},ease: Power3.easeOut})
        open('welcomewrap', '#kontainer')

    }//()
    onEOD(info) {
        console.log(JSON.stringify(info))
        new Service(this._app)
    }
}//class

class Service implements IPresenter {
    _app:App;
    constructor(app:App) {
        console.log(app)
        open('servicewrap', '#kontainer')
        app.positionSignal.add(this.onEOD,this)

    }
    onEOD(info) {
        console.log('on EOD of Service')
        console.log(JSON.stringify(info))
        new SomeView()
    }
}

class SomeView {
    constructor() {
        open('clients', '#kontainer')   // just open another view
        open('intro', '#kontainer')   // just open another view

    }
}

class App {
    positionSignal: any;
    presenters: string[] = [];  // you can dispatch last element in array to presenter listeners
    private lastDiff: Number;
    constructor() {

        this.positionSignal=setupPosSignal(this.positionSignal, this)

        wel = new Welcome(this)

    }//cons

}//class
new App()


