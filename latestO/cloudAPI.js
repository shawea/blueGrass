var CloudAPI = (function () {
    /**
    * When you create cloudAPI, you need to pass in the app key that you get from PrimusAPI.com
    * @param key
    */
    function CloudAPI(key) {
        this._baseServiceUrl1 = 'http://primusapi.net/service0/';
        this._sec = 0;
        this.setAppKey(key);
    }
    /**
    * Set the application key you get from PrimusAPI.com web site
    * @param key
    */
    CloudAPI.prototype.setAppKey = function (key) {
        this._secret_app_key = key;
        console.log('cloudAPI ready v1.905 ' + this._secret_app_key);
    };

    CloudAPI.prototype.showSpinner = function (status) {
        if (status)
            document.body.style.cursor = 'wait';
else
            document.body.style.cursor = 'default';
    };

    CloudAPI.prototype.setAuthToken = function (tok) {
        this._auth_token = tok;
    };

    CloudAPI.prototype.clearAuthToken = function () {
        this._auth_token = null;
    };

    /**
    * Returns last few rows based on with dateTime. You can kee going back.
    *
    * @param table_
    * @param startDateTime
    * @param count
    * @param cb_
    */
    CloudAPI.prototype.prevRows = function (table_, startDateTime, count, cb_) {
        var header = new Object();
        header.table = table_;
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        var h = JSON.stringify(header);

        var msg = new Object();
        msg._daoc = startDateTime;
        msg.count_ = count;

        this._call('prevRows', msg, cb_, h);
    };

    CloudAPI.prototype._crud = function (table_, crud_enum_, nvp, cb_) {
        var header = new Object();
        header.table = table_;
        header.crud_enum = crud_enum_;
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;

        var h = JSON.stringify(header);
        this._call('CRUD', nvp, cb_, h);
    };

    /**
    * Send an email
    * @param to
    * @param subject
    * @param body
    */
    CloudAPI.prototype.mail = function (to, subject, body) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }

        header.secret_app_key = this._secret_app_key;
        var h = JSON.stringify(header);

        var msg = new Object();

        msg.to = to;
        msg.subject = subject;
        msg.body = body;

        this._call('EMail', msg, null, h);
    };

    //step 2 to auth
    CloudAPI.prototype.matchValidateCode = function (email, match_code, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'validate_';

        var h = JSON.stringify(header);

        var msg = new Object();
        msg.email = email;
        msg.match_code = match_code;

        this._call('auth', msg, cb_, h);
    };

    // returns token
    CloudAPI.prototype.login = function (email, pswd, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'auth_';

        var h = JSON.stringify(header);

        var msg = new Object();
        msg.email = email;
        msg.pswd = pswd;

        this._call('auth', msg, cb_, h);
    };

    /**
    * Sign up a member to your webapp.  This email's code to be validated - tag _CODE_ must exist
    
    * @param email
    * @param pswd
    * @param len
    * @param subject
    * @param body
    * @param args
    * @param cb_
    */
    CloudAPI.prototype.signUp = function (email, pswd, len, subject, body, args, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'signup_';

        var h = JSON.stringify(header);

        if (args == null || typeof args === 'undefined')
            args = new Object();

        args.email = email;
        args.pswd = pswd;
        args.code_length = len;
        args.body = body;
        args.subject = subject;
        console.log(args);
        this._call('auth', args, cb_, h);
    };

    CloudAPI.prototype._call = function (srv, msg, cb_, header_) {
        if (!this._browserSupportsCors()) {
            this._call4(srv, msg, cb_, header_);
            return;
        }
        this.showSpinner(true);

        var smsg = JSON.stringify(msg);

        //if (typeof XDomainRequest != 'undefined') { // for IE 9
        var req = new XMLHttpRequest();
        if (this._sec == 1)
            req.withCredentials = true;

        var curl = this._baseServiceUrl1 + srv + '?data=' + smsg + '&header=' + header_;

        req.onerror = function () {
            console.log('There was an error!! ' + curl);
            console.log(this);
        };

        var thiz = this;
        req.onload = function (ev) {
            if (this.readyState == 4) {
                var dat = this.response;

                if (cb_ != null && dat != null && dat.length > 3) {
                    try  {
                        //if(typeof ret != 'undefined' && typeof ret['error_'] != 'undefined' )
                        //   console.log(ret[CloudAPI.ERROR])
                        var ret = JSON.parse(dat);
                        setTimeout(function () {
                            cb_(ret, ret['error_']);
                        }, 1);
                    } catch (ex) {
                        console.log(dat);
                        console.log('JSON parse err ' + ex);
                        //console.log(curl)
                    }
                } else {
                    if (cb_ != null)
                        cb_();
                }

                setTimeout(function () {
                    console.log('.');
                    thiz.showSpinner(false);
                }, 1);
            }
        };

        //console.log(curl)
        req.open('GET', curl, true);

        req.send('x');
    };

    CloudAPI.prototype._call4 = function (srv, msg, callBack_, header_) {
        var dat = {
            data: JSON.stringify(msg),
            header: header_
        };
        console.log(4);

        //console.log(dat)
        var curl = this._baseServiceUrl1 + srv + '?header=' + header_;

        $.ajax({
            url: curl + '&callback=?',
            dataType: 'jsonp',
            global: false,
            context: this,
            data: dat,
            success: function (data_) {
                console.log('jback', JSON.stringify(data_));
                if (callBack_) {
                    callBack_(data_);
                }
            },
            error: function (xhr_, errorType_, error_) {
                console.log('jsonp error', xhr_, errorType_, error_);
            }
        });
    };

    /**
    * A helper function that uses 'name' to get an object of form data
    * @param id
    * @returns {Object}
    */
    CloudAPI.prototype.makeFormMessage = function (id) {
        var msg = new Object();
        var form = $('#' + id).serializeArray();
        $.each(form, function () {
            if (msg[this.name]) {
                if (!msg[this.name].push) {
                    msg[this.name] = [msg[this.name]];
                }
                msg[this.name].push(this.value || '');
            } else {
                msg[this.name] = this.value || '';
            }
        });
        return msg;
    };

    /**
    * Update a row
    * @param table_name
    * @param pk
    * @param updatedNVP
    * @param cb_
    */
    CloudAPI.prototype.update = function (table_name, pk, updatedNVP, cb_) {
        updatedNVP._id = pk;
        this._crud(table_name, 'up', updatedNVP, cb_);
    };

    /**
    * Delete a row by primary key
    * @param table_name
    * @param pk
    * @param cb_
    */
    CloudAPI.prototype.del = function (table_name, pk, cb_) {
        var nvp = new Object();
        nvp._id = pk;
        this._crud(table_name, 'del', nvp, cb_);
    };

    /**
    *
    * Insert a row
    *
    * @param table_name
    * @param nvp
    * @param cb_
    */
    CloudAPI.prototype.insert = function (table_name, nvp, cb_) {
        this._crud(table_name, 'ins', nvp, cb_);
    };

    /**
    * Get data
    * @param table_name
    * @param nvp
    * @param cb_
    */
    CloudAPI.prototype.select = function (table_name, nvp, cb_) {
        this._crud(table_name, 'sel', nvp, cb_);
    };

    /**
    * Used for join of 2 tables
    *
    * @param table1
    * @param table2
    * @param nvp
    * @param field1
    * @param field2
    * @param cb_
    */
    CloudAPI.prototype.selectRelation = function (table1, table2, nvp, field1, field2, cb_) {
        var header = new Object();

        header.secret_app_key = this._secret_app_key;
        header.table = table1;
        header.table2 = table2;
        header.jfield_1 = field1;
        header.jfield_2 = field2;

        var h = JSON.stringify(header);
        this._call('Relational', nvp, cb_, h);
    };

    CloudAPI.prototype._browserSupportsCors = function () {
        if ('withCredentials' in new XMLHttpRequest())
            return true;
else
            return false;
    };

    CloudAPI.prototype._createXHR = function () {
        var xhr;
        if (window.ActiveXObject) {
            try  {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                //alert(e.message);
                xhr = null;
            }
        } else {
            xhr = new XMLHttpRequest();
        }

        return xhr;
    };
    CloudAPI.ERROR = 'error_';
    CloudAPI.ARRAY = 'array_';

    CloudAPI._INS = 'ins';
    CloudAPI._UP = 'up';
    CloudAPI._DEL = 'del';
    CloudAPI._SEL = 'sel';

    CloudAPI.PK = 'id_';
    return CloudAPI;
})();
//# sourceMappingURL=cloudAPI.js.map
