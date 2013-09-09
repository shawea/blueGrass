viewDir = 'aCDN/view/'
console.log('v0.02')

class Welcome implements IPresenter {
    constructor(app) {
        open('headerwrap', '#kontainer', this.onLoad1)
        app.positionSignal.add(this.onEOD)
    }
    //_transition(transEnum:number, ctx:any):void {}
    onLoad1() {
        TweenLite.to(document.getElementById('nav'),.050,{css:{opacity:1},ease: Power3.easeOut})
        TweenLite.to(document.getElementsByTagName('body'),.250,{css:{opacity:1},ease: Power3.easeOut})
        open('welcomewrap', '#kontainer')

    }//()
    onEOD(info) {
        console.log(JSON.stringify(info))
        new Service()
    }
}//class

class Service implements IPresenter {
    constructor() {
        open('servicewrap', '#kontainer')
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


