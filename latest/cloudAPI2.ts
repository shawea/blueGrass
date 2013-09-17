declare var CORS;
class CloudAPI {

    static PK:string ='_id';

    _secret_app_key:string;
    _auth_token:string;
    _crud = new CORS('crud');

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
        console.log('cloudAPI ready v2.915 ' )
    }

    showSpinner(status){
        if (status)
            document.body.style.cursor = 'wait';
        else
            document.body.style.cursor = 'default';
    }

    setAuthToken(tok:string) {
        this._auth_token = tok
    }

    clearAuthToken() {
        this._auth_token = null
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


    /**
     * A helper function that uses 'name' to get an object of form data
     * @param id
     * @returns {Object}
     */
    makeFormObject(id:string):Object {
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
     * @param table_name
     * @param pk
     * @param obj new values
     */
   update( table_name:string, pk:string, obj:Object, cb:Function):void {
        obj.table=table_name
        obj._id = pk
        this._crud.callMethod('update', cb, obj, this._secret_app_key);
    }//()


    /**
     * @param table_name
     * @param pk
     */
    del( table_name:string, pk:string, cb:Function):void {
        var obj = new Object()
        obj.table=table_name
        obj._id = pk
        this._crud.callMethod('del', cb, obj, this._secret_app_key);
    }//()

    /**
     * @param table_name
     * @param object/cols ex: obj.first_name = 'Tom'
     * @returns pk
     */
    insert( table_name:string, obj:Object, cb:Function):string {
        obj.table=table_name
        this._crud.callMethod('insert', cb, obj, this._secret_app_key)
        //return result._id;
    }//()

    /**
     * @param table_name
     * @param obj
     * @returns Array [] ie, a list or rows
     */
    select( table_name:string, obj:Object, cb:Function):Array {
        if(!obj) var obj = new Object()
        obj.table=table_name
        this._crud.callMethod('select', cb, obj, this._secret_app_key)
        //return result.array_
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

}//class

document.write('<script src="http://scdn.primus.netdna-cdn.com/CORS.js"><\/script>');
