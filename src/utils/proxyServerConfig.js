(function (exports) {
	Object.assign(exports, {
		LOCAL_SERVER: {
			HOST: '127.0.0.1',
			PORT: 80
		},

		REMOTE_SERVER: {
			HOST: 'www.rescuetime.com',
			PORT: 443
		}
	})
})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports);
