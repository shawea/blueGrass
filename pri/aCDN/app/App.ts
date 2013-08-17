
declare var TweenLite;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.22')
    console.log(getBrowserInfo())
    FastClick.attach(document.body)
    new App()
})


class Tut {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.viewSignal.add(this.onView, this)
    }
    private transition(transEnum:number, ctx:any):any {
        forward('tut','tut')
    }
    private onView(view:string){
        if('tut'==view)
            this.transition()
    }
}

class About implements IPresenter{
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.viewSignal.add(this.onView, this)
    }
    private transition(transEnum:number, ctx:any):any {
        forward('about','about')
    }
    private onView(view:string){
        if('about'==view)
            this.transition()
    }//()

}

class App {
    private about:About;
    private tut:Tut;
    private navFlag:bool;
    viewSignal:any;
    constructor () {
        //setup slider
        this.navFlag = false
        var menu = document.getElementById('navMenu')
        menu.addEventListener('click', this.toggleSideNav, false)
        var nav = document.getElementById('navBut')
        nav.addEventListener('click', this.toggleSideNav, false)

        //create views
        this.viewSignal = new signals.Signal();
        this.about = new About(this)
        this.tut = new Tut(this)

        //setup nav
        var _this = this;//ctx
        var aboutBut = document.getElementById('aboutBut')
        aboutBut.addEventListener('click', function() {_this.display('about')})
        var tutBut = document.getElementById('tutBut')
        tutBut.addEventListener('click', function() {_this.display('tut')})


        //show pg1
        this.viewSignal.dispatch('about')
    }//()

    private display(view:string, ctx:any):any {
        this.viewSignal.dispatch(view)
        this.toggleSideNav()
        cleanUpViews(0)
        this.toggleSideNav()
    }

    private toggleSideNav () {
        console.log('slider')
        if(!this.navFlag) {
            TweenLite.to('#slider',.2,{x:405})
            TweenLite.to('#kontainer',.2,{x:405})

        } else {
            TweenLite.to('#slider',.2,{x:0})
            TweenLite.to('#kontainer',.2,{x:0})
        }
        this.navFlag = !this.navFlag
    }//()
}




/*class Why {
 _transition(transEnum:number, ctx:any):any {
 forward('why','why',onWhy)
 }
 onWhy(id) {
 console.log( 'loaded')
 TweenLite.from('#code1',.2, {x:200})
 TweenLite.from('#code2',1, {x:600})
 TweenLite.from('#code3',2, {x:1200})
 }

 }*/
