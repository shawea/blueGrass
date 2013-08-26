var CloudAPI = (function () {
    function CloudAPI() {
        this._baseServiceUrl1 = 'http://ca_1.primusapi.com/service/';
        this._sec = 0;
        try  {
            var script_tag = document.getElementById('primusAPI');
            this._secret_app_key = script_tag.getAttribute('data-app_key');
            if (typeof this._secret_app_key != 'undefined' && this._secret_app_key != null) {
                console.log('cloudAPI ready v1.811a ' + this._secret_app_key);
            } else
                console.log('app key not set ');
        } catch (er) {
            console.log('app key not set e ');
        }
    }
    CloudAPI.prototype.setAppKey = function (key) {
        this._secret_app_key = key;
    };

    CloudAPI.prototype.setAuthToken = function (tok) {
        this._auth_token = tok;
    };

    CloudAPI.prototype.clearAuthToken = function () {
        this._auth_token = null;
    };

    CloudAPI.prototype.zipCodeUSA = function (zipcode, cb_) {
        var msg = new Object();
        msg.Zipcode = zipcode;
        this._call('USAZipCode', msg, cb_, null);
    };

    /**
    * Returns last few rows starting with dateTime
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

    CloudAPI.prototype.mail = function (to, subject, body) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }

        header.secret_app_key = this._secret_app_key;

        // header.st_='123'
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

    // email's code to be validated - tag _CODE_ must exist
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

        req.onload = function () {
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
                    } catch (e) {
                        console.log(dat);
                        console.log('JSON parse err ' + e);
                    }
                } else {
                    console.log(cb_);
                    if (cb_ != null)
                        cb_();
                }
            }
            console.log('^');
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

    CloudAPI.prototype.update = function (table_name, pk, updatedNVP, cb_) {
        updatedNVP._id = pk;
        this._crud(table_name, 'up', updatedNVP, cb_);
    };

    CloudAPI.prototype.del = function (table_name, pk, cb_) {
        var nvp = new Object();
        nvp._id = pk;
        this._crud(table_name, 'del', nvp, cb_);
    };

    CloudAPI.prototype.insert = function (table_name, nvp, cb_) {
        this._crud(table_name, 'ins', nvp, cb_);
    };

    CloudAPI.prototype.select = function (table_name, nvp, cb_) {
        this._crud(table_name, 'sel', nvp, cb_);
    };

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
            return true; else
            return false;
    };
    CloudAPI.ERROR = 'error_';
    CloudAPI.ARRAY = 'array_';
    CloudAPI.AOP_ENUM = 'aop_enum';

    CloudAPI._INS = 'ins';
    CloudAPI._UP = 'up';
    CloudAPI._DEL = 'del';
    CloudAPI._SEL = 'sel';

    CloudAPI.PK = 'id_';
    return CloudAPI;
})();
//@ sourceMappingURL=cloudAPI.js.map
