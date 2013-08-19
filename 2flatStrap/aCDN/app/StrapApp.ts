viewDir = 'aCDN/view/'
console.log('v0.01')

class Welcome implements IPresenter {
    constructor(app) {
        open('headerwrap', '#kontainer', this.onLoad1)
        app.scrolledSignal.add(this.onEOD)
    }
    //_transition(transEnum:number, ctx:any):void {}
    onLoad1() {
        TweenLite.to(document.getElementById('nav'),.050,{css:{opacity:1},ease: Power3.easeOut})
        TweenLite.to(document.getElementsByTagName('body'),.250,{css:{opacity:1},ease: Power3.easeOut})
        open('welcomewrap', '#kontainer')

    }//()
    onEOD(diff) {
        new Service()
    }
}//class

class Service implements IPresenter {
    constructor() {
        open('servicewrap', '#kontainer')
    }
}

class App {
    private positionChanged:bool;
    scrolledSignal: any;
    presenters: string[] = [];  // you can disptach last element in array to presenter listeners
    private lastDiff: Number;
    constructor() {
        this.scrolledSignal = new signals.Signal();
        this.scrolledSignal.add(this.onEOD)

        wel = new Welcome(this)
        $(window).scroll(function() {
            this.positionChanged = true //deBounce
        })
        var _this=this
        setInterval(function() {
            if ( this.positionChanged ) {
                this.positionChanged = false

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() -20;
                var diff=docBot - docTop

                _this.scrolledSignal.dispatch(presenters,diff)
                this.lastDiff = diff;
            }//fi
        }, 200)
    }//cons
    onEOD(diff) {
        console.log('s'+diff)
    }
}//class
new App()
