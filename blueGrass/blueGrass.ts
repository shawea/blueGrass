/* v0.0812 - 99% of times you should not change this file
 (c) blueGrass  http://github.com/shawea/blueGrass
  Attribution Assurance License is @ http://github.com/shawea/blueGrass
*/

declare var $;
declare var hasher;//simple router

//presenter section
/**
 * Each view should position and manage self
 */
interface IPresenter {// ~ composition, a section? presenter to manage a views/sections (and hold state/model ex, when view is cleanedUp)
	_transition(transEnum:number, ctx:any):void; //enum
}

interface IAppCtr{ // has the app + router, the global app , does not position
	_onUrlChanged(newUrl, oldUrl):void;
	dispatch(view:string, ctx:any):bool; //returns FALSE
}

/**
 *  should be first line in app constructor
 *  @param app
 */
function initController(ainst) {
	console.log('hRouter ready')
 	hasher.changed.add(ainst._onUrlChanged, ainst)
	hasher.initialized.add(ainst._onUrlChanged, ainst)
	hasher.prependHash = '!' // SEO
	hasher.init()
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
    console.log(viewDir)
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht)
        $(elSel).append(resp_)
        if (cb_) cb_()
	})
}//()

/*
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
		try{
            var t:number = $('header').height()
            var b:number = $('footer').position().top
		    cur.height(b - t)
        } catch (err) { console.log(err)}
		if (cb_) cb_(gid)
	})
}//()

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

// misc utils section
function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getGuerryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

