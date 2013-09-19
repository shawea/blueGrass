# blueGrass
 blueGrass is a library w/ a few function that could help you create stunning & magical UI w/ interactions,
    cross platform, mobile-first, SPA (Single Page Applications) for interactive and creative HTML5.

It is based on jQuery and is DOM centric(vs .js centric) with easy to teach setup

These patterns are licensed under Attribution Assurance License ( details are here http://opensource.org/licenses/AAL )
So, in your index.html or similar in view source you must indicate that your designs are derived from http://raw.github.com/shawea/blueGrass to comply w/ our offered license.
If you can't agree to the license then go away, or maybe write us a large check for a commercial license.

Here are example of the type of application you can/should build with this.
- http://intothearctic.gp by HelloMonday
- http://www.google.com/nexus

For example, we can animate a div/section after loading. But the key to blueGrass is that it is hard to do nice UI in .js views, here the views are HTML DOM, not .js emitted.

Since you are here, you agree to the A.A. license, here you go: http://scdn.primus.netdna-cdn.com/latest2/blueGrass.js
Yes this is all the functions we have to make patterns work. You do have to learn how to use them.

We load views, ie:
- http://zeptojs.com/#$.get
 to insert (or remove) a section/div/view.
It is pure HTML5 and could run of CDN, preventing DOS. Also each view can be previewed independently.

To run examples:
open terminal in the directory and run 'simplehttpserver' (installed via npm) or similar - then surf to each folder.

After you download, you may want to watch a 10 minute video: http://www.youtube.com/watch?v=YWUGC3wKe14.

Recommended but not required :
* chrome (and open the javascript console )
* npm -g install simplehttpserver (optional)
* npm -g install less (optional, it's all css)
* npm -g install typescript (optional, it's all .js, but you may like .js v6)
* WebStorm IDE (optional)
* Mobile (for USB debugging, I use a tablet)
* Zepto js (or jQuery, optional)
* Topcoat css (or BootStrap, etc.)
* Signals js   (optional)
* GreenSock js  (for animation)
* Primus API (no servers)
* HTML Muncher (or other obfuscator)
* A CDN, ex: MaxCDN
* There are other libs used, check under cdn folder.

Recipe:
- Download the 'www' folder to get the start structure and edit. Copy 'latest' folder into aCDN/libs.
- Start with a prototype layout, recommend starting w/ CSS Framework
- Remove sections(div) and save in 'CDN/views' or similar
- Load view using provided open() or forward(). On open: animate as needed, using greenSock.
- Recommend running of CDN (ex MaxCDN)
- Use Cloud API: Recommend Primus API!

Things that may not help your UI:
- MV* frameworks: they focus on UI in javascript, not HTML DOM. Your app ends up looking like a Java Applet: fugly.
    If you are not ready to move beyond MV*, that's OK, we'll be here when you are. Also, this can be used with any MV*.
    But if you want to know, this is a a presenter/event bus, that starts with view(DOM based).
- ASM compilers: CSS3 gives you speed, not .js. For example famou.us.
- Require/AMD loaders : load and unload divs, not 'classes'
- Starting with own, non tested or documented CSS. Just select a CSS framework with an eco system. Most examples here use TopCoat css.

If you have bugs, issues, just file an ticket here on github.
If you want, you can follow me on twitter: @puppetMaster3
