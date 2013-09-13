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

/////
var COARSRpc = {
    version: "1.0.0.2",
    requestCount: 0
};
COARSRpc.ServiceProxy = function (serviceUrl, options) {
    this.__serviceURL = serviceUrl;
    this.__isCrossSite = false;

    var urlParts = this.__serviceURL.match(/^(\w+:)\/\/([^\/]+?)(?::(\d+))?(?:$|\/)/);

    if (urlParts) {
        this.__isCrossSite = (location.protocol != urlParts[1] || document.domain != urlParts[2] || location.port != (urlParts[3] || ""));
    }

    //Set other default options
    var providedMethodList;
    this.__isAsynchronous = true;
    this.__authUsername = null;
    this.__authPassword = null;
    this.__dateEncoding = 'ISO8601';
    this.__decodeISO8601 = true;

    if (options instanceof Object) {
        if (options.asynchronous !== undefined) {
            this.__isAsynchronous = !!options.asynchronous;
        }
        if (options.user != undefined)
            this.__authUsername = options.user;
        if (options.password != undefined)
            this.__authPassword = options.password;
        if (options.dateEncoding != undefined)
            this.__dateEncoding = options.dateEncoding;
        if (options.decodeISO8601 != undefined)
            this.__decodeISO8601 = !!options.decodeISO8601;
        providedMethodList = options.methods;
    }

    if (providedMethodList) {
        this.__methodList = providedMethodList;
    } else {
        var async = this.__isAsynchronous;
        this.__isAsynchronous = false;
        this.__methodList = this.__callMethod("system.listMethods", []);
        this.__isAsynchronous = async;
    }
    this.__methodList.push("system.listMethods");

    for (var methodName, i = 0; methodName = this.__methodList[i]; i++) {
        //Make available the received methods in the form of chained property lists (eg. "parent.child.methodName")
        var methodObject = this;
        var propChain = methodName.split(/\./);
        for (var j = 0; j + 1 < propChain.length; j++) {
            if (!methodObject[propChain[j]])
                methodObject[propChain[j]] = {};
            methodObject = methodObject[propChain[j]];
        }

        //Create a wrapper to this.__callMethod with this instance and this methodName bound
        var wrapper = (function (instance, methodName) {
            var call = { instance: instance, methodName: methodName };
            return function () {
                if (call.instance.__isAsynchronous) {
                    if (arguments.length == 1 && arguments[0] instanceof Object) {
                        call.instance.__callMethod(call.methodName, arguments[0].params, arguments[0].onSuccess, arguments[0].onException, arguments[0].onComplete);
                    } else {
                        call.instance.__callMethod(call.methodName, arguments[0], arguments[1], arguments[2], arguments[3]);
                    }
                    return undefined;
                } else
                    return call.instance.__callMethod(call.methodName, COARSRpc.toArray(arguments));
            };
        })(this, methodName);
        methodObject[propChain[propChain.length - 1]] = wrapper;
    }
};

COARSRpc.setAsynchronous = function (serviceProxy, isAsynchronous) {
    serviceProxy.__isAsynchronous = !!isAsynchronous;
};

COARSRpc.ServiceProxy.prototype.__callMethod = function (methodName, params, successHandler, exceptionHandler, completeHandler) {
    COARSRpc.requestCount++;

    if (this.__isAsynchronous) {
        if (successHandler && typeof successHandler != 'function')
            throw Error('The asynchronous onSuccess handler callback function you provided is invalid; the value you provided (' + successHandler.toString() + ') is of type "' + typeof (successHandler) + '".');
        if (exceptionHandler && typeof exceptionHandler != 'function')
            throw Error('The asynchronous onException handler callback function you provided is invalid; the value you provided (' + exceptionHandler.toString() + ') is of type "' + typeof (exceptionHandler) + '".');
        if (completeHandler && typeof completeHandler != 'function')
            throw Error('The asynchronous onComplete handler callback function you provided is invalid; the value you provided (' + completeHandler.toString() + ') is of type "' + typeof (completeHandler) + '".');
    }

    try  {
        if (this.__isAsynchronous) {
            COARSRpc.pendingRequests[String(COARSRpc.requestCount)] = {
                //method:methodName,
                onSuccess: successHandler,
                onException: exceptionHandler,
                onComplete: completeHandler
            };
        }

        if (params && (!(params instanceof Object) || params instanceof Date))
            throw Error('When making asynchronous calls, the parameters for the method must be passed as an array (or a hash); the value you supplied (' + String(params) + ') is of type "' + typeof (params) + '".');

        //Prepare the XML-RPC request
        var request, postData;
        request = {
            version: "2.0",
            method: methodName,
            id: COARSRpc.requestCount
        };
        if (params)
            request.params = params;
        postData = this.__toJSON(request);

        console.log(postData);

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

        xhr.open('POST', this.__serviceURL, this.__isAsynchronous, this.__authUsername, this.__authPassword);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        if (this.__isAsynchronous) {
            //Send the request
            xhr.send(postData);

            //Handle the response
            var instance = this;
            var requestInfo = { id: COARSRpc.requestCount };
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    //XML-RPC
                    console.log(xhr.response);

                    var response = instance.__evalJSON(xhr.responseText, instance.__isResponseSanitized);
                    if (!response.id)
                        response.id = requestInfo.id;
                    instance.__doCallback(response);
                }
            };

            return undefined;
        } else {
            //Send the request
            xhr.send(postData);
            var response;

            console.log(xhr.responseText);

            response = this.__evalJSON(xhr.responseText, this.__isResponseSanitized);

            if (response.error)
                throw Error('Unable to call "' + methodName + '". Server responsed with error (code ' + response.error.code + '): ' + response.error.message);

            this.__upgradeValuesFromJSON(response);
            return response.result;
        }
    } catch (err) {
        //err.locationCode = PRE-REQUEST client
        var isCaught = false;
        if (exceptionHandler)
            isCaught = exceptionHandler(err);
        if (completeHandler)
            completeHandler();

        if (!isCaught)
            throw err;
    }
};

