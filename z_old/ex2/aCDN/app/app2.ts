console.log ("ready 0.22")
viewDir = '../aCDN/views/'

declare var List;   // templates
declare var CloudAPI;   // templates
declare var $;

// insert LAB2 pdf code here:



// lab code above

//open('backLayer', 'back', onBackLoaded)
function onBackLoaded() {
    setTimeout(function(){
        document.getElementById("animatingTile").style.backgroundImage=
            "url(../aCDN/assets/parallax_clouds.png)"
        setupBackground()
    },1)
}

function scrollBackground() {
    if(inProgress) {
        return;
    }
    inProgress = true;
    tweenBack.play();
    setTimeout(function () {
        console.log('parallax');
        tweenBack.pause();
        inProgress = false;
    }, 800);
}

function setupBackground() {
    console.log('background:')
    inProgress = false;
    var lefty1 = $('#animatingTile').position().left;
    tweenBack = TweenMax.from($('#animatingTile'), 12
        , { css: { left: lefty1 - 1618 }
        , repeatDelay: 0,
        useFrames: false,
        repeat: -1,
        ease: Linear.easeNone
    });
    tweenBack.pause();
}