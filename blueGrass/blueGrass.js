var viewDir;

function open(ht, elSel, cb_) {
    $.get(viewDir + ht + '.html', function (resp_) {
        console.log(ht);
        $(elSel).append(resp_);
        if (cb_)
            cb_();
    });
}

function forward(ht, id, cb_) {
    $.get(viewDir + ht + '.html', function (resp_) {
        $('#kontainer').append(resp_);
        var cur = $('#' + id);
        console.log(ht, cur.attr('id'));
        var gid = id + Math.floor(Math.random() * 9999999);
        cur.attr('id', gid);
        if (!cur.attr('id'))
            throw new Error('id not found or kontainer');

        if (cb_)
            cb_(gid);
    });
}

function cleanUpViews(i) {
    var views = $('#kontainer').children();
    console.log(views.length);
    while (views.length > i) {
        var old = views.get(0);
        old.parentNode.removeChild(old);
        views = $('#kontainer').children();
    }
}

function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getGuerryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
//@ sourceMappingURL=blueGrass.js.map
