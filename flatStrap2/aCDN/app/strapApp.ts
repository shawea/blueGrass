viewDir = '../aCDN/views/'
console.log('v0.03')

class Welcome implements IPresenter {
    constructor() {
        open('headerwrap', '#kontainer', this.onLoad1)
    }
    //_transition(transEnum:number, ctx:any):void {}
    onLoad1() {
        TweenLite.to(document.getElementById('nav'),.050,{css:{opacity:1},ease: Power3.easeOut})
        TweenLite.to(document.getElementsByTagName('body'),.250,{css:{opacity:1},ease: Power3.easeOut})
        //open('welcomewrap', '#kontainer')
        //new Service()
    }//()
}//class

class Service implements IPresenter {
    constructor() {
        open('servicewrap', '#kontainer')
    }
}

class App {
    didScroll:bool;
    scrolledSignal: any;
    diff:number;
    constructor() {
        scrolledSignal = new signals.Signal();
        wel = new Welcome()
        $(window).scroll(function() {
            this.didScroll = true //deBounce
            })
        setInterval(function() {
            if ( this.didScroll ) {
                this.didScroll = false

                var docTop = $(window).scrollTop();
                var docBot = $(document).height() - $(window).height() -20;

                this.diff=docBot - docTop
                console.log('s'+diff)
                this.scrolledSignal.dispatch(this.diff)
            }//fi
            }, 200)
    }//cons
}//class
app = new App()


