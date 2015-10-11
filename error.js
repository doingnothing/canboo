var http = {
	'head': '<html><head><meta charset="utf-8"><title>HTTP错误</title><style>h1{text-align: center;}</style></head><body><h1>',
	'foot': '</h1></body></html>',
	'404': '404 -- 文件找不到啦！',
	'415': '415 -- 不支持提交的数据格式！',
};
exports.http = function (code) {
	return http['head'] + http[String(code)] + http['foot'];
};
