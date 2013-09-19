/**
 (c) http://github.com/shawea/blueGrass
 requires attribution, as per Attribution Assurance License @ http://github.com/shawea/blueGrass
*/
class bG { }

declare var $;

var viewDir:string;

console.log('blueGrass v905')

/**
 * @param ht view
 * @param id of container
 * @param cb_
 */
function open(ht, elSel, cb_):void {
    //console.log(viewDir)
    showSpinner(true)
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht)
        $(elSel).append(resp_)
        showSpinner(false)
        if (cb_) cb_()
	})
}//()

/**
 *  calls back with new #id
 */
function forward(ht, id, cb_):void {
    showSpinner(true)
	$.get(viewDir + ht + '.html', function (resp_) {
		$('#kontainer').append(resp_)
        showSpinner(false)
		var cur = $('#' + id)
        console.log(ht, cur.attr('id'))
        var gid = id + Math.floor(Math.random() * 9999999) //GUID 1 in 10mm
		cur.attr('id', gid)//change id to guid - we could have many
		if (cb_) cb_(gid)
	})
}//()

/**
 * How many views to allow in #kontainer
 * @param i
 */
function cleanUpViews(i:number):void { //GC
	var views = $('#kontainer').children()
	console.log(views.length)
	while (views.length > i) {
		var old = views.get(0)
		old.parentNode.removeChild(old)
		views = $('#kontainer').children()
	}
	//console.log(views.length)
}//()

/**
 * Get the browser's hash so you can pull up date
 * @returns {*}
 */
function getHash():string{
    var h:string= window.location.hash;
    if(h!=null&& h.length>1) {
        return h.slice(1)
    }
    return null;
}

/**
 * Sets browsers hash
 * @param v
 */
function setHash(v:string) {
    window.location.hash = v
    //history.pushState(null,null,'#'+v)
}

/////////////////
function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getGuerryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}


function showSpinner(status){
    if (status)
        document.body.style.cursor = 'wait';
    else
        document.body.style.cursor = 'default';
}


/**
 * Returns some info
 * @returns {Object}
 */
function getBroInfo() {
    var o = new Object()
    o.pixR=window.devicePixelRatio
    o.cw = document.documentElement.clientWidth
    o.w= window.innerWidth
    o.h = window.innerHeight

    o.docTop = $(window).scrollTop();
    o.docBot = $(document).height() - $(window).height();

    return o
}


/**
 * Fires a signal when position changes.
 *
 * @param posSignal
 * @param this_ pass the context
 * @returns create Signal you can add functions onto
 */
function setupPosSignal(posSignal, this_) {
    posSignal = new signals.Signal()
    $(window).scroll(function() {
        this_.positionChanged_ = true //deBounce
    })
    window.onresize = function(event) {
        this_.positionChanged_ = true //deBounce
    }
    setInterval(function() {
        if ( this_.positionChanged_ ) {
            posSignal.dispatch(getBroInfo(),this_)
            this_.positionChanged_ = false
        }//fi
    },100)// ~ 10/sec
    return posSignal
}//()

function browserSupportsCors():bool {
    if ('withCredentials' in new XMLHttpRequest())
        return true
    else if (window.XDomainRequest)
      return true
    else
        return false
}

///// optional patterns:
/**
 * Each 'presenter' should position self and have no references to others (except app's dispatchers)
 */
interface IPresenter {// ~ composition, a 'section' presenter to manage a views/sections (and hold state/model ex, when view is cleanedUp). app has no reference to a presneter
    /**
     * In constructor, may listen here on app's dispatch
     * @param ctx
     * @private
     */
    _onAppNav( ctx:any):any; //enum

    _doCleanup() // remove listeners

}

/**
 * App should be light, start up and dispatch and have no references to the view
 */
interface IApp{
    _onHashChanged()    // listen to hash change: window.addEventListener('hashchange', this._onHashChanged.bind(this))

    _setupNavDispatching()

    _loadFirst();

    /**
     * Returns signal a presenter might add() a listener for
     * @param signalType
     */
    getEvtSignalFor(signalType:string):any;

}

/**
 * Optionally you can put your services separate so you can test easier.
 * Don't do dom here.
 */
interface IAPI {
    setModel(key:string, value:any)
}

