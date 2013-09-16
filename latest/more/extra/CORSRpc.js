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
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            })(document));
        }, 1);
        this.fbAuth_app_id = app_id;
        this.fbAuth_cb = cb_;
    };
    return FBfbAuth;
})();
var fb = new FBfbAuth();

/*********************/
var CORSRpc = (function () {
    //__isCrossSite ;
    //__isResponseSanitized;
    //This acts as a lookup table for the response callback to execute the user-defined
    //   callbacks and to clean up after a request
    //pendingRequests = {};
    //Ad hoc cross-site callback functions keyed by request ID; when a cross-site request
    //   is made, a function is created
    //callbacks = {};
    /**
    *
    * @param serviceUrl
    * @param options
    */
    function CORSRpc(serviceUrl, options) {
        this.version = "1.0.0.1";
        this.requestCount = 0;
        this.__authUsername = null;
        this.__authPassword = null;
        this.__dateEncoding = 'ISO8601';
        this.__decodeISO8601 = true;
        this.__serviceURL = serviceUrl;
        this.__isCrossSite = false;

        var urlParts = this.__serviceURL.match(/^(\w+:)\/\/([^\/]+?)(?::(\d+))?(?:$|\/)/);

        if (urlParts) {
            this.__isCrossSite = (location.protocol != urlParts[1] || document.domain != urlParts[2] || location.port != (urlParts[3] || ""));
        }

        //Set other default options
        var providedMethodList;

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
    CORSRpc.prototype.callMethod = function (methodName, params) {
        this.requestCount++;
        var err;
        try  {
            console.log('v1');

            //Prepare the CORS RPC request
            var request, postData;
            request = {
                version: "2.0",
                method: methodName,
                id: this.requestCount
            };
            if (params)
                request.params = params;

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
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');

            //Send the request
            console.log(postData);
            xhr.send(postData);

            //resp
            var response;
            console.log(xhr.responseText);
            response = this.__evalJSON(xhr.responseText);

            if (response.error)
                throw Error('Unable to call "' + methodName + '". Server responsed with error (code ' + response.error.code + '): ' + response.error.message);

            this.__upgradeValuesFromJSON(response);
            return response.result;
        } catch (e) {
            //err.locationCode = PRE-REQUEST client
            console.log(e);
            err = e;
        }
        throw new Error(err);
        return null;
    };

    CORSRpc.prototype.__toJSON = function (value) {
        var err;
        try  {
            return JSON.stringify(value);
        } catch (e) {
            console.log(e);
            err = e;
        }
        throw new Error('Unable to convert to JSON.' + err + value);
    };

    CORSRpc.prototype.__evalJSON = function (json) {
        //Remove security comment delimiters
        console.log(json);
        json = json.replace(/^\/\*-secure-([\s\S]*)\*\/\s*$/, "$1");
        console.log(json);
        var err;
        try  {
            return eval('(' + json + ')');
        } catch (e) {
            err = e;
        }
        throw new SyntaxError('Badly formed JSON string: ' + json + " ... " + (err ? err.message : ''));
    };

    //This function iterates over the properties of the passed object and converts them
    //   into more appropriate data types, i.e. ISO8601 strings are converted to Date objects.
    CORSRpc.prototype.__upgradeValuesFromJSON = function (obj) {
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

    //Takes an array or hash and coverts it into a query string, converting dates to ISO8601
    //   and throwing an exception if nested hashes or nested arrays appear.
    CORSRpc.prototype.toQueryString2 = function (params) {
        if (!(params instanceof Object || params instanceof Array) || params instanceof Date)
            throw Error('You must supply either an array or object type to convert into a query string. You supplied: ' + params.constructor);

        var str = '';
        var useHasOwn = {}.hasOwnProperty ? true : false;

        for (var key in params) {
            if (useHasOwn && params.hasOwnProperty(key)) {
                if (params[key] instanceof Array) {
                    for (var i = 0; i < params[key].length; i++) {
                        if (str)
                            str += '&';
                        str += encodeURIComponent(key) + "=";
                        if (params[key][i] instanceof Date)
                            str += encodeURIComponent(this.dateToISO8601(params[key][i]));
else if (params[key][i] instanceof Object)
                            throw Error('Unable to pass nested arrays nor objects as parameters while in making a cross-site request. The object in question has this constructor: ' + params[key][i].constructor);
else
                            str += encodeURIComponent(String(params[key][i]));
                    }
                } else {
                    if (str)
                        str += '&';
                    str += encodeURIComponent(key) + "=";
                    if (params[key] instanceof Date)
                        str += encodeURIComponent(this.dateToISO8601(params[key]));
else if (params[key] instanceof Object)
                        throw Error('Unable to pass objects as parameters while in making a cross-site request. The object in question has this constructor: ' + params[key].constructor);
else
                        str += encodeURIComponent(String(params[key]));
                }
            }
        }
        return str;
    };

    //Converts an iterateable value into an array; similar to Prototype's $A function
    CORSRpc.prototype.toArray2 = function (value) {
        if (value instanceof Array)
            return value;
        var array = [];
        for (var i = 0; i < value.length; i++)
            array.push(value[i]);
        return array;
        //}
        //throw Error("Unable to convert to an array the value: " + String(value));
    };

    /** Returns an ISO8601 string *in UTC* for the provided date (Prototype's Date.toJSON() returns localtime)
    *
    * @param date
    * @returns {string}
    */
    CORSRpc.prototype.dateToISO8601 = function (date) {
        //var jsonDate = date.toJSON();
        //return jsonDate.substring(1, jsonDate.length-1); //strip double quotes
        return date.getUTCFullYear() + '-' + this.zeroPad(date.getUTCMonth() + 1) + '-' + this.zeroPad(date.getUTCDate()) + 'T' + this.zeroPad(date.getUTCHours()) + ':' + this.zeroPad(date.getUTCMinutes()) + ':' + this.zeroPad(date.getUTCSeconds()) + '.' + this.zeroPad(date.getUTCMilliseconds(), 3);
    };

    CORSRpc.prototype.zeroPad = function (value, width) {
        if (!width)
            width = 2;
        value = (value == undefined ? '' : String(value));
        while (value.length < width)
            value = '0' + value;
        return value;
    };
    return CORSRpc;
})();
//# sourceMappingURL=CORSRpc.js.map