//This acts as a lookup table for the response callback to execute the user-defined
//   callbacks and to clean up after a request
COARSRpc.pendingRequests = {};

//Ad hoc cross-site callback functions keyed by request ID; when a cross-site request
//   is made, a function is created
COARSRpc.callbacks = {};

//Called by asynchronous calls when their responses have loaded
COARSRpc.ServiceProxy.prototype.__doCallback = function (response) {
    if (typeof response != 'object')
        throw Error('The server did not respond with a response object.');
    if (!response.id)
        throw Error('The server did not respond with the required response id for asynchronous calls.');

    if (!COARSRpc.pendingRequests[response.id])
        throw Error('Fatal error with RPC code: no ID "' + response.id + '" found in pendingRequests.');

    if (COARSRpc.pendingRequests[response.id].scriptElement) {
        var script = COARSRpc.pendingRequests[response.id].scriptElement;
        script.parentNode.removeChild(script);
    }

    if (COARSRpc.callbacks[response.id])
        delete COARSRpc.callbacks['r' + response.id];

    var uncaughtExceptions = [];

    if (response.error !== undefined) {
        var err = new Error(response.error.message);
        err.code = response.error.code;

        if (COARSRpc.pendingRequests[response.id].onException) {
            try  {
                if (!COARSRpc.pendingRequests[response.id].onException(err))
                    uncaughtExceptions.push(err);
            } catch (err2) {
                uncaughtExceptions.push(err);
                uncaughtExceptions.push(err2);
            }
        } else
            uncaughtExceptions.push(err);
    } else if (response.result !== undefined) {
        //iterate over all values and substitute date strings with Date objects
        //Note that response.result is not passed because the values contained
        //  need to be modified by reference, and the only way to do so is
        //  but accessing an object's properties. Thus an extra level of
        //  abstraction allows for accessing all of the results members by reference.
        this.__upgradeValuesFromJSON(response);

        if (COARSRpc.pendingRequests[response.id].onSuccess) {
            try  {
                COARSRpc.pendingRequests[response.id].onSuccess(response.result);
            } catch (err) {
                if (COARSRpc.pendingRequests[response.id].onException) {
                    try  {
                        if (!COARSRpc.pendingRequests[response.id].onException(err))
                            uncaughtExceptions.push(err);
                    } catch (err2) {
                        uncaughtExceptions.push(err);
                        uncaughtExceptions.push(err2);
                    }
                } else
                    uncaughtExceptions.push(err);
            }
        }
    }

    try  {
        if (COARSRpc.pendingRequests[response.id].onComplete)
            COARSRpc.pendingRequests[response.id].onComplete(response);
    } catch (err) {
        if (COARSRpc.pendingRequests[response.id].onException) {
            try  {
                if (!COARSRpc.pendingRequests[response.id].onException(err))
                    uncaughtExceptions.push(err);
            } catch (err2) {
                uncaughtExceptions.push(err);
                uncaughtExceptions.push(err2);
            }
        } else
            uncaughtExceptions.push(err);
    }

    delete COARSRpc.pendingRequests[response.id];

    if (uncaughtExceptions.length) {
        var code;
        var message = 'There ' + (uncaughtExceptions.length == 1 ? 'was 1 uncaught exception' : 'were ' + uncaughtExceptions.length + ' uncaught exceptions') + ': ';
        for (var i = 0; i < uncaughtExceptions.length; i++) {
            if (i)
                message += "; ";
            message += uncaughtExceptions[i].message;
            if (uncaughtExceptions[i].code)
                code = uncaughtExceptions[i].code;
        }
        var err = new Error(message);
        err.code = code;
        throw err;
    }
};

