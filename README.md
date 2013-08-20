# blueGrass
 (king) blueGrass is a few home made function that could help you create stunning & magical UX, cross platfrom, mobile-first, SPA (Single Page Applications), creative html5 and interactive.

Patterns are licensed under Attribution Assurance License ( details are here http://opensource.org/licenses/AAL )
As you may know a license free of cost is not free of obligations. These designs require the derivatives and their derivatives attribute a link to bikesheding page and agree to loser pays legal costs, or if not licensed or as aribtrated (for violaters of the license).
In your index.html or similar in view source you must indicate that your code is derived from http://raw.github.com/shawea/blueGrass to comply w/ our offered license.
If you can't agree to the license and OK this, go away, or maybe write us a large checkes for a commercial license.


We require Ajax, ex:
- http://zeptojs.com/#$.get
 to insert (or remove a section/div/view. It is just a lib, like underscore, mostly used w/ Zepto or jQuery.
It is pure HTML5 and could run of CDN, preventing DOS. Also each view can be previewed independently by a designer.
Plus it's a structure for managing large applications. (And it allows browser to G.C._

Yes these functions we add to make pattern work:
- http://raw.github.com/shawea/blueGrass/master/blueGrass/blueGrass.js

Here is an example of the type of application you can/should build:
- http://intothearctic.gp
For example, we can animate a div/section after loading. But the key to blueGrass is that it is hard to do nice UI in .js views, ours are HTML.

To run lab examples:
open terminal in the directory and  run 'simplehttpserver' (installed via npm) or similar - then surf to ROOT in each folder.

Recommended but not required:
* chrome  (and open the developer console in icognito mode)
* npm -g install typescript (optional, it's all .js)
* npm -g install simplehttpserver (optional)
* npm -g install less (optional, it's all css)
* WebStorm IDE (or  Sublime )
* tablet (easy to port to both laptops and phones from a tablet, we use Cordova and USB debugging)
* Zepto js (or jQuery currently required)
* Topcoat css (or BootStrap, etc.)
* Signals js
* GreenSock js  (this is a commercial lib, worth it)
* Primus API (no servers)
* HTML Muncher (or other obfuscator)
* A CDN, ex: MaxCDN

Recipe:
- Download the 'startStructure' folder to get the structure and edit. Copy blueGrass and more folder into aCDN/libs.
- Start with a prototype index.html, recommend starting w/ CSS Framework
- Remove sections(div) and save in 'CDN/views' or similar
- Load view
- Recommend running of CDN (ex MaxCDN)
- Use Cloud API: Recommend Primus API!


Things that may not help your UI:
- MV* frameworks: they focus on UI in javascript, not HTML.
    If you are not ready to move past MV*, that's OK, we'll be here when you are. Plus this can be used with any MV*.
- ASM compilter: CSS3 gives you speed, not .js.
- Require/AMD loader : load and unload divs, not 'classes'
- Starting with own, non tested or documented CSS. Just select a CSS framework with an eco system.

If you have bugs, issues or want to list a webapp or site that is using blueGrass, just file an ticket here on github.

You can follow me on twitter: @puppetMaster3
