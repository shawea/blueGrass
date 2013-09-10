
ViewTransitionsImpl = (function() {// class
    function ViewTransitionsImpl() {
        return ViewTransitionsImpl.__super__.constructor.apply(this, arguments);
    }
    __extends(ViewTransitionsImpl, AbstractViewTransitions);

    ViewTransitionsImpl.prototype.init = function (transitionAnimTypeName) {
        var self = this;
        AbstractViewTransitions.prototype.init.call(self, transitionAnimTypeName);
        self.transitionEnded = true;
    };

    ViewTransitionsImpl.prototype.loadFirst = function(dir_, viewId_, callBack_) {
        var self = this;
        if (!self.transitionEnded) {
            return;
        }
        $('#kontainer .view').remove();
        $('#header .back_button_container').addClass('first');
        self._viewsStack.splice(0, self._viewsStack.length); // reset view stack
        if (self.nextViewId !== dir_ + '/' + viewId_) {
            self.nextViewId = dir_ + '/' + viewId_;

            self._viewDir = dir_;
            self.transitionEnded = false;
            $.get(dir_ + '/' + viewId_ + '.html' + getCacheId(), function(resp_) {
                $('#kontainer').append(resp_);
                $doResize(10);
    
                var stackItem = {
                    dir: dir_,
                    viewId: viewId_
                };
                if (callBack_ !== undefined) {
                    stackItem.after = callBack_;
                }
                self._viewsStack.push(stackItem);
        
                if (stackItem.after) {
                    (stackItem.after)();
                }
                console.log(' LOADED *** :', self._viewsStack);
                self.transitionEnded = true;
            });
        }
    };//()
    ViewTransitionsImpl.prototype.clearTransitionClasses = function (view) {
        view.removeClass('next-old').removeClass('next-new-begin').removeClass('next-new-end').removeClass('back-old').removeClass('back-new-begin').removeClass('back-new-end');
    };
    ViewTransitionsImpl.prototype.goToView = function(newViewId_, callBack_, dir_, nRemovedPredViews, soundCallback) {
        var self = this;
        if (!self.transitionEnded) {
            return;
        }
        if (self.nextViewId === dir_ + '/' + newViewId_) {
            return;
        }
        //alert('Transition type name: ' + self.transitionAnimTypeName);
        self.nextViewId = dir_ + '/' + newViewId_;
        $('#header .back_button_container').removeClass('first').removeClass('has_br');
        $('#header .header_text_2_lines').hide();
        $('#headerChallengeResult').hide();
        $('#footerButtonInvite').hide();
        $('#headerTitle').show();

        var len = self._viewsStack.length;
        var oldViewId = '#' +self._viewsStack[len-1].viewId;
        var oldView = $(oldViewId);

        var stackItem = {
            viewId: newViewId_
        };
        if (callBack_ !== undefined) {
            stackItem.after = callBack_;
        }
        if (!dir_) {
            stackItem.dir = self._viewDir;
        } else {
            stackItem.dir = dir_;
        }
        if (nRemovedPredViews) {
            var i;
            for (i = 0; i < nRemovedPredViews; i += 1) {
                this._viewsStack.pop();
            }
        }
        if (soundCallback) {
            stackItem.soundCallback = soundCallback;
        }
        this._viewsStack.push(stackItem);

        var viewName = stackItem.dir + '/' + newViewId_ + '.html' + getCacheId();

        newViewId_ = '#' + newViewId_;
        console.log(' GOTO_VIEW *** :',oldViewId,'~>', newViewId_, viewName);
        oldView.css({ 'z-index': -10 });
        var wid = $(window).width();
        console.log('wid',wid);

        self.transitionEnded = false;
        $.get(viewName, function(resp_) {
            $('#kontainer').append(resp_);
            var newView = $(newViewId_);
            $doResize(10);

            if (self.transitionAnimTypeName === '3D') {
                self.clearTransitionClasses(oldView);
                oldView.addClass('next-old');
                oldView.css({'-webkit-transform' : 'rotateY(-60deg) translateX(' + (-1 * wid) + 'px)', opacity: 0.2});
    
                self.clearTransitionClasses(newView);
                newView.addClass('next-new-begin');
                newView.css({'-webkit-transform': 'rotateY(60deg) translateX(' + (1 * wid) + 'px)', opacity: 0.2});
    
                setTimeout(function () {
                    newView.removeClass('next-new-begin');
                    newView.addClass('next-new-end');
                    newView.css({'-webkit-transform' : 'rotateY(0deg) translateX(0px)' ,opacity: 1});
                }, 1);
    
                setTimeout(function () {
                    oldView.remove();
                    self.transitionEnded = true;
                }, 1000);
            } else {
                oldView.remove();
                self.transitionEnded = true;
            }

            setTimeout(function () {
                if (stackItem.after) {
                    (stackItem.after)();
                }
            }, 400);
        });


    };
    ViewTransitionsImpl.prototype.goBackView = function(callBack_, nViews) {
        var self = this;
        if (!self.transitionEnded) {
            return;
        }
        if (!nViews) {
            nViews = 1;
        }

        //console.log('/////////////////////////////////////////////////////////////////');
        //console.log(this._viewsStack);
        var len = this._viewsStack.length;
        console.log('GO BACK: view stack length :', len);
        if(len === 1) {//stack is 1
            return;
        }
        if (len === 2) {
            $('#header .back_button_container').addClass('first');
        }
        $('#header .back_button_container').removeClass('has_br');
        $('#header .header_text_2_lines').hide();
        $('#headerChallengeResult').hide();
        $('#footerButtonInvite').hide();
        $('#headerTitle').show();
        var stackItem = this._viewsStack.pop();
        //var curViewId = this._viewsStack[len-1].viewId;
        var curViewId = stackItem.viewId;
        var curDir = stackItem.dir;
        var curView = $(curViewId);
        if(0===curView.length) {//bug TODO
            curView = $('#kontainer').children();
            console.log('.');
        }

        var i;
        for (i = 1; i < nViews; i += 1) { // some view skipping if going back more 2 or more views
            this._viewsStack.pop();
        }
        stackItem = this._viewsStack[len-(1 + nViews)];
        var backViewId = stackItem.viewId;
        self.nextViewId = stackItem.dir + '/' + backViewId;
        var backPageName = stackItem.dir + '/' + backViewId + '.html' + getCacheId();
        backViewId = '#' + backViewId;
        console.log(' GO_BACK *** :',curDir,curViewId, backViewId, backPageName);
        //this._viewsStack.pop();

        curView.css({ 'z-index': -10 });
        var wid = $(window).width();
        console.log('wid',wid);

        self.transitionEnded = false;
        if (stackItem.soundCallback) {
            console.log('SOUND CALLBACK AVAILABLE');
            (stackItem.soundCallback)();
        }
        $.get(backPageName, function(resp_) {


            $('#kontainer').prepend(resp_);
            var backView = $(backViewId);
            //backView.css({ visibility: 'hidden', 'z-index': -1 })
            $doResize(10);

            if (self.transitionAnimTypeName === '3D') {
                self.clearTransitionClasses(curView);
                curView.addClass('back-old');
                curView.css({'-webkit-transform' : 'rotateY(60deg) translateX(' + (1 * wid) + 'px)', opacity: 0.2});
    
                self.clearTransitionClasses(backView);
                backView.addClass('back-new-begin');
                backView.css({'-webkit-transform': 'rotateY(-60deg) translateX(' + (-1 * wid) + 'px)', opacity: 0.2});
    
                setTimeout(function () {
                    backView.removeClass('back-new-begin');
                    backView.addClass('back-new-end');
                    backView.css({'-webkit-transform' : 'rotateY(0deg) translateX(0px)' ,opacity: 1});
                    if (stackItem.after) {
                        (stackItem.after)();
                    }
                    if (callBack_) {
                        callBack_();
                    }
                }, 1);
    
                setTimeout(function () {
                    curView.remove();
                    self.transitionEnded = true;
                    $doResize(100);
                }, 1000);
            } else {
                curView.remove();
                if (stackItem.after) {
                    (stackItem.after)();
                }
                if (callBack_) {
                    callBack_();
                }
                self.transitionEnded = true;
            }
        });//get
        return backViewId;
    };

    return ViewTransitionsImpl;
}());

