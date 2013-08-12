/* v0.0809 - 95% of times you should not change this file
 (c) puppetMaster3  http://github.com/shawea/blueGrass
  Attribution Assurance License @ http://github.com/shawea/blueGrass
*/

declare var $;
declare var hasher;// router

//presenter section
/**
 * Each view should position and manage self
 */
interface IPresenter {// ~ composition, a section? presenter to manage a views/sections (and hold state/model ex, when view is cleanedUp)
	_transition(transEnum:number, ctx:any):void; //enum
}

interface IApp{ // has the app + hasher, the global app , does not animate or open, may have signals
	//_onUrlChanged(newUrl, oldUrl):void;
	dispatch(view:string, ctx:any):bool; //returns FALSE
    /*template code in dispatch
    hasher.changed.active = false; //disable changed signal
    hasher.setHash(view); //set hash without dispatching changed signal
    hasher.changed.active = true;
    */
}


/**
 *  should be first line in app constructor
 *  @param app

function initHasher(ainst) {
 	hasher.changed.add(ainst._onUrlChanged, ainst)
	hasher.initialized.add(ainst._onUrlChanged, ainst)
	hasher.prependHash = '!' // SEO
	hasher.init()
    console.log('hRouter ready')
}
 console.log("clicked " + firstname)
/*

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
		/*try{
            var t:number = $('header').height()
            var b:number = $('footer').position().top
		    cur.height(b - t)
        } catch (err) { console.log(err)}
        */
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

