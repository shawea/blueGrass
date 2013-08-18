/** v0.0809 - 95% of times you should not change this file
 (c) puppetMaster3  http://github.com/shawea/blueGrass
  Attribution Assurance License @ http://github.com/shawea/blueGrass
*/
declare var $;


//presenter section
/**
 * Each 'view' should position and manage self and receive the app in constructor
 */
interface IPresenter {// ~ composition, a 'section' presenter to manage a views/sections (and hold state/model ex, when view is cleanedUp). app has no reference to a presneter
    _transition(transEnum:number, ctx:any):any; //enum
}

/**
 * App should be light, start up and dispatch
 */
interface IApp{ // has the app + hasher + event/signalbuss, the global app , does not animate or open, may have signals
    _onHashChanged()

    setBusy(bussy:bool, timeOut:number):any;//stop other events
    /**
     * Returns signal you can add() a listener for
     * @param signalType
     */
    getEvtSignalFor(signalType:string):any;
    //_display(view:string, ctx:any):any;

}

/*
SPA section
*/
var viewDir:string;

/**
 * @param ht view
 * @param id of container
 * @param cb_
 */
function open(ht, elSel, cb_):void {
    //console.log(viewDir)
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht)
        $(elSel).append(resp_)
        if (cb_) cb_()
	})
}//()

/**
 *  calls back with new #id   -- of course it changes the id
 */
function forward(ht, id, cb_):void {
	$.get(viewDir + ht + '.html', function (resp_) {
		$('#kontainer').append(resp_)
		var cur = $('#' + id)
        console.log(ht, cur.attr('id'))
        var gid = id + Math.floor(Math.random() * 9999999) //GUID 1 in 10mm
		cur.attr('id', gid)//change id to guid - we could have many
		if (!cur.attr('id')) throw new Error('id not found or kontainer')
		/*try{
            var t:number = $('header').height()
            var b:number = $('footer').position().top
		    cur.height(b - t)
        } catch (err) { console.log(err)}
        */
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

function getHash():string{
    var h:string= window.location.hash;
    if(h!=null&& h.length>1) {
        return h.slice(1)
    }
    return null;
}
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


/*window.onerror = function(msg, uri, line) {
    console.log(msg + uri + line);
} */

/**
 * Returns some responsive info
 * @returns {Object}
 */
function getBrowserInfo() {
    var o = new Object()
    o.pixR=window.devicePixelRatio
    o.cw = document.documentElement.clientWidth
    o.w= window.innerWidth
    o.h = window.innerHeight
    return o
}