var Sound = (function () {
    function Sound () {
    }

    Sound.playWoosh = function () {
        $('#soundWoosh')[0].play();
    };

    Sound.playTimer = function () {
        $('#soundTimer')[0].play();
    };

    Sound.playWinOrLose = function () {
        $('#soundWinOrLose')[0].play();
    };

    Sound.stopTimer = function () {
        $('#soundTimer')[0].pause();
    };

    return Sound;
}());


// ///////////////////////////////

$doResize = function(delay_, additionalHeight) {
    if (!additionalHeight) {
        additionalHeight = 100;
    }
    setTimeout(function() {

        var views = $('#kontainer').children();
        console.log('DO RESIZE views.length: ' + views.length);
        var winH = $(window).height();
        console.log('res', winH);
        var newViewsHeight = winH - 113;
        var viewHeight = newViewsHeight + additionalHeight;
        views.height(viewHeight);
        var viewWidth = $(window).width() - 4;
        views.width(viewWidth);
        console.log('DO RESIZE: ' + newViewsHeight);
        views.each(function () {
            var $view = $(this);
            var $dynamicHeights = $view.find('.dynamic_height');
            $dynamicHeights.each(function () {
                var $dyn = $(this);
                var heightAdjustment = parseInt($dyn.attr('data-heightadjustment') || '0', 10);
                $dyn.height(newViewsHeight - heightAdjustment + additionalHeight - 76);
            });
            var $lastDyn = $($dynamicHeights[$dynamicHeights.length - 1]);
            var $footerPadder = $lastDyn.find('.footer_padder');
            if ($footerPadder.length < 1) {
                $lastDyn.append($('<div class="footer_padder"></div>'));
            }
        });

        setTimeout(function () {
            $observed.trigger('DO_RESIZE', {viewWidth: viewWidth, viewHeight: viewHeight});
        }, 0);
    }, delay_);
};


var $onResize = function () {
    var width = $(window).width();
    var height = $(window).height();
    if ((width / height) > (640 / 960)) {
        $(document.body).css({'background-size': '100% auto'});
    } else {
        $(document.body).css({'background-size': 'auto 100%'});
    }
};



