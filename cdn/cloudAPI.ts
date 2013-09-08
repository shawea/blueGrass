
class CloudAPI {
    static ERROR:string = 'error_';
    static ARRAY:string = 'array_';

    static _INS:string ='ins';
    static _UP:string ='up';
    static _DEL:string ='del';
    static _SEL:string ='sel'; //select

    static PK:string ='id_';

    _baseServiceUrl1:string ='http://primusapi.net/service/';//'http://localhost:8080/service/'
    _secret_app_key:string;
    _auth_token:string;

    _sec:number=0;

    /**
     * When you create cloudAPI, you need to pass in the app key that you get from PrimusAPI.com
     * @param key
     */
    constructor(key:string) {
        this.setAppKey(key)
    }

    /**
     * Set the application key you get from PrimusAPI.com web site
     * @param key
     */
    setAppKey(key:string) {
        this._secret_app_key = key
        console.log('cloudAPI ready v1.903 ' + this._secret_app_key)
    }

    setAuthToken(tok:string) {
        this._auth_token = tok
    }

    clearAuthToken() {
        this._auth_token = null
    }

    /**
     * Returns last few rows based on with dateTime. You can kee going back.
     *
     * @param table_
     * @param startDateTime
     * @param count
     * @param cb_
     */
    prevRows(table_:string, startDateTime:number, count:number, cb_:any):void {
        var header:Object = new Object()
        header.table=table_
        if(!this._secret_app_key) {
            console.log('app key is not set')
            return
        }
        header.secret_app_key=this._secret_app_key
        var h:string = JSON.stringify(header)

        var msg = new Object()
        msg._daoc = startDateTime
        msg.count_ = count

        this._call('prevRows', msg, cb_, h)
    }

     _crud(table_:string, crud_enum_:string, nvp:any, cb_:any):void {
         var header:Object = new Object()
         header.table=table_
         header.crud_enum=crud_enum_
         if(!this._secret_app_key) {
            console.log('app key is not set')
            return
         }
         header.secret_app_key=this._secret_app_key

         var h:string = JSON.stringify(header)
         this._call('CRUD', nvp, cb_, h)
    }

    /**
     * Send an email
     * @param to
     * @param subject
     * @param body
     */
    mail(to:string,subject:string,body:string) {

        var header:Object = new Object()
        if(!this._secret_app_key) {
            console.log('app key is not set')
            return
        }

        header.secret_app_key=this._secret_app_key
        var h:string = JSON.stringify(header)

        var msg:Object = new Object()

        msg.to=to
        msg.subject=subject
        msg.body=body

        this._call('EMail',msg,null,h)
    }

    //step 2 to auth
    matchValidateCode(email:string, match_code, cb_:any) {
        var header:Object = new Object()
        if(!this._secret_app_key) {
            console.log('app key is not set')
            return
        }
        header.secret_app_key=this._secret_app_key
        header.aop_enum = 'validate_'

        var h:string = JSON.stringify(header)

        var msg:Object = new Object()
        msg.email=email
        msg.match_code=match_code

        this._call('auth', msg,  cb_, h)
    }

    // returns token
    login(email:string, pswd:string, cb_) {
        var header:Object = new Object()
        if(!this._secret_app_key) {
            console.log('app key is not set')
            return
        }
        header.secret_app_key=this._secret_app_key
        header.aop_enum = 'auth_'

        var h:string = JSON.stringify(header)

        var msg:Object = new Object()
        msg.email=email
        msg.pswd=pswd

        this._call('auth', msg,  cb_, h)
    }

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
    signUp( email:string, pswd:string, len:number, subject:string, body:string,
            args:Object, cb_:any) {
        var header:Object = new Object()
        if(!this._secret_app_key) {
            console.log('app key is not set')
            return
        }
        header.secret_app_key=this._secret_app_key
        header.aop_enum = 'signup_'

        var h:string = JSON.stringify(header)

        if(args==null || typeof args === 'undefined')
            args = new Object()

        args.email = email
        args.pswd =  pswd
        args.code_length = len
        args.body =  body
        args.subject = subject
        console.log(args)
        this._call('auth', args, cb_, h)
    }

