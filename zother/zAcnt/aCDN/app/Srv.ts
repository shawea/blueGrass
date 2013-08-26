
class JoinLoginSrv {
    private app:App;
    constructor(app_:App) {
        this.app = app_
    }

    login(model:Object, cb:any) {
        this.app.cloudAPI._call('JoinLogin', model, cb ,null)
    }

    join(model:Object, cb:any) {
        this.app.cloudAPI._call('JoinLogin', model, cb,null)
    }
}

class AccountSrv {//Account services
    loginDat:Object;
    list:Array;
    row:Object;
    private app:App;

    constructor(app_:App) {
        this.app = app_
    }

    getApps(cb) {
        var msg:Object = new Object()
        msg.account_id = this.loginDat._id
        this.app.cloudAPI._call('ListApps', msg, cb,null)
    }

    getApp(name:string,cb) {
        var msg:Object = new Object()
        msg.app_name=name
        msg.account_id =  this.loginDat._id
        console.log(JSON.stringify(msg))
        this.app.cloudAPI._call('GetApp', msg, cb,null)
    }

    insertNew(name:string,cb) { //this.onRet.bind(this)
        var msg:Object = new Object()
        msg.account_id =  this.loginDat._id
        msg.app_name = name//
        $('#new_app').val('')
        this.app.cloudAPI._call('ListApps', msg, cb ,null)
    }

}
