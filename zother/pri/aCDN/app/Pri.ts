declare var TweenLite;

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
        TweenLite.from('#code1',.7, {x:400})
        TweenLite.from('#code2',1.4,{x:600})
        TweenLite.from('#code3',2,  {x:800})
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
