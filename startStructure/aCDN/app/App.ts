declare var TweenLite;
declare var App;

window.addEventListener('load', function() {
    viewDir = 'aCDN/view/'
    console.log('0.04')
    //console.log(getBrowserInfo())
    FastClick.attach(document.body)
    new App()
})

class EnterForm {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){
        if('enter'==view)
            forward('EnterForm','enterForm',this.onForm.bind(this))
    }
    private onForm() {
        var saveFormBut = document.getElementById('saveFormBut')
        saveFormBut.addEventListener('click', this.onSave.bind(this), false)
    }

    private onSave() {
        var post:Object = makeFormMessage('formE')
        console.log(post)
        console.log(JSON.stringify(post))
        cAPI.insert('blog',post,this.onIns)
    }

    private onIns(data,err) {
        console.log(data,err)
        setHash('home')
    }
}//()


function makeFormMessage(id:string):Object {
    var msg:Object = new Object()
    var form = $('#'+id).serializeArray();
    $.each(form, function() {
        if (msg[this.name]) {
            if (!msg[this.name].push) {
                msg[this.name] = [msg[this.name]];
            }
            msg[this.name].push(this.value || '');
        } else {
            msg[this.name] = this.value || '';
        }
    });
    return msg;
}//()


class Home {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){
        if('home'==view)
            forward('HomePg','home')
    }
}

class About {
    private app:App;
    constructor(app_:App) {
        this.app = app_
        app_.hashSignal.add(this._onAppNav, this)
    }
    private _onAppNav(view:string){
        if('about'==view)
            forward('About','about')
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
