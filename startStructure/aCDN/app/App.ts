declare var TweenLite;

head.ready(function() {
    viewDir = 'aCDN/view/'
    console.log('v1')
    //console.log(getBrowserInfo())
    FastClick.attach(document.body)
    new App()
})


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
        cAPI = new CloudAPI()
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

        //setup menu items, # should also work
        var aboutBut = document.getElementById('aboutBut')
        aboutBut.addEventListener('click', function() {setHash('about')})
        var homeBut = document.getElementById('home')
        homeBut.addEventListener('click', function() {setHash('home')})
        var enter = document.getElementById('enterBut')
        enter.addEventListener('click', function() {setHash('enter')})
    }

    loadFirst() {
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
