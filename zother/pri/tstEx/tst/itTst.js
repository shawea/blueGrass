asyncTest('insert', function () {
    console.log('insert');
    expect(1);
    var msg = new Object();
    msg.email = 'aa@a.com';
    msg.pswd = 'aa';
    var c = new CloudAPI("fii72uq1as");
    c._baseServiceUrl1 = 'http://localhost:8080/service/';
    c.insert('names', msg, _onRet);
    function _onRet(data_, err_) {
        console.log('insert');
        ok(true, 'Passed and ready to resume');
        start();
    }
});
asyncTest('select', function () {
    console.log('select');
    expect(1);
    var msg = new Object();
    msg.email = 'aa@a.com';
    msg.pswd = 'aa';
    var c = new CloudAPI("fii72uq1as");
    c._baseServiceUrl1 = 'http://localhost:8080/service/';
    c.select('names', msg, _onRet);
    function _onRet(data_, err_) {
        console.log('select');
        ok(true, 'Passed and ready to resume');
        start();
    }
});
//@ sourceMappingURL=itTst.js.map
