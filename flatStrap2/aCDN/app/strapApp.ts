viewDir = '../aCDN/views/'
console.log('v0.02')

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
    }
}

class Service implements IPresenter {
    constructor() {
        open('servicewrap', '#kontainer')
    }
}

class App {
    didScroll:bool;
    scrolledSignal: any;
    constructor() {
        wel = new Welcome()
        scrolledSignal = new signals.Signal();
        $(window).scroll(function() {
            this.didScroll = true //deBounce
            })
        setInterval(function() {
            if ( this.didScroll ) {
                this.didScroll = false

                console.log('scroll')
                this.scrolledSignal.dispatch()
            }
            }, 100)
    }

}
app = new App()


