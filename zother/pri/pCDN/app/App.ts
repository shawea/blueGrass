declare var TweenLite;

head.ready(function() {
    viewDir = 'view/'
    console.log('0.01')
    new App()
})

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
        new Vid(this)
        new Pricing(this)

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
        var menu = document.getElementById('topMenu')
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
        var blogBut = document.getElementById('blog')
        blogBut.addEventListener('click', function() {
            location='http://primusapi.wordpress.com'
            })
        var moreBut = document.getElementById('more')
        moreBut.addEventListener('click', function() {setHash('vid')})
        var pBut = document.getElementById('pricing')
        pBut.addEventListener('click', function() {setHash('pricing')})
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
        if (null==view)
            view ='about'
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

