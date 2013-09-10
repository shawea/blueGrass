var JoinLoginSrv = (function () {
    function JoinLoginSrv(app_) {
        this.app = app_;
    }
    JoinLoginSrv.prototype.login = function (model, cb) {
        this.app.cloudAPI._call('JoinLogin', model, cb, null);
    };

    JoinLoginSrv.prototype.join = function (model, cb) {
        this.app.cloudAPI._call('JoinLogin', model, cb, null);
    };
    return JoinLoginSrv;
})();

var AccountSrv = (function () {
    function AccountSrv(app_) {
        this.app = app_;
    }
    AccountSrv.prototype.getApps = function (cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        this.app.cloudAPI._call('ListApps', msg, cb, null);
    };

    AccountSrv.prototype.getApp = function (name, cb) {
        var msg = new Object();
        msg.app_name = name;
        msg.account_id = this.loginDat._id;
        console.log(JSON.stringify(msg));
        this.app.cloudAPI._call('GetApp', msg, cb, null);
    };

    AccountSrv.prototype.insertNew = function (name, cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        msg.app_name = name;
        $('#new_app').val('');
        this.app.cloudAPI._call('ListApps', msg, cb, null);
    };
    return AccountSrv;
})();
//# sourceMappingURL=Api.js.map
