var viewDir;

/**
* @param ht view
* @param id of container
* @param cb_
*/
function open(ht, elSel, cb_) {
    //console.log(viewDir)
    $.get(viewDir + ht + '.html', function (resp_) {
        console.log(ht);
        $(elSel).append(resp_);
        if (cb_)
            cb_();
    });
}

/**
*  calls back with new #id
*/
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

/**
* How many views to allow in #kontainer
* @param i
*/
function cleanUpViews(i) {
    var views = $('#kontainer').children();
    console.log(views.length);
    while (views.length > i) {
        var old = views.get(0);
        old.parentNode.removeChild(old);
        views = $('#kontainer').children();
    }
}

/**
* Get the browser's hash so you can pull up date
* @returns {*}
*/
function getHash() {
    var h = window.location.hash;
    if (h != null && h.length > 1) {
        return h.slice(1);
    }
    return null;
}

/**
* Sets browsers hash
* @param v
*/
function setHash(v) {
    window.location.hash = v;
}

/////////////////
function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getGuerryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

window.onerror = function (msg, uri, line) {
    console.log(msg + uri + line);
};

function showSpinner(status) {
    if (status)
        document.getElementById('loader').style.display = 'block'; else
        document.getElementById('loader').style.display = 'none';
}

/**
* Returns some info
* @returns {Object}
*/
function getBroInfo() {
    var o = new Object();
    o.pixR = window.devicePixelRatio;
    o.cw = document.documentElement.clientWidth;
    o.w = window.innerWidth;
    o.h = window.innerHeight;

    o.docTop = $(window).scrollTop();
    o.docBot = $(document).height() - $(window).height();

    return o;
}

/**
* Fires a signal when postion changes.
*
* @param posSignal
* @param this_ pass the context
* @returns create Signal you can add functions onto
*/
function setupPosSignal(posSignal, this_) {
    posSignal = new signals.Signal();
    $(window).scroll(function () {
        this_.positionChanged_ = true;
    });
    window.onresize = function (event) {
        this_.positionChanged_ = true;
    };
    setInterval(function () {
        if (this_.positionChanged_) {
            posSignal.dispatch(getBroInfo(), this_);
            this_.positionChanged_ = false;
        }
    }, 100);
    return posSignal;
}

function browserSupportsCors() {
    if ('withCredentials' in new XMLHttpRequest())
        return true; else
        return false;
}
//@ sourceMappingURL=blueGrass.js.map
