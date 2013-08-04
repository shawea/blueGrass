viewDir = '../aCDN/views/'
console.log('v0.0')

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
    didScroll:bool;
    scrolledSignal: any;
    lastDiff: Number;
    constructor() {
        this.scrolledSignal = new signals.Signal();
        this.scrolledSignal.add(this.onEOD)

        wel = new Welcome(this)
        $(window).scroll(function() {
            this.didScroll = true //deBounce
            })
        setInterval(function() {
            if ( this.didScroll ) {
                this.didScroll = false

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() -20;

                var diff=docBot - docTop
                app.scrolledSignal.dispatch(diff,app)
                this.lastDiff = diff;
            }//fi
            }, 200)
    }//cons
    onEOD(diff) {
        console.log('s'+diff)
    }
}//class
app = new App()


