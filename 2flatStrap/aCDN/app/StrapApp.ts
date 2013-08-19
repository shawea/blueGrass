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
    didScroll:bool;
    scrolledSignal: any;
    presenter: string[] = [];  // you can disptach last element in array to presnter listeners
    lastDiff: Number;
    constructor() {
        this.scrolledSignal = new signals.Signal();
        this.scrolledSignal.add(this.onEOD)

        wel = new Welcome(this)
        $(window).scroll(function() {
            this.didScroll = true //deBounce
        })
        var _this=this
        setInterval(function() {
            if ( this.didScroll ) {
                this.didScroll = false

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() -20;

                var diff=docBot - docTop
                _this.scrolledSignal.dispatch(diff)
                this.lastDiff = diff;
            }//fi
        }, 200)
    }//cons
    onEOD(diff) {
        console.log('s'+diff)
    }
}//class
new App()
