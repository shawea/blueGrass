asyncTest('join', function () {
    expect(1);
    var msg = new Object();
    msg.email = 'aa@a.com';
    msg.pswd = 'aa';
    msg.pswd2 = 'aa';
    msg.full_name = 'Vic C';
    msg.level = 'u';
    new CloudAPI()._call('JoinLogin', msg, _onRet, null);
    function _onRet(data_) {
        console.log(data_);
        ok(true, 'Passed, start next');
        start();
    }
});
asyncTest('login', function () {
    expect(1);
    var msg = new Object();
    msg.email = 'aa@a.com';
    msg.pswd = 'aa';
    new CloudAPI()._call('JoinLogin', msg, _onRet, null);
    function _onRet(data_) {
        console.log(data_);
        ok(true, 'Passed, start next');
        start();
    }
});
asyncTest('list apps', function () {
    expect(1);
    var msg = new Object();
    msg.acc_key = '221juzyv17';
    var b = new CloudAPI()._call('Apps', msg, _onRet, null);
    function _onRet(data_) {
        console.log(JSON.stringify(data_['array_']));
        ok(true, 'Passed, start next');
        start();
    }
});
//@ sourceMappingURL=accountTst.js.map
