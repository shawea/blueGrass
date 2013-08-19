declare var TweenLite;
declare var App;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.01')
    //console.log(getBrowserInfo())
    FastClick.attach(document.body)
    new App()
})

class EnterForm {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _transition(transEnum:number, ctx:any):any {
        forward('enterForm','enterForm')
    }
    private _onAppNav(view:string){
        if('tut'==view)
            this._transition()
    }
}


class Home() {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){

    }

}


class About {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _transition(transEnum:number, ctx:any):any {
        forward('about','about')
    }
    private _onAppNav(view:string){
        if('about'==view)
            this._transition()
    }//()
}

class App {
    private navFlag:bool;
    hashSignal:any;
    constructor () {
        //setup slider

        //create views
        this.hashSignal = new signals.Signal();
        var enterF = new EnterForm(this)
        var about = new About(this)
        var home = new Home(this)

        this.loadFirst()
        //DeepLink
        window.addEventListener('hashchange', this._onHashChanged.bind(this))

        this._setupNavDispatching()
    }//()

    _setupNavDispatching() {
        //set up slider
        this.navFlag = false
        var menu = document.getElementById('navMenu')
        menu.addEventListener('click', this.toggleSideNav.bind(this), false)
        var nav = document.getElementById('navBut')
        nav.addEventListener('click', this.toggleSideNav.bind(this), false)

        //setup menu items
        var aboutBut = document.getElementById('aboutBut')
        aboutBut.addEventListener('click', function() {setHash('about')})
        var tutBut = document.getElementById('tutBut')
        //tutBut.addEventListener('click', function() {setHash('tut')})
    }

    loadFirst() {
        var view = getHash()
        if(view==null)
            view='about' //first
        console.log('first ' + view)
        this.hashSignal.dispatch(view)
    }

    _onHashChanged() {
        var view = getHash()
        console.log('changed ' + view)
        this.hashSignal.dispatch(view)
        this.toggleSideNavOff()
        cleanUpViews(0)
    }


    toggleSideNavOff () {
        TweenLite.to('#slider',.2,{x:0})
        TweenLite.to('#kontainer',.2,{x:0})
    }

    private toggleSideNav () {
        console.log('slider')
        if(!this.navFlag) {
            TweenLite.to('#slider',.2,{x:405})
            TweenLite.to('#kontainer',.2,{x:405})
        } else {
            this.toggleSideNavOff()
        }
        this.navFlag = !this.navFlag
    }//()
}
