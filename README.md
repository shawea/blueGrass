# blueGrass
 blueGrass is a library w/ a few function that could help you create stunning & magical UI w/ animation,
    cross platform, mobile-first, SPA (Single Page Applications) for interactive and creative HTML5. It is built on top of select 3rd party libraries included here for reference.

These patterns are licensed under Attribution Assurance License ( details are here http://opensource.org/licenses/AAL )
As you may know a license free of cost is not free of obligations. These here designs require
the derivatives and their derivatives attribute a link to this github blueGrass page
and also agree to 'loser pays' both sides legal costs plus penalties under arbitration ( http://en.wikipedia.org/wiki/International_arbitration#International_Arbitration_Resources )
if not properly licensed.
So, in your index.html or similar in view source you must indicate that your code is derived from http://raw.github.com/shawea/blueGrass to comply w/ our offered license.
If you can't agree to the license then go away, or maybe write us a large checkes for a commercial license.

Here are example of the type of application you can/should build:
- http://intothearctic.gp
- http://www.google.com/nexus

For example, we can animate a div/section after loading. But the key to blueGrass is that it is hard to do nice UI in .js views, here the views are HTML DOM, not .js emited.

Since you are here, you agree to the AAL license :-), here you go: http://raw.github.com/shawea/blueGrass/master/cdn/blueGrass.js
Yes this is all functions we have to make patterns work. You do have to learn how to use them.

We use Ajax, ex:
- http://zeptojs.com/#$.get
 to insert (or remove a section/div/view. It is just a lib, like underscore, mostly used w/ Zepto or jQuery.
It is pure HTML5 and could run of CDN, preventing DOS. Also each view can be previewed independently by a designer.

To run examples:
open terminal in the directory and run 'simplehttpserver' (installed via npm) or similar - then surf to ROOT in each folder.

Recommended but not required:
* chrome  (and open the developer console in icognito mode or any browser)
* npm -g install simplehttpserver (optional)
* npm -g install less (optional, it's all css)
* npm -g install typescript (optional, it's all .js)
* WebStorm IDE (optional)
* Mobile (for USB debugging, I use a tablet)
* Zepto js (or jQuery, optional)
* Topcoat css (or BootStrap, etc.)
* Signals js   (optional, but why have problems w/ events)
* GreenSock js  (for animation)
* Primus API (no servers)
* HTML Muncher (or other obfuscator)
* A CDN, ex: MaxCDN
* There are other libs used, check under blueGrass and more.

Design/recipe:
- Download the 'startStructure' folder to get the structure and edit. Copy cdn folder into aCDN/libs.
- Start with a prototype layout, recommend starting w/ CSS Framework
- Remove sections(div) and save in 'CDN/views' or similar
- Load view using provided open() or forward(). On open, animate, using greenSock.
- Recommend running of CDN (ex MaxCDN)
- Use Cloud API: Recommend Primus API!

Things that may not help your UI:
- MV* frameworks: they focus on UI in javascript, not HTML.
    If you are not ready to move past MV*, that's OK, we'll be here when you are. Before you leave, this can be used with any MV*.
    (But if you want to know, this is a a presenter/event bus.)
- ASM compilers: CSS3 gives you speed, not .js.
- Require/AMD loaders : load and unload divs, not 'classes'
- Starting with own, non tested or documented CSS. Just select a CSS framework with an eco system. Most examples here use TopCoat css.

If you have bugs, issues, just file an ticket here on github.
If you want, you can follow me on twitter: @puppetMaster3
