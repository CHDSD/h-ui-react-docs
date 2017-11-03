(function () {
	// 全局配置信息
	var contextPath = '/';
  var routeRootPath = '/';
	if (process.env.NODE_ENV === 'production') {
		contextPath = '/h-ui-react-docs';
    routeRootPath = '/h-ui-react-docs/';
	}

	var AppConf = {
		info: 'app configure',
		contextPath: contextPath,
    routeRootPath: routeRootPath,
	};
	window.AppConf = AppConf;

	hljs.configure({
		tabReplace: '  '
	});

})();