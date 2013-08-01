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
interface IPresenter {// ~ composition, a presenter is like direct mediator to manage a view(s)/template(s) and hold state. a state is like a model
	_transition(transEnum:number, ctx:any):void; //enum
}

interface IAppController{ // has the app + action router, the global app
	_onUrlChanged(newUrl, oldUrl):void;
	dispatch(view:string, ctx:any):bool; //returns FALSE -for buttons
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
function open(ht, id, cb_):void {
    console.log(viewDir)
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht)
        $('#'+id).append(resp_)
        if (cb_) cb_()
	})
}//()

/*
 *  cBs #id
 */
function forward(ht, id, cb_):void {
	$.get(viewDir + ht + '.html', function (resp_) {
		$('#kontainer').append(resp_)
		var cur = $('#' + id)
        console.log(ht, cur.attr('id'))
        var gid = id + Math.floor(Math.random() * 9999999) //GUID 1 in 10mm
		cur.attr('id', gid)//change to guid - we could have many
		if (!cur.attr('id')) throw new Error('id not found or kontainer')
		try{
            var t:number = $('header').height()
            var b:number = $('footer').position().top
		    cur.height(b - t)
        } catch (err) { console.log(err)} // need more view measure functions
		if (cb_) cb_(gid)
	})
}//()


function cleanUpViews(i):void {
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

function loadScript(src, cb){
    var s,
        r,
        t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
        //console.log( this.readyState ); //uncomment this line to see which ready states are called.
        if ( !r && (!this.readyState || this.readyState == 'complete') ) {
            r = true;
            if(cb) cb();
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parent.insertBefore(s, t);
}
