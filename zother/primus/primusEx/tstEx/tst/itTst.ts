

asyncTest( 'insert', function() {
	console.log('insert')
	expect( 1 )

	var  msg:any = new Object()
	msg.email = 'aa@a.com'
	msg.pswd = 'aa'

    var c:CloudAPI  = new CloudAPI("fii72uq1as");
    c._baseServiceUrl1='http://localhost:8080/service/'

    c.insert('names', msg, _onRet )

	function _onRet(data_, err_):void {
		console.log('insert')
		ok( true, 'Passed and ready to resume' )
		start()//continue
	}

})


asyncTest( 'select', function() {
	console.log('select')
	expect( 1 )

	var  msg:any = new Object()
	msg.email = 'aa@a.com'
	msg.pswd = 'aa'

    var c:CloudAPI  = new CloudAPI("fii72uq1as");
    c._baseServiceUrl1='http://localhost:8080/service/'

    c.select('names', msg, _onRet)

	function _onRet(data_, err_):void {
		console.log('select')
		ok( true, 'Passed and ready to resume' )
		start()//continue
	}

})


/*
asyncTest( 'zipcodeFail', function() {
    console.log('should fail')
    expect( 1 )

    var  msg:any = new Object()
    msg.email = 'aa@a.com'

    var c= new CloudAPI()
    c._baseServiceUrl1='http://localhost:8080/service/'

    c._call("FAIL", msg, _onRet)

    function _onRet(data_, err_):void {
        console.log('fail')
        ok( true, 'Passed and ready to resume' )
        start()//continue
    }

})

 asyncTest( 'zipcode', function() {
     console.log('zipcode')
     expect( 1 )

     var c= new CloudAPI()
     c._baseServiceUrl1='http://localhost:8080/service/'
     c.zipCodeUSA(94107, _onRet )

     function _onRet(data_, err_):void {
         console.log('zipcode')
         ok( true, 'Passed and ready to resume' )
         start()//continue
    }

 })

asyncTest( 'nonCors', function() {
    console.log('nonCors')
    expect( 1 )

    var  msg:any = new Object()
    msg.Zipcode = 94107

    var c= new CloudAPI()
    c._baseServiceUrl1='http://localhost:8080/service/'
    c._call4('USAZipCode', msg, _onRet , null)

    function _onRet(data_):void {
        console.log(data_)
        ok( true, 'Passed and ready to resume' )
        start()//continue
    }

})
 */