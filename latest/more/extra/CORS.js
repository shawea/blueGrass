window.fbAsyncInit = function () {
    //console.log('FB loaded/pre init')
    FB.init({
        appId: fb.fbAuth_app_id,
        status: true
    });
    FB.login(function (resp) {
        if (resp.authResponse) {
            //console.log(resp)
            FB.api('/me', function (dat) {
                console.log(dat);
                fb.fbAuth_cb(dat, resp);
            });
        }
    });
};
var FBfbAuth = (function () {
    function FBfbAuth() {
    }
    FBfbAuth.prototype.callFB = function (app_id, cb_) {
        console.log('calling FB for ' + app_id);
        setTimeout(function () {
            ((function (d) {
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = '//connect.facebook.net/en_US/all.js';
                ref.parentNode.insertBefore(js, ref);
            })(document));
        }, 1);
        this.fbAuth_app_id = app_id;
        this.fbAuth_cb = cb_;
    };
    return FBfbAuth;
})();
var fb = new FBfbAuth();

/***************************************************************************************/
var CORS = (function () {
    /**
    *
    * @param serviceUrl
    * @param options
    */
    function CORS(serviceUrl, options) {
        this._baseServiceUrl1 = 'http://localhost:8080/service/';
        this.version = '1.0.0.3';
        this.requestCount = 0;
        this.__authUsername = null;
        this.__authPassword = null;
        this.__dateEncoding = 'ISO8601';
        this.__decodeISO8601 = true;
        this.__serviceURL = this._baseServiceUrl1 + serviceUrl;

        var urlParts = this.__serviceURL.match(/^(\w+:)\/\/([^\/]+?)(?::(\d+))?(?:$|\/)/);

        if (options instanceof Object) {
            if (options.user != undefined)
                this.__authUsername = options.user;
            if (options.password != undefined)
                this.__authPassword = options.password;
            if (options.dateEncoding != undefined)
                this.__dateEncoding = options.dateEncoding;
            if (options.decodeISO8601 != undefined)
                this.__decodeISO8601 = !!options.decodeISO8601;
        }
    }
    CORS.prototype.callMethod = function (methodName, params, appKey) {
        this.requestCount++;
        var err;
        try  {
            //Prepare the CORS RPC request
            var request, postData;
            request = {
                version: '2.0',
                method: methodName,
                id: this.requestCount
            };
            if (params)
                request.params = params;
            if (appKey)
                request.appKey = appKey;

            postData = this.__toJSON(request);

            var xhr;
            if (window.XMLHttpRequest)
                xhr = new XMLHttpRequest();
else if (window.ActiveXObject) {
                try  {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (err) {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            xhr.open('POST', this.__serviceURL, false, this.__authUsername, this.__authPassword);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');

            //Send the request
            console.log(postData);
            xhr.send(postData);

            //resp
            var responseRaw = xhr.responseText;
            console.log(responseRaw);
            var response = this.__evalJSON(responseRaw);

            if (response.error)
                throw Error('Unable to call ' + methodName + ' Server returned error (code ' + response.error.code + '): ' + response.error.message);

            this.__upgradeValuesFromJSON(response);
            return response.result;
        } catch (e) {
            //err.locationCode = PRE-REQUEST client
            console.log(e);
            err = e;
            console.log(err);
        }
        throw new Error(err);
        return null;
    };

    CORS.prototype.__toJSON = function (value) {
        var err;
        try  {
            return JSON.stringify(value);
        } catch (e) {
            console.log(e);
            err = e;
        }
        throw new Error('Unable to convert to JSON.' + err + value);
    };

    CORS.prototype.__evalJSON = function (json) {
        //Remove security comment delimiters
        //console.log(json)
        json = json.replace(/^\/\*-secure-([\s\S]*)\*\/\s*$/, '$1');

        //console.log(json)
        var err;
        try  {
            return eval('(' + json + ')');
        } catch (e) {
            err = e;
            console.log(json);
        }
        throw new SyntaxError('Badly formed JSON string: ' + json + ' ... ' + (err ? err.message : ''));
    };

    //This function iterates over the properties of the passed object and converts them
    //   into more appropriate data types, i.e. ISO8601 strings are converted to Date objects.
    CORS.prototype.__upgradeValuesFromJSON = function (obj) {
        var matches, useHasOwn = {}.hasOwnProperty ? true : false;
        for (var key in obj) {
            if (!useHasOwn || obj.hasOwnProperty(key)) {
                if (typeof obj[key] == 'string') {
                    if (this.__decodeISO8601 && (matches = obj[key].match(/^(?:(\d\d\d\d)-(\d\d)(?:-(\d\d)(?:T(\d\d)(?::(\d\d)(?::(\d\d)(?:\.(\d+))?)?)?)?)?)$/))) {
                        obj[key] = new Date(0);
                        if (matches[1])
                            obj[key].setUTCFullYear(parseInt(matches[1]));
                        if (matches[2])
                            obj[key].setUTCMonth(parseInt(matches[2] - 1));
                        if (matches[3])
                            obj[key].setUTCDate(parseInt(matches[3]));
                        if (matches[4])
                            obj[key].setUTCHours(parseInt(matches[4]));
                        if (matches[5])
                            obj[key].setUTCMinutes(parseInt(matches[5]));
                        if (matches[6])
                            obj[key].setUTCMilliseconds(parseInt(matches[6]));
                    } else if (matches = obj[key].match(/^@(\d+)@$/)) {
                        obj[key] = new Date(parseInt(matches[1]));
                    } else if (matches = obj[key].match(/^\/Date\((\d+)\)\/$/)) {
                        obj[key] = new Date(parseInt(matches[1]));
                    }
                } else if (obj[key] instanceof Object) {
                    if (obj[key].__jsonclass__ instanceof Array) {
                        if (obj[key].__jsonclass__[0] == 'Date') {
                            if (obj[key].__jsonclass__[1] instanceof Array && obj[key].__jsonclass__[1][0])
                                obj[key] = new Date(obj[key].__jsonclass__[1][0]);
else
                                obj[key] = new Date();
                        }
                    } else
                        this.__upgradeValuesFromJSON(obj[key]);
                }
            }
        }
    };

    /** Returns an ISO8601 string *in UTC* for the provided date (Prototype's Date.toJSON() returns localtime)
    *
    * @param date
    * @returns {string}
    */
    CORS.prototype.dateToISO8601 = function (date) {
        //var jsonDate = date.toJSON()
        //return jsonDate.substring(1, jsonDate.length-1) //strip double quotes
        return date.getUTCFullYear() + '-' + this.zeroPad(date.getUTCMonth() + 1) + '-' + this.zeroPad(date.getUTCDate()) + 'T' + this.zeroPad(date.getUTCHours()) + ':' + this.zeroPad(date.getUTCMinutes()) + ':' + this.zeroPad(date.getUTCSeconds()) + '.' + this.zeroPad(date.getUTCMilliseconds(), 3);
    };

    CORS.prototype.zeroPad = function (value, width) {
        if (!width)
            width = 2;
        value = (value == undefined ? '' : String(value));
        while (value.length < width)
            value = '0' + value;
        return value;
    };
    return CORS;
})();
//# sourceMappingURL=CORS.js.map