/*******************************************************************************************
* JSON-RPC Specific Functions
******************************************************************************************/
COARSRpc.ServiceProxy.prototype.__toJSON = function (value) {
    switch (typeof value) {
        case 'number':
            return isFinite(value) ? value.toString() : 'null';
        case 'boolean':
            return value.toString();
        case 'string':
            //Taken from Ext JSON.js
            var specialChars = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"': '\\"',
                "\\": '\\\\',
                "/": '\/'
            };
            return '"' + value.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                var c = specialChars[b];
                if (c)
                    return c;
                c = b.charCodeAt();

                //return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                return '\\u00' + COARSRpc.zeroPad(c.toString(16));
            }) + '"';
        case 'object':
            if (value === null)
                return 'null';
else if (value instanceof Array) {
                var json = ['['];
                for (var i = 0; i < value.length; i++) {
                    if (i)
                        json.push(',');
                    json.push(this.__toJSON(value[i]));
                }
                json.push(']');
                return json.join('');
            } else if (value instanceof Date) {
                switch (this.__dateEncoding) {
                    case 'classHinting':
                        return '{"__jsonclass__":["Date",[' + value.valueOf() + ']]}';
                    case '@timestamp@':
                    case '@ticks@':
                        return '"@' + value.valueOf() + '@"';
                    case 'ASP.NET':
                        return '"\\/Date(' + value.valueOf() + ')\\/"';
                    default:
                        return '"' + COARSRpc.dateToISO8601(value) + '"';
                }
            } else if (value instanceof Number || value instanceof String || value instanceof Boolean)
                return this.__toJSON(value.valueOf());
else {
                var useHasOwn = {}.hasOwnProperty ? true : false;
                var json = ['{'];
                for (var key in value) {
                    if (!useHasOwn || value.hasOwnProperty(key)) {
                        if (json.length > 1)
                            json.push(',');
                        json.push(this.__toJSON(key) + ':' + this.__toJSON(value[key]));
                    }
                }
                json.push('}');
                return json.join('');
            }
    }
    throw new TypeError('Unable to convert the value of type "' + typeof (value) + '" to JSON.');
};

COARSRpc.ServiceProxy.prototype.__evalJSON = function (json, sanitize) {
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
COARSRpc.ServiceProxy.prototype.__upgradeValuesFromJSON = function (obj) {
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

/*******************************************************************************************
* Other helper functions
******************************************************************************************/
//Takes an array or hash and coverts it into a query string, converting dates to ISO8601
//   and throwing an exception if nested hashes or nested arrays appear.
COARSRpc.toQueryString = function (params) {
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
                        str += encodeURIComponent(COARSRpc.dateToISO8601(params[key][i]));
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
                    str += encodeURIComponent(COARSRpc.dateToISO8601(params[key]));
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
COARSRpc.toArray = function (value) {
    if (value instanceof Array)
        return value;
    var array = [];
    for (var i = 0; i < value.length; i++)
        array.push(value[i]);
    return array;
    //}
    //throw Error("Unable to convert to an array the value: " + String(value));
};

//Returns an ISO8601 string *in UTC* for the provided date (Prototype's Date.toJSON() returns localtime)
COARSRpc.dateToISO8601 = function (date) {
    //var jsonDate = date.toJSON();
    //return jsonDate.substring(1, jsonDate.length-1); //strip double quotes
    return date.getUTCFullYear() + '-' + COARSRpc.zeroPad(date.getUTCMonth() + 1) + '-' + COARSRpc.zeroPad(date.getUTCDate()) + 'T' + COARSRpc.zeroPad(date.getUTCHours()) + ':' + COARSRpc.zeroPad(date.getUTCMinutes()) + ':' + COARSRpc.zeroPad(date.getUTCSeconds()) + '.' + COARSRpc.zeroPad(date.getUTCMilliseconds(), 3);
};

COARSRpc.zeroPad = function (value, width) {
    if (!width)
        width = 2;
    value = (value == undefined ? '' : String(value));
    while (value.length < width)
        value = '0' + value;
    return value;
};
//# sourceMappingURL=cloudAPI2.js.map
