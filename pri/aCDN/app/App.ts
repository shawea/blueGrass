console.log('0')


var navFlag = false;
var navBtn = document.querySelector('.topcoat-icon--menu-stack');
navBtn.addEventListener('click', toggleSideNav, false);
function toggleSideNav () {
    console.log('side')
    if(!navFlag) {
        TweenLite.to('#slider',.2,{x:400})
        TweenLite.to('#container',.2,{x:400})
     } else {
        TweenLite.to('#slider',.2,{x:0})
        TweenLite.to('#container',.2,{x:0})
    }
    navFlag = !navFlag;
}
