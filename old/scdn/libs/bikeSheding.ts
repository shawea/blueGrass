/* v1.304 - 95% of times you should not change this file
 (c) Vic Cekvenich
*/
//presenter section
interface IModPresenter {// ~mediator to manage a view(s)/template(s)
	_transition(transEnum:number, ctx:any):void; //enum
}


declare var hasher;//simple router

interface IAppNRouter { // starts the app ~ action controller
	_onUrlChanged(newUrl, oldUrl):void;
	dispatch(view:string, ctx:any):bool; //returns FALSE -for buttons
}

function initHRouter(inst) {
	console.log('hRouter ready')
 	hasher.changed.add(inst._onUrlChanged, inst)
	hasher.initialized.add(inst._onUrlChanged, inst)
	hasher.prependHash = '!' // SEO
	hasher.init()
}

/*
Single page section
*/
declare var $;// selector

var viewDir:string;

function open(ht, cb_):void {
    console.log(viewDir)
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht)
		$('body').append(resp_)

		if (cb_) cb_()
	})//$.get
}//()

function forward(ht, id, cb_):void {
    console.log(viewDir) // todo: tx?
	$.get(viewDir + ht + '.html', function (resp_) {
		console.log(ht, id)
		    $('#kontainer').append(resp_)
		var cur = $('#' + id)
		var gid = id + Math.floor(Math.random() * 9999999) //GUID 1 in 10mm
		cur.attr('id', gid)//change to guid - we could have many
		console.log(cur.attr('id'))
		if (!cur.attr('id')) throw new Error('id not found')
		var t:number = $('header').height()
		var b:number = $('footer').position().top
		cur.height(b - t)
		if (cb_) cb_(gid)
	})//$.get
}//()

function cleanUpViews():void {
	var views = $('#kontainer').children()
	//console.log(views.length)
	while (views.length > 1) {
		var old = views.get(0)
		old.parentNode.removeChild(old)
		views = $('#kontainer').children()
	}
	//console.log(views.length)
}//()