     _call(srv:string, msg:Object, cb_:any, header_:string):void {// header is the app key
        //console.log(msg)

        if(!this._browserSupportsCors()) {
            this._call4(srv,msg,cb_,header_)
            return
        }

        var smsg:string = JSON.stringify(msg)

        //if (typeof XDomainRequest != 'undefined') { // for IE 9
        var req = new XMLHttpRequest()
        if(this._sec==1) // carefull what you ask for
            req.withCredentials=true

        var curl:string = this._baseServiceUrl1
             + srv + '?data='
             + smsg + '&header='
             + header_


         req.onerror = function() {
             console.log('There was an error!! ' + curl)
             console.log(this)
         }

        req.onload = function (ev) {  // returns error, array
            //console.log(this.readyState)
            if (this.readyState == 4) {
                var dat:String = this.response
                //console.log(dat)
                if (cb_ != null && dat != null && dat.length > 3) {
                    try {
                        //if(typeof ret != 'undefined' && typeof ret['error_'] != 'undefined' )
                        //   console.log(ret[CloudAPI.ERROR])

                        var ret = JSON.parse(dat)
                        setTimeout(function() {cb_(ret, ret['error_'])},1)
                    } catch (ex) {
                        console.log(dat)
                        console.log('JSON parse err ' + ex )
                        //console.log(curl)
                    }

                } else  {
                    if(cb_ != null) cb_()
                }

            }//fi
            console.log('.')
        }

         //console.log(curl)
         req.open('GET', curl, true)

         req.send('x')

     }//()


    _call4(srv:string, msg:any, callBack_:any, header_:string):void {// this is for old non-cors, jquery for now http://github.com/jquery/jquery/blob/master/src/ajax.js
        var dat = {
            data: JSON.stringify(msg)
            ,header: header_
        }
        console.log(4)
        //console.log(dat)

        var curl:string = this._baseServiceUrl1
            + srv + '?header='
            + header_

        $.ajax({                          //vic helped on a bug w/ this in jquery code
            url: curl+'&callback=?'
            ,dataType: 'jsonp'
            ,global: false
            ,context: this
            ,data: dat
            ,success: function(data_) {
                console.log('jback', JSON.stringify(data_))
                if (callBack_) {
                    callBack_(data_)
                }
            }
            ,error: function(xhr_, errorType_, error_) {
                console.log('jsonp error', xhr_, errorType_, error_)
            }//error
        })//ajax

    }//() _call4

    /**
     * A helper function that uses 'name' to get an object of form data
     * @param id
     * @returns {Object}
     */
    makeFormMessage(id:string):Object {
        var msg:Object = new Object()
        var form = $('#'+id).serializeArray()
        $.each(form, function() {
            if (msg[this.name]) {
                if (!msg[this.name].push) {
                    msg[this.name] = [msg[this.name]]
                }
                msg[this.name].push(this.value || '')
            } else {
                msg[this.name] = this.value || ''
            }
        })
        return msg
    }//()

    /**
     * Update a row
     * @param table_name
     * @param pk
     * @param updatedNVP
     * @param cb_
     */
    update( table_name:string, pk:string, updatedNVP:any, cb_):void {
        updatedNVP._id=pk
        this._crud(table_name, 'up', updatedNVP, cb_ )
    }//()

    /**
     * Delete a row by primary key
     * @param table_name
     * @param pk
     * @param cb_
     */
    del( table_name:string, pk:string, cb_):void {
        var nvp = new Object()
        nvp._id=pk
        this._crud(table_name, 'del', nvp, cb_ )
    }//()

    /**
     *
     * Insert a row
     *
     * @param table_name
     * @param nvp
     * @param cb_
     */
    insert( table_name:string, nvp:any, cb_):void {
        this._crud(table_name, 'ins', nvp, cb_ )
    }//()

    /**
     * Get data
     * @param table_name
     * @param nvp
     * @param cb_
     */
    select( table_name:string, nvp:any, cb_):void {
        this._crud(table_name, 'sel', nvp, cb_ )
    }//()

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
    selectRelation( table1:string, table2:string, nvp:any, field1:string, field2:string, cb_):void {

        var header:Object = new Object()

        header.secret_app_key=this._secret_app_key
        header.table = table1
        header.table2 = table2
        header.jfield_1= field1
        header.jfield_2= field2

        var h:string = JSON.stringify(header)
        this._call('Relational', nvp, cb_, h)
    }//()


    _browserSupportsCors():bool {
        if ('withCredentials' in new XMLHttpRequest())
            return true
        //else if (window.XDomainRequest)
        //  return true
        else
            return false
    }

    _createXHR()    {
        var xhr
        if (window.ActiveXObject)        {
            try            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
                alert(e.message);
                xhr = null;
            }
        }
        else        {
            xhr = new XMLHttpRequest();
        }

        return xhr;
    }


}//class
