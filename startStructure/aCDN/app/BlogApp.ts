class EnterForm {

    _transition(enu,ctx) {
        forward('enterForm', 'enterForm',this._onLoaded)
    }
    _onLoaded(n_id) {
       cleanUpViews(1)
       TweenLite.from(
           document.getElementById(n_id),.5,{x:300})
    }
}

class Posting {
    constructor() {
        forward('Posting', 'Posting')
    }//()
}


class App {
    frm:EnterForm;
    pst:Posting;
    snapper:any;
    constructor() {//app starts
        viewDir = '../aCDN/view/'
        console.log('v0.2')
        this.frm = new EnterForm()
        //pst = new Posting()

        initHasher(this)
        this.snapper = new Snap({
            element: document.getElementById('content')
        })
        this.snapper.close()
    }
    _onUrlChanged(newUrl, oldUrl) {
        console.log('newUrl::' ,newUrl)

        this.dispatch(newUrl)

    }

    dispatch(view:string, ctx:any) {

       // if('form'==view || view == null )  {
            this.frm._transition()
        //}

        //template code
        hasher.changed.active = false; //disable changed signal
        hasher.setHash(view); //set hash without dispatching changed signal
        hasher.changed.active = true;

    }//()
}
app= new App()
