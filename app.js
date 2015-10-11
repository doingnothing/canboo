var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var mime = require('./mime.js');
var error = require('./error.js');
var db = require('./db.js');
var parse_cookies = function parse_cookies (cookie) {
	var cookies = {};
	if (cookie) {
		var list = cookie.split(';');
		for (var i = 0, len = list.length; i < len; i = i + 1) {
			var pair = list[i].split('=');
			cookies[pair[0].trim()] = pair[1];
		}
	}
	return cookies;
};
var handle_get = function handle_get (req, res) {
	var send = function (file_path) {
		fs.readFile('files/' + file_path, function (err, file) {
			if (err) {
				res.writeHead(200);
				res.end();
			} else {
				res.writeHead(200, {'Content-Type': mime.ext2mime[path.extname(file_path)]});
				res.end(file, 'utf8');
				console.log('send file: ' + file_path);
			}
		});
	};
	var pathname = url.parse(req.url).pathname;
	var filename;
	switch (pathname) {
	case '/':
		send('index.html');
		break;
	case '/read':
		var cookies = parse_cookies(req.headers.cookie);
		var query = url.parse(req.url, true).query;
		if (cookies['user'] && cookies['user'] !== '') {
			var sql = 'SELECT at FROM data WHERE username="' +
				cookies['user'] + '" AND id="' +
				query['id'] + '" LIMIT 1';
			db.query('SELECT', sql, function (err, rows) {
				var at;
				if (err) {
					console.log(err);
				}else if (rows.length > 0) {
					at = rows[0]['at'];console.log('1');
				} else {
					at = '0';
					fs.readFile('files/db/books.json', function (err, file) {
						if (err) {
							console.log(err);
						} else {
							var books = JSON.parse(file)['rows'];
							var subject;
							for (var i = 0, len = books.length; i < len; i = i + 1) {
								if (Number(query['id']) === books[i][0]) {
									subject = books[i][3];
									i = len;
								}
							}
							var sql = 'INSERT INTO data VALUES("' +
								cookies['user'] + '","' +
								query['id'] + '","' + subject + '","0","")';
							db.query('INSERT', sql, function (err, result) {
								if (err) {
									console.log(err)
								}
							});
						}
					});					
				}
				res.setHeader('Set-Cookie', ['id=' + query['id'] + '; Max-Age=' + 365*24*60*60 + '; ', 'at=' + at + '; Max-Age=' + 365*24*60*60 + '; ']);
				send('read.html');
			});
		} else {
			res.writeHead(301, {'Location': '/'});
			res.end();
		}
		break;
	case '/parameter':
		var cookies = parse_cookies(req.headers.cookie);
		var sql = 'SELECT parameter, subject FROM data WHERE username="' +
			cookies['user'] + '" AND id="' +
			cookies['id'] + '" LIMIT 1';
			console.log(sql);
		db.query('SELECT', sql, function (err, rows) {
			var to_data = {'parameter': null};
			if (err) {
				console.log(err);
			}
			if (rows[0]['parameter'] !== '') {
				console.log(JSON.stringify(rows[0]));
				to_data['parameter'] = JSON.parse(rows[0]['parameter']);
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(JSON.stringify(to_data));
			} else {
				var sql = 'SELECT parameter FROM data WHERE username="' +
					cookies['user'] + '" AND subject="' +
					rows[0]['subject'] + '"';
					console.log(sql);
				db.query('SELECT', sql, function (err, rows) {
					var to_data = {'parameter': null};
					if (err) {
						console.log(err);
					}
					for (var i = rows.length - 1; i >= 0; i = i - 1) {
						if (rows[i]['parameter'] !== '') {
							to_data['parameter'] = JSON.parse(rows[i]['parameter']);
							res.writeHead(200, {'Content-Type': 'application/json'});
							res.end(JSON.stringify(to_data));
							i = -2;
						}
					}
					if (i === -1) {
						var sql = 'SELECT parameter FROM data WHERE username="' +
							cookies['user'] + '"';
							console.log(sql);
						db.query('SELECT', sql, function (err, rows) {
							var to_data = {'parameter': null};
							if (err) {
								console.log(err);
							}
							for (var i = rows.length - 1; i >= 0; i = i - 1) {
								console.log(rows[i]['parameter']);
								if (rows[i]['parameter'] !== '') {
									to_data['parameter'] = JSON.parse(rows[i]['parameter']);
									i = -2;
								}
							}
							res.writeHead(200, {'Content-Type': 'application/json'});
							res.end(JSON.stringify(to_data));
						});
					}
				});
			}
		});
		break;
	case '/contents':
		var cookies = parse_cookies(req.headers.cookie);
		fs.readFile('files/books/' + cookies['id'] +　'/0.json', function (err, file) {
			if (err) {
				console.log(err);
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(file, 'utf8');
		});
		break;
	case '/list':
		var cookies = parse_cookies(req.headers.cookie);
		var sql = 'SELECT id FROM data WHERE username="' + cookies['user'] + '"';
		db.query('SELECT', sql, function (err, rows) {
			if (err) {
				console.log(err);
			}
			if (rows.length > 0) {
				fs.readFile('files/db/books.json', function (err, file) {
					var data = {'status': 'failed'};
					if (err) {
						console.log(err);
					} else {
						data['status'] = 'succeed';
						data['books'] = [];
						var books = JSON.parse(file)['rows'];
						for (var i = 0, len = rows.length; i < len; i = i + 1) {
							data['books'][i] = [];
							data['books'][i][0] = Number(rows[i]['id']);
							for (var j = 0, len1 = books.length; j < len1; j = j + 1) {
								if (books[j][0] === data['books'][i][0]) {
									data['books'][i][1] = books[j][1];
									j = len1;
								}
							}
						}
					}
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(data));
				});
			} else {
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(JSON.stringify({'status': 'failed'}), 'utf8');
			}
		});
		break;
	case '/category':
		fs.readFile('files/db/category.json', function (err, file) {
			if (err) {
				console.log(err);
				res.writeHead(200);
				res.end();
			} else {
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(file);
			}
		});
		break;
	default:
		send(pathname);
		break;
	}
};

