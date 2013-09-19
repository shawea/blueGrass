var CloudAPI = (function () {
    /**
    * When you create cloudAPI, you need to pass in the app key that you get from PrimusAPI.com
    * @param key
    */
    function CloudAPI(key) {
        this._crud = new CORS('crud');
        this.setAppKey(key);
    }
    /**
    * Set the application key you get from PrimusAPI.com web site
    * @param key
    */
    CloudAPI.prototype.setAppKey = function (key) {
        this._secret_app_key = key;
        console.log('cloudAPI ready v2.917a ');
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

    /**
    * A helper function that uses 'name' to get an object of form data
    * @param id
    * @returns {Object}
    */
    CloudAPI.prototype.makeFormObject = function (id) {
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
    * @param table_name
    * @param pk
    * @param obj new values
    */
    CloudAPI.prototype.update = function (table_name, pk, obj, cb) {
        obj.table = table_name;
        obj._id = pk;
        this._crud.callMethod('update', cb, obj, this._secret_app_key);
    };

    /**
    * @param table_name
    * @param pk
    */
    CloudAPI.prototype.del = function (table_name, pk, cb) {
        var obj = new Object();
        obj.table = table_name;
        obj._id = pk;
        this._crud.callMethod('del', cb, obj, this._secret_app_key);
    };

    /**
    * @param table_name
    * @param object/cols ex: obj.first_name = 'Tom'
    * @returns pk
    */
    CloudAPI.prototype.insert = function (table_name, obj, cb) {
        obj.table = table_name;
        this._crud.callMethod('insert', cb, obj, this._secret_app_key);
        //return result._id;
    };

    /**
    * @param table_name
    * @param obj
    * @returns Array [] ie, a list or rows
    */
    CloudAPI.prototype.select = function (table_name, obj, cb) {
        if (!obj)
            var obj = new Object();
        obj.table = table_name;
        this._crud.callMethod('select', cb, obj, this._secret_app_key);
        //return result.array_
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
    CloudAPI.PK = '_id';
    return CloudAPI;
})();

document.write('<script src="http://scdn.primus.netdna-cdn.com/CORS.js"><\/script>');
//# sourceMappingURL=cloudAPI.js.map
