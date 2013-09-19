declare var CloudAPI;//jquery selector

asyncTest( 'join', function() {
	expect( 1 )

	var  msg:any = new Object()
	msg.email = 'aa@a.com'
	msg.pswd = 'aa'
	msg.pswd2 = 'aa'
	msg.full_name='Vic C'
	msg.level='u'


	new CloudAPI()._call('JoinLogin', msg, _onRet,null)

	function _onRet(data_):void {
		console.log(data_)
		ok( true, 'Passed, start next' )
		start()//continue
	}

})

asyncTest( 'login', function() {
	expect( 1 )

	var  msg:any = new Object()
	msg.email = 'aa@a.com'
	msg.pswd = 'aa'
	new CloudAPI()._call('JoinLogin', msg, _onRet,null)

	function _onRet(data_):void {
		console.log(data_)
		ok( true, 'Passed, start next' )
		start()//continue
	}

})


asyncTest( 'list apps', function() {
	expect( 1 )

	var  msg:any = new Object()
	msg.acc_key = '221juzyv17'

	var b=new CloudAPI()._call('Apps', msg, _onRet,null)

	function _onRet(data_):void {
		console.log(JSON.stringify(data_['array_']))
		ok( true, 'Passed, start next' )
		start()//continue
	}

})
