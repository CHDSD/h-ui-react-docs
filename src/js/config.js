(function () {
	// 全局配置信息
	
	var contextPath = '/';
	if (process.env.NODE_ENV === 'production') {
		contextPath = '/HONG-UI';
	}

	var appConf = {
		info: 'app configure',
		contextPath: contextPath
	};
	window.appConf = appConf;
})();