# blueGrass
 (king) blueGrass is a few home made function that could help you create stunning & magical UX, cross platfrom, mobile-first, SPA (Single Page Applications).

Licensed under Attribution Assurance,
- http://opensource.org/licenses/AAL
 As you know a license free of cost is not free of obligations. These designs require the derivatives and their derivatives attribute a link to bikesheding page and agree to loser pays legal costs, or if not licensed or as aribtrated (for violaters of the license).
Designs that are free of cost are not free of obligations, I hope this is not news. If you can't agree and OK this, go away, or write us a large check for a commercial license.
In your index.html or simlilar in view source indicate that your code is derived from http://raw.github.com/shawea/blueGrass

It's based(ie requires) Ajax, ex:
- http://zeptojs.com/#$.get
 to insert (or remove a section/div/view. It is just a lib, like underscore, mostly used w/ Zepto or jQuery.
It is pure HTML5 and could run of CDN, preventing DOS. Also each view can be previwed independetly by a designer. Another one of it's features is that a view | section can be previwed by a designer. Plus it's a structure for managing large applications. And it allows browser to G.C.

Here is the goal of the type of application you can/should build:
- http://intothearctic.gp
For example, we can animate a div/section after loading. But the key to blueGrass is that it is hard to do nice UI in .js views.

To run lab examples:
open terminal in the directory and 'python -m SimpleHTTPServer' or similar - then surf to ROOT in each folder.

To view, use or download this lib for your app (yes these functions are all there is):
- http://raw.github.com/shawea/blueGrass/master/blueGrass/blueGrass.js

Recommended but not required:
* chrome  (and open the developer console in icognito mode)
* npm -g install typescript (optional, it's all .js)
* WebStorm IDE (or  Sublime )
* tablet (easy to port to both laptops and phones from a tablet)
* Zepto js (or jQuery currently required)
* Topcoat css (or BootStrap or Foundation, etc.)
* Signals js
* Cordova (native IOS and Android is for n00bs)
* Hasher js
* GreenSock js  (this is a commercial lib, worth it)
* Primus API (no servers)
* D3 js
* Transparency js
* HTML Muncher
* MaxCDN

Recipe:
- Download the 'start' folder to get the structure and edit.
- Start with a prototype index.html, recommend starting w/ CSS Framework
- Remove sections(div) and save in 'CDN/views' or similar
- Load view (optional: use ES6/tsc syntax & CSS animate via greensock)
- Optional: add Hasher for SEO | bookmarks
- Recomend running of CDN (ex MaxCDN)
- Use Cloud API: Recommend Primus API!

You can follow me on twitter: @puppetMaster3

Notes: current trends are metro buttons, blur background image, flat and one page.
IE 8 is not supported but Cordova is.

Things that may not help your UI:
- MV* frameworks: they focus on something, but not UI, their UI is not desiger friendly.
    If you are not ready to move past MV*, that's OK, we'll be here when you are, this can be used with any MV*.
- ASM compilter: CSS3 gives you speed, not .js.
- Require loader : load and unload divs, not 'classes'
- Not deploying entire app on CDN, ie. hosting HTML5 on app server(ex: Rails, JSP, ASP, PHP, etc.). You should seprate IE from the webapp.
- Starting with own, non tested or documented CSS. Just select a CSS framework with an eco system.


If you have bugs, issues or want to list a webapp or site that is using blueGrass, just file an ticket here on github.

- http://PrimusAPI.com is porting to blueGrass.

