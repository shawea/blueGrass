declare var TweenLite;


head.ready(function() {
    viewDir = 'aCDN/view/'
    console.log('v11')
    //console.log(getBrowserInfo())
    FastClick.attach(document.body)

    //set up nav
    var menu = document.getElementById('navMenu')
    menu.addEventListener('click', toggleSideNav, false)
    var nav = document.getElementById('navBut')
    nav.addEventListener('click', toggleSideNav, false)

    //setup menu items
    var aboutBut = document.getElementById('aboutBut')
    aboutBut.addEventListener('click', about)
    var hBut = document.getElementById('home')
    hBut.addEventListener('click', home)

    loadFirst()
})

function loadFirst() {
    var view = getHash()
    if(view==null||view=='about') {
        about()
        return;
    }
    about()
    showSpinner(false)
}//()

navFlag = false
function toggleSideNav () {
    console.log('slider')
    if(!this.navFlag) {
        TweenLite.to('#slider',.2,{x:405})
        TweenLite.to('#kontainer',.2,{x:405})
    } else {
        closeNav()
    }
    this.navFlag = !this.navFlag
}//()
function closeNav() {
    TweenLite.to('#slider',.2,{x:0})
    TweenLite.to('#kontainer',.2,{x:0})
}

function home() {
    forward('HomePg','home',onHome)
}
function onHome() {
    cleanUpViews(1)
    closeNav()
    setHash('home')
}
function about() {
    forward('about','about', onAbout)
}
function onAbout() {
    console.log('loaded about')
    cleanUpViews(1)
    closeNav()
    setHash('about')
}