var handle_post = function handle_post (req, res) {
	if (req.headers['content-type'].split(';')[0] === 'application/json') {
		// 只有当传输的是 json 数据时才进行处理
		var str = '';
		req.setEncoding('utf-8');
		req.on('data', function (chunk) {
			str = str + chunk;
		});
		req.on('end', function () {
			console.log('POST data: ' + str);
			var data = JSON.parse(str);
			var path = url.parse(req.url).pathname;
			switch (path) {
			case '/login':
				var sql = 'SELECT username FROM user WHERE ' +
					'username="' + data['username'] + '" AND ' +
					'password="' + data['password'] + '" LIMIT 1';
				db.query('SELECT', sql, function (err, rows) {
					var status = 'failed';
					if (err) {
						console.log(err);
					} else if (rows.length > 0) {
						console.log(data['username'] + ' logined.');
						status = 'succeed';
						res.setHeader('Set-Cookie', 'user=' + data['username'] + '; Max-Age=' + 65*24*60*60 + '; ');
					}
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end(status, 'utf8');
				});
				break;
			case '/register':
				var sql = 'SELECT username FROM user WHERE ' +
					'username="' + data['username'] + '" LIMIT 1';
				db.query('SELECT', sql, function (err, rows) {
					if (err) {
						console.log(err);
					} else if (rows.length === 0) {
						var sql = 'INSERT INTO user VALUES("' +
							data['username'] + '","' +
							data['password'] + '","' +
							new Date().toISOString() + '")';
						db.query('INSERT', sql, function (err, result) {
							var status = 'failed';
							if (err) {
								console.log(err);
							} else {
								console.log(data['username'] + ' registered.');
								status = 'succeed';
								res.setHeader('Set-Cookie', 'user=' + data['username'] + '; Max-Age=' + 365*24*60*60 + '; ');
							}
							res.writeHead(200, {'Content-Type': 'text/plain'});
							res.end(status, 'utf8');

						});
					} else {
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.end('failed', 'utf8');
					}
				});
				break;
			case '/books':
				if (data['subject'] !== '全部') {
					var sql = 'SELECT id, title, author, subject FROM books WHERE subject="' + data['subject'] + '" ORDER BY id ASC LIMIT ' + data['step'];
				} else {
					var sql = 'SELECT id, title, author, subject FROM books WHERE id >= "' + data['at'] + '" ORDER BY id ASC LIMIT ' + data['step'];
				}
				db.query('SELECT', sql, function (err, rows) {
					var to_data = {'status': 'failed', 'books': null};
					if (err) {
						console.log(err);
					} else if (rows.length > 0) {
						if (rows.length < Number(data['step'])) {
							to_data['status'] = 'nomore';
						} else {
							to_data['status'] = 'succeed';
						}
						to_data['books'] = rows;
						to_data['at'] = rows[rows.length - 1]['id'];
					}
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(to_data), 'utf8');
				});
				break;
			case '/at':
				var cookies = parse_cookies(req.headers.cookie);
				fs.readFile('files/books/' + cookies['id'] +　'/' + data['at'] + '.json', function (err, file) {
					if (err) {
						res.writeHead(200);
						res.end();
					} else {
						res.setHeader('Set-Cookie', 'at=' + data['at'] + '; Max-Age=' + 365*24*60*60 + '; ');
						res.writeHead(200, {'Content-Type': 'application/json'});
						res.end(file, 'utf8');
					}
					var sql = 'UPDATE data SET at="' + data['at'] + '" WHERE id="' + cookies['id'] + '" AND username="' + cookies['user'] + '"';
					db.query('UPDATE', sql, function (err) {
						if (err) {
							console.log(err);
						}
					});
				});
				break;
			case '/parameter':
				res.writeHead(200);
				res.end();
				var cookies = parse_cookies(req.headers.cookie);
				var sql = "UPDATE data SET parameter='" + str + "' WHERE id='" + cookies['id'] + "' AND username='" + cookies['user'] + "'";
				db.query('UPDATE', sql, function (err) {
					if (err) {
						console.log(err);
					}
				});
				break;
			}
		});
	} else {
		res.writeHead(415, {'Content-Type': 'text/html'});
		res.end(error.http(415));
	}
};

http.createServer(function (req, res) {
	console.log('request: ' + req.method + ' ' + req.url);
	switch (req.method) {
		case 'GET':
			handle_get(req, res);
			break;
		case 'POST':
			handle_post(req, res);
			break;
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');