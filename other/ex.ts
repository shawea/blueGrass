var app:MyApp;
$(document).ready(function() {
    viewDir = '../scdn/view/'

	$('#tabs').show()
	$('#content').fadeIn()   // show line

    setTimeout(function(){
        app = new MyApp()

        $('#tabs a').click(function(e) {
            e.preventDefault()
            var view:string  = $(this).attr('name')
            app.dispatch(view,null)
        })

        var el = document.querySelector('#botBut')
        el.addEventListener('pointerdown', app.gotoAccount)
        el = document.querySelector('#topBut')
        el.addEventListener('pointerdown', app.gotoAccount)
    },1)

})


class Tutorial implements IModPresenter {
    constructor() {
    }
    _transition(transEnum:number, ctx:any):void {
        forward('tutorial','tutorial',this._onLoaded)
    }
    _onLoaded(guid:string) {

        console.log('sol')
        $('#'+guid).fadeIn(1200)
        cleanUpViews()

        var el = document.querySelector('#rightTut')
        el.addEventListener('pointerdown', app.tut._rightClicked)
        el = document.querySelector('#leftTut')
        el.addEventListener('pointerdown', app.tut._leftClicked)

    }//()
    _rightClicked(){
        console.log('right clicked')
        document.getElementById('itut').contentWindow.rightClicked();
    }
    _leftClicked(){
        console.log('right clicked')
        document.getElementById('itut').contentWindow.leftClicked();
    }
}//class


class MyApp implements IAppNRouter {
	sol:Solution;
    tut:Tutorial;
    pricing:Pricing;
	constructor() {
		this.sol = new Solution()
        this.tut = new Tutorial()
        this.pricing = new Pricing()
		initHRouter(this)
	}//()

	_onUrlChanged(newUrl, oldUrl):void {
		console.log('ch',newUrl)
		this.dispatch(newUrl,null)
	}

	dispatch(view:string, ctx:any):bool {
		console.log(view)

        if(null==view||view.length<2)
			view='solution'

        $('#tabs li').attr('id','') //Reset id's
		var n:string ='[name="'+view+'"]';
		$(n).attr('id','current') // activate  tab

		if('solution'==view)
		   this.sol._transition(null,null)
        else if('tutorial'==view)
           this.tut._transition(null,null)
        else if('pricing'==view)
            this.pricing._transition(null,null)
        else if('blog'==view) {
                hasher.stop()
                location='http://blog.primusapi.com'
                return
            }
		else
			forward(view,view,onCLoaded)


        hasher.changed.active = false; //disable changed signal
        hasher.setHash(view); //set hash without dispatching changed signal
        hasher.changed.active = true;


        return false;
	}//()

    gotoAccount():void {
        location="http://ca_1.primusapi.com/account"
    }


}//class

function onCLoaded(guid:string) {
    $('#'+guid).fadeIn(300)
    cleanUpViews()
}


class Solution implements IModPresenter {
	_transition(transEnum:number, ctx:any):void {
        forward('solution','solution',this._onLoaded)
	}
	_onLoaded(guid:string) {
		console.log('sol')
		$('#'+guid).fadeIn(400)
		cleanUpViews()

	}//()
}//class



class Pricing implements IModPresenter {
    _transition(transEnum:number, ctx:any):void {
        forward('pricing','pricing',this._onLoaded)
    }
    _onLoaded(guid:string) {
        console.log('pricing')
        $('#'+guid).fadeIn(200)
        cleanUpViews()
        var el = document.querySelector('#sign1')
        el.addEventListener('pointerdown', app.gotoAccount)
        el = document.querySelector('#sign2')
        el.addEventListener('pointerdown', app.gotoAccount)
    }//()
}//class

