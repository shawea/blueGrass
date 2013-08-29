declare var TweenLite;

head.ready(function() {
    viewDir = 'aCDN/view/'
    console.log('0.01')
    //console.log(getBrowserInfo())
    new FastClick(document.body);
    new App()
})

class Tut {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        forward('tutorials','tut',this.onLoaded.bind(this))
    }
    private onLoaded() {
        TweenLite.from('#code1',.2, {x:200})
        TweenLite.from('#code2',1, {x:600})
        TweenLite.from('#code3',2, {x:1200})
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
        app_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        forward('About','about')
    }
    private onView(view:string){
        if('about'==view)
            this.transition()
    }//()
}

class App {
    private navFlag:bool;
    hashSignal:any;
    constructor () {
        //create views
        this.hashSignal = new signals.Signal();
        new About(this)
        new Tut(this)
        new Insert(this)
        new Select(this)

        this.loadFirst()

        //DeepLink
        window.addEventListener('hashchange', this._onHashChanged.bind(this))

        this._setupNavDispatching()

        var loginBut = document.getElementById('login')
        loginBut.addEventListener('click', function() {
            location='http://ca_1.primusAPI.com/account'
        })

    }//()

    private _setupNavDispatching() {

        //setup Nav slider
        this.navFlag = false
        var menu = document.getElementById('navMenu')
        menu.addEventListener('click', this.toggleSideNav.bind(this), false)
        var nav = document.getElementById('navBut')
        nav.addEventListener('click', this.toggleSideNav.bind(this), false)

        //setup menu items
        var aboutBut = document.getElementById('aboutBut')
        aboutBut.addEventListener('click', function() {setHash('about')})
        var tutBut = document.getElementById('tutBut')
        tutBut.addEventListener('click', function() {setHash('tut')})
        var insBut = document.getElementById('insert')
        insBut.addEventListener('click', function() {setHash('ins')})
        var selBut = document.getElementById('select')
        selBut.addEventListener('click', function() {setHash('sel')})

    }

    private loadFirst() {
        var view = getHash()
        if(view==null)
            view='about' //first
        console.log('first ' + view)
        this.hashSignal.dispatch(view)
        showSpinner(false)
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



class Insert {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        forward('insert','insert')
    }
    private onView(view:string){
        if('ins'==view)
            this.transition()
    }
}


class Select {
    private app:App;
    constructor(app_:App) {
        this.app = app_;
        app_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        forward('select','select')
    }
    private onView(view:string){
        if('sel'==view)
            this.transition()
    }
}


