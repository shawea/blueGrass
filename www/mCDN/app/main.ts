//loader
document.body.style.cursor = 'wait';
require(['//scdn.primus.netdna-cdn.com/latest/jquery-2.1.b1.js'
        ,'//scdn.primus.netdna-cdn.com/latest/fastclick.js'
        ,'//scdn.primus.netdna-cdn.com/latest/TweenLite.min.js'
        ,'//scdn.primus.netdna-cdn.com/latest/blueGrass.js'
        ], function() { // we loaded 1, nested loader:
            require(['//scdn.primus.netdna-cdn.com/latest/css/bootstrap.js'
                    ,'//scdn.primus.netdna-cdn.com/latest/CSSPlugin.min.js'   // Tween animation plugin
                    ,'//scdn.primus.netdna-cdn.com/latest/more/parallax.js'
                    ,'//scdn.primus.netdna-cdn.com/latest/cloudAPI.js'
                    ,'//scdn.primus.netdna-cdn.com/latest/more/transparency.min.js' // $ data binding
            ], function() { // we loaded 2nd, start the app:
                console.log('loaded v0.2')
                FastClick.attach(document.body)

                document.body.style.cursor = 'default';
            })
})//end loader

// main code
var hamBut= document.getElementById('hamburger')
hamBut.addEventListener('click',function() {
    toggleSideNav()
})

var navFlag
function toggleSideNav () {
    console.log('slider' )
    if(!navFlag) {
        TweenLite.to('#slider',.2,{x:405})
        TweenLite.to('#kontainer',.2,{x:405})
    } else {
        TweenLite.to('#slider',.2,{x:0})
        TweenLite.to('#kontainer',.2,{x:0})
    }
    navFlag = !navFlag
}//()