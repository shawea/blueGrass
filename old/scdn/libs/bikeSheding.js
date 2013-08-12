function initHRouter(inst) {
    console.log('hRouter ready');
    hasher.changed.add(inst._onUrlChanged, inst);
    hasher.initialized.add(inst._onUrlChanged, inst);
    hasher.prependHash = '!';
    hasher.init();
}
var viewDir;
function open(ht, cb_) {
    console.log(viewDir);
    $.get(viewDir + ht + '.html', function (resp_) {
        console.log(ht);
        $('body').append(resp_);
        if(cb_) {
            cb_();
        }
    });
}
function forward(ht, id, cb_) {
    console.log(viewDir);
    $.get(viewDir + ht + '.html', function (resp_) {
        console.log(ht, id);
        $('#kontainer').append(resp_);
        var cur = $('#' + id);
        var gid = id + Math.floor(Math.random() * 9999999);
        cur.attr('id', gid);
        console.log(cur.attr('id'));
        if(!cur.attr('id')) {
            throw new Error('id not found');
        }
        var t = $('header').height();
        var b = $('footer').position().top;
        cur.height(b - t);
        if(cb_) {
            cb_(gid);
        }
    });
}
function cleanUpViews() {
    var views = $('#kontainer').children();
    while(views.length > 1) {
        var old = views.get(0);
        old.parentNode.removeChild(old);
        views = $('#kontainer').children();
    }
}
//@ sourceMappingURL=bikeSheding.js.map
