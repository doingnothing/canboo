var mysql = require('mysql');

var mysql_data = {
	host: 'qdm-049.hichina.com',
	user: 'qdm0490541',
	password: 'xcgssry850921',
	database: 'qdm0490541_db',
	insecureAuth: true,
};
var query = function query (method, sql, cb) {
	var connection = mysql.createConnection(mysql_data);
	connection.connect();
	switch (method) {
	case 'SELECT':
		connection.query(sql, function (err, rows) {
			if (err) {
				console.log(err);
				cb('SELECT ERROR!', null);
			} else {
				cb(null, rows);
			}
		});
		break;
	case 'INSERT':
		connection.query(sql, function (err, result) {
			if (err) {
				console.log(err);
				cb('INSERT ERROR!', null);
			} else {
				cb(null, result);
			}
		});
		break;
	case 'UPDATE':
		connection.query(sql, function (err) {
			if (err) {
				console.log(err);
				cb('UPDATE ERROR!');
			} else {
				cb(null);
			}
		});
		break;
	default:
		cb('METHOD ERROR!', null);
		break;
	}
	connection.end();
};
exports.query = query;