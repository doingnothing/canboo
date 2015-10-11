'use strict';

var main = function main () {
	// 渲染参数
{
	var names = [
		'font-size',
		'line-height',
		'font-weight',

		// 颜色设置
		'font-color-l',
		'font-color-h',
		'font-color-s',
		'background-color-l',
		'background-color-h',
		'background-color-s',

		// 高级设置
		'text-shadow-left',
		'text-shadow-right',
		'text-shadow-top',
		'text-shadow-bottom',
		'text-shadow-blur',
		'text-shadow-color-l',
		'text-shadow-color-h',
		'text-shadow-color-s',
		'font-family-en',
		'font-family-zh',
	];
	var parameters = {
		'font-size': '16',
		'line-height': '22',
		'font-weight': 'normal',
		'font-color-l': '0',
		'font-color-h': '0',
		'font-color-s': '100',
		'background-color-l': '100',
		'background-color-h': '0',
		'background-color-s': '100',
		'text-shadow-left': '0',
		'text-shadow-right': '0',
		'text-shadow-top': '0',
		'text-shadow-bottom': '0',
		'text-shadow-blur': '0',
		'text-shadow-color-l': '50',
		'text-shadow-color-h': '0',
		'text-shadow-color-s': '100',
		'font-family-en': '',
		'font-family-zh': '',
	};

	var header_ele = document.getElementById('header');
	// 获取设置页面元素
	var set_page_ele = document.getElementById('set-page');
	// 获取效果展示元素
	var effect_ele = document.getElementById('effect');
	// 获取全文元素和引文元素
	var main_ele = document.getElementById('main');
	var cite_eles = document.getElementsByClassName('cite');	

	var colors = {
		'white': '#FFCCFF',
		'yellow': '#FFD800',
	};
	var border_styles = {
		'up': '#FFFFFF #888888 #888888 #FFFFFF',
		'down': '#888888 #FFFFFF #FFFFFF #888888',
	};
	// 设置字号、行距、粗细
	var font_size_ele = document.getElementById('font-size');
	var line_height_ele = document.getElementById('line-height');
	var font_weight_normal_ele = document.getElementById('font-weight-normal');
	var font_weight_bold_ele = document.getElementById('font-weight-bold');
	var output_font_size_ele = document.getElementById('output-font-size');
	var output_line_height_ele = document.getElementById('output-line-height');
	var max_font_size_ele = document.getElementById('max-font-size');
	var min_line_height_ele = document.getElementById('min-line-height');

	var change_font_size = function change_font_size () {
		parameters['font-size'] = font_size_ele.value;
		output_font_size_ele.value = parameters['font-size'];
		line_height_ele.min = parameters['font-size'];
		min_line_height_ele.value = parameters['font-size'];
		effect_ele.style.fontSize = parameters['font-size'] + 'px';
	};
	var change_line_height = function change_line_height () {
		parameters['line-height'] = line_height_ele.value;
		output_line_height_ele.value = parameters['line-height'] ;
		font_size_ele.max = parameters['line-height'];
		max_font_size_ele.value = parameters['line-height'];
		effect_ele.style.lineHeight = parameters['line-height'] + 'px';
	};
	var change_font_weight = function change_font_weight (weight) {
		var sub = function () {
			if (weight === 'normal') {
				font_weight_bold_ele.style.backgroundColor = colors['white'];
				font_weight_bold_ele.style.borderColor = border_styles['up'];
				font_weight_normal_ele.style.backgroundColor = colors['yellow'];
				font_weight_normal_ele.style.borderColor = border_styles['down'];
			} else if (weight === 'bold') {
				font_weight_normal_ele.style.backgroundColor = colors['white'];
				font_weight_normal_ele.style.borderColor = border_styles['up'];
				font_weight_bold_ele.style.backgroundColor = colors['yellow'];
				font_weight_bold_ele.style.borderColor = border_styles['down'];
			}
			parameters['font-weight'] = weight;
			effect_ele.style.fontWeight = parameters['font-weight'];
		};
		return sub;
	};

	font_size_ele.addEventListener('change', change_font_size, false);
	font_size_ele.addEventListener('mousemove', change_font_size, false);
	line_height_ele.addEventListener('change', change_line_height, false);
	line_height_ele.addEventListener('mousemove', change_line_height, false);
	font_weight_normal_ele.addEventListener('mousedown', change_font_weight('normal'), false);
	font_weight_bold_ele.addEventListener('mousedown', change_font_weight('bold'), false);
	
	
	// 文字、背景颜色
	var color_hsl = ['color-l', 'color-h', 'color-s'];
	var flag = 0; // 表示当前设置的颜色对象：0 为文字颜色，1 为背景颜色

	var font_color_ele = document.getElementById('font-color');
	var background_color_ele = document.getElementById('background-color');
	var color_eles = [];
	var output_color_eles = [];
	for (var i = 0; i < 3; i = i + 1) {
		color_eles[i] = document.getElementById(color_hsl[i]);
		output_color_eles[i] = document.getElementById('output-' + color_hsl[i]);
	}

	var change_color = function chage_color () {
		if (flag === 0) {
			for (var i = 0; i < 3; i = i + 1) {
				parameters['font-' + color_hsl[i]] = color_eles[i].value;
				output_color_eles[i].value = parameters['font-' + color_hsl[i]];
			}
			effect_ele.style.color = 'hsl(' +
				parameters['font-color-h'] + ',' +
				parameters['font-color-s'] + '%,' +
				parameters['font-color-l'] + '%)';
		} else {
			for (var i = 0; i < 3; i = i + 1) {
				parameters['background-' + color_hsl[i]] = color_eles[i].value;
				output_color_eles[i].value = parameters['background-' + color_hsl[i]];
			}
			effect_ele.style.backgroundColor = 'hsl(' +
				parameters['background-color-h'] + ',' +
				parameters['background-color-s'] + '%,' +
				parameters['background-color-l'] + '%)';
		}
	};
	var change_font_color = function chage_font_color () {
		flag = 0;
		background_color_ele.style.backgroundColor = colors['white'];
		background_color_ele.style.borderColor = border_styles['up'];
		font_color_ele.style.backgroundColor = colors['yellow'];
		font_color_ele.style.borderColor = border_styles['down'];
		for (var i = 0; i < 3; i = i + 1) {
			color_eles[i].value = parameters['font-' + color_hsl[i]];
			output_color_eles[i].value = parameters['font-' + color_hsl[i]];
		}
	};
	var change_background_color = function change_background_color() {
		flag = 1;
		font_color_ele.style.backgroundColor = colors['white'];
		font_color_ele.style.borderColor = border_styles['up'];
		background_color_ele.style.backgroundColor = colors['yellow'];
		background_color_ele.style.borderColor = border_styles['down'];
		for (var i = 0; i < 3; i = i + 1) {
			color_eles[i].value = parameters['background-' + color_hsl[i]];
			output_color_eles[i].value = parameters['background-' + color_hsl[i]];
		}
	};

	for (var i = 0; i < 3; i = i + 1) {
		color_eles[i].addEventListener('change', change_color, false);
		color_eles[i].addEventListener('mousemove', change_color, false);
	}
	font_color_ele.addEventListener('click', change_font_color, false);
	background_color_ele.addEventListener('click', change_background_color, false);

	// 高级设置
	var is_show = 0; // 表示是否显示高级设置面板，0 为不显示，1为显示

	var advance_set_ele = document.getElementById('advance-set');
	var advance_panel_ele = document.getElementById('advance-panel');

	advance_set_ele.addEventListener('click', function () {
		if (is_show === 0) {
			is_show = 1;
			advance_set_ele.style.backgroundImage = img_url('sub', '18*18');
			advance_panel_ele.style.display = 'block';
		} else if (is_show === 1) {
			is_show = 0;
			advance_set_ele.style.backgroundImage = img_url('add', '18*18');
			advance_panel_ele.style.display = 'none';
		}
	}, false);

	// 高级设置---文字阴影
	var text_shadows = [
		'text-shadow-left',
		'text-shadow-right',
		'text-shadow-top',
		'text-shadow-bottom',
		'text-shadow-blur',
		'text-shadow-color-h',
		'text-shadow-color-s',
		'text-shadow-color-l',
	];
	var text_shadow_eles = [];
	var output_text_shadow_eles = [];

	var change_text_shadow = function change_text_shadow (n) {
		var sub = function () {
			parameters[text_shadows[n]] = text_shadow_eles[n].value;
			output_text_shadow_eles[n].value = parameters[text_shadows[n]];
			if (parameters['text-shadow-left'] !== '0' ||
				parameters['text-shadow-right'] !== '0' ||
				parameters['text-shadow-top'] !== '0' ||
				parameters['text-shadow-bottom'] !== '0' ||
				parameters['text-shadow-blur'] !== '0') {
				var temp = parameters['text-shadow-blur'] + 'px hsl(' +
					parameters['text-shadow-color-h'] + ',' +
					parameters['text-shadow-color-s'] + '%,' +
					parameters['text-shadow-color-l'] + '%)';
				effect_ele.style.textShadow = 
					parameters['text-shadow-right'] + 'px ' +
					parameters['text-shadow-top'] + 'px ' + temp + ',' +
					parameters['text-shadow-right'] + 'px ' +
					parameters['text-shadow-bottom'] + 'px ' + temp + ',' +
					parameters['text-shadow-left'] + 'px ' +
					parameters['text-shadow-top'] + 'px ' + temp + ',' +
					parameters['text-shadow-left'] + 'px ' +
					parameters['text-shadow-bottom'] + 'px ' + temp;
			} else {
				effect_ele.style.textShadow = '';
			}
		};
		return sub;
	};

	for (var i = 0; i < 8; i = i + 1) {
		// 获取元素对象
		text_shadow_eles[i] = document.getElementById(text_shadows[i]);
		output_text_shadow_eles[i] = document.getElementById('output-' + text_shadows[i]);
		// 添加事件
		text_shadow_eles[i].addEventListener('change', change_text_shadow(i), false);
		text_shadow_eles[i].addEventListener('mousemove', change_text_shadow(i), false);
	}

	// 高级设置---字体
	var font_family_en = document.getElementById('font-family-en');
	var font_family_zh = document.getElementById('font-family-zh');
	
	var change_font_family = function change_font_family () {
		var temp = '';
		if (parameters['font-family-en'] !== '') {
			temp = parameters['font-family-en'];
		}
		if (parameters['font-family-zh'] !== '') {
			if (temp !== '') {
				temp = temp + ',' + parameters['font-family-zh'];
			} else {
				temp = parameters['font-family-zh'];
			}
		}
		effect_ele.style.fontFamily = temp;
	};

	font_family_en.addEventListener('change', function () {
		parameters['font-family-en'] = font_family_en.value;
		change_font_family();
	}, false);
	font_family_zh.addEventListener('change', function () {
		parameters['font-family-zh'] = font_family_zh.value;
		change_font_family();
	}, false);

	// 渲染，将渲染参数对元素渲染一遍
	var rendering = function rendering (ele) {
		ele.style.fontSize = parameters['font-size'] + 'px';
		ele.style.lineHeight = parameters['line-height'] + 'px';
		ele.style.fontWeight = parameters['font-weight'];
		ele.style.color = 'hsl(' +
			parameters['font-color-h'] + ',' +
			parameters['font-color-s'] + '%,' +
			parameters['font-color-l'] + '%)';
		ele.style.backgroundColor = 'hsl(' +
			parameters['background-color-h'] + ',' +
			parameters['background-color-s'] + '%,' +
			parameters['background-color-l'] + '%)';
		header_ele.style.backgroundColor = 	ele.style.backgroundColor;	

		if (parameters['text-shadow-left'] !== '0' ||
			parameters['text-shadow-right'] !== '0' ||
			parameters['text-shadow-top'] !== '0' ||
			parameters['text-shadow-bottom'] !== '0' ||
			parameters['text-shadow-blur'] !== '0') {
			var temp = parameters['text-shadow-blur'] + 'px hsl(' +
				parameters['text-shadow-color-h'] + ',' +
				parameters['text-shadow-color-s'] + '%,' +
				parameters['text-shadow-color-l'] + '%)';
			ele.style.textShadow = 
				parameters['text-shadow-right'] + 'px ' +
				parameters['text-shadow-top'] + 'px ' + temp + ',' +
				parameters['text-shadow-right'] + 'px ' +
				parameters['text-shadow-bottom'] + 'px ' + temp + ',' +
				parameters['text-shadow-left'] + 'px ' +
				parameters['text-shadow-top'] + 'px ' + temp + ',' +
				parameters['text-shadow-left'] + 'px ' +
				parameters['text-shadow-bottom'] + 'px ' + temp;
		} else {
			ele.style.textShadow = '';
		}
		var temp = '';
		if (parameters['font-family-en'] !== '') {
			temp = parameters['font-family-en'];
		}
		if (parameters['font-family-zh'] !== '') {
			if (temp !== '') {
				temp = temp + ',' + parameters['font-family-zh'];
			} else {
				temp = parameters['font-family-zh'];
			}
		}
		ele.style.fontFamily = temp;
		main_ele.style.textIndent = (2 * Number(parameters['font-size'])) + 'px';
	};

	// 初始化设置面板的值，使之
	var init = function init () {
		font_size_ele.value = parameters['font-size']; // 字号
		output_font_size_ele.value = parameters['font-size'];
		min_line_height_ele.value = parameters['font-size'];
		line_height_ele.min = parameters['font-size'];

		line_height_ele.value = parameters['line-height']; // 行距
		output_line_height_ele.value = parameters['line-height'];
		max_font_size_ele.value = parameters['line-height'];
		font_size_ele.max = parameters['line-height'];

		if (parameters['font-weight'] === 'normal') {
			font_weight_normal_ele.style.backgroundColor = colors['yellow'];
			font_weight_normal_ele.style.borderColor = border_styles['down'];
			font_weight_bold_ele.style.backgroundColor = colors['white'];
			font_weight_bold_ele.style.borderColor = border_styles['up'];
		} else if (parameters['font-weight'] === 'bold') {
			font_weight_bold_ele.style.backgroundColor = colors['yellow'];
			font_weight_bold_ele.style.borderColor = border_styles['down'];
			font_weight_normal_ele.style.backgroundColor = colors['white'];
			font_weight_normal_ele.style.borderColor = border_styles['up'];
		}

		font_color_ele.style.backgroundColor = colors['yellow']; // 默认设置文字颜色
		font_color_ele.style.borderColor = border_styles['down'];
		background_color_ele.style.backgroundColor = colors['white'];
		background_color_ele.style.borderColor = border_styles['up'];
		flag = 0; // 将 flag 设置为 1，表示当前默认设置文字颜色
		for (var i = 0; i < 3; i = i + 1) {
			color_eles[i].value = parameters['font-' + color_hsl[i]];
			output_color_eles[i].value = parameters['font-' + color_hsl[i]];
		}

		// 文字阴影
		for (var i = 0; i < 8; i = i + 1) {
			text_shadow_eles[i].value = parameters[text_shadows[i]];
			output_text_shadow_eles[i].value = parameters[text_shadows[i]];
		}
		font_family_en.value = parameters['font-family-en'];
		font_family_zh.value = parameters['font-family-zh'];
	};

	// 回退、前进、应用、退出
	// 回退、前进功能，最多存 50 次
	var MAX = 50;
	var undos = []; // 存放最后 50 次的参数
	var count = 0; // 表示当前存放的参数个数和下一次插入渲染参数的位置
	var index = 0; // 当前正在使用的渲染参数
	
	var undo_ele = document.getElementById('undo');
	var todo_ele = document.getElementById('todo');
	var apply_ele = document.getElementById('apply');
	var exit_ele = document.getElementById('exit');

	// 将参数压入存储器
	var push_parameters = function push_parameters () {
		// 当前存储的渲染参数超过了 50 个，这去除最早的参数，并向前移动
		if (count >= MAX) {
			for (var i = 0; i < MAX - 1; i = i + 1) {
				undos[i] = undos[i + 1];
			}
			count = MAX - 1;
		}
		index = count;
		undos[count] = {};
		for (var i = 0, len = names.length; i < len; i = i + 1) {
			undos[count][names[i]] = parameters[names[i]];
		}
		count = count + 1;
		if (index <= 0) {
			undo_ele.style.backgroundImage = img_url('left_arrow_gray', '38*16');
		} else {
			undo_ele.style.backgroundImage = img_url('left_arrow_black', '38*16');
		}
		if (index >= count - 1) {
			todo_ele.style.backgroundImage = img_url('right_arrow_gray', '38*16');
		} else {
			todo_ele.style.backgroundImage = img_url('right_arrow_black', '38*16');
		}
	};
	var undo = function undo () {
		if (index >= 1) {
			index = index - 1;
			for (var i = 0, len = names.length; i < len; i = i + 1) {
				parameters[names[i]] = undos[index][names[i]];
			}
			rendering(effect);
			init();
			if (index <= 0) {
				undo_ele.style.backgroundImage = img_url('left_arrow_gray', '38*16');;
			}
			todo_ele.style.backgroundImage = img_url('right_arrow_black', '38*16');
		}
	};
	var todo = function todo () {
		if (index <= count - 2) {
			index = index + 1;
			for (var i = 0, len = names.length; i < len; i = i + 1) {
				parameters[names[i]] = undos[index][names[i]];
			}
			rendering(effect_ele);
			init();
			if (index >= count - 1) {
				todo_ele.style.backgroundImage = img_url('right_arrow_gray', '38*16');
			}
			undo_ele.style.backgroundImage = img_url('left_arrow_black', '38*16');
		}
	};

	undo_ele.addEventListener('click', undo, false);
	todo_ele.addEventListener('click', todo, false);
	apply_ele.addEventListener('click', function () {
		if (index < count - 1) {
			count = index + 1;
		}
		push_parameters();
		rendering(main_ele);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/parameter', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function () {};
		xhr.send(JSON.stringify(parameters));
		main_ele.style.textIndent = (2 * Number(parameters['font-size'])) + 'px';
	}, false);
	exit_ele.addEventListener('click', function () {
		menu_eles[0].style.display = 'none';
	}, false);

	// 获取菜单按钮和选项元素
	var menu_ids = [
		'render', // [0]渲染选项
		'contents', // [1]目录选项
		'detail', // [2]图书详情选项
		'account', // [3]账号选项
	];

	var menu_btn = document.getElementById('menu-btn');
	var menu_ele = document.getElementById('menu');
	var book_title_ele = document.getElementById('book-title');
	var page_number_ele = document.getElementById('page-number');
	var book_list_ele = document.getElementById('book-list');
	var menu_btn_eles = [];
	var menu_eles = [];

	for (var i = 0, len = menu_ids.length; i < len; i = i + 1) {
		menu_btn_eles[i] = document.getElementById(menu_ids[i] + '-btn');
		menu_btn_eles[i].style.backgroundImage = img_url(menu_ids[i] + '-btn', '36*20');
		menu_eles[i] = document.getElementById(menu_ids[i]);
	}
	menu_btn_eles[0].addEventListener('click', function () {
		menu_eles[0].style.display = 'block';
		menu_ele.style.display = 'none';
		menu_eles[1].style.display = 'none';
		menu_eles[2].style.display = 'none';
		menu_eles[3].style.display = 'none';
	}, false);
	menu_btn.addEventListener('click', function () {
		if (menu_ele.style.display === 'none') {
			menu_ele.style.display = 'block';
		} else {
			menu_ele.style.display = 'none';
			menu_eles[1].style.display = 'none';
			menu_eles[2].style.display = 'none';
			menu_eles[3].style.display = 'none';
		}
	}, false);
	menu_eles[1].style.display = 'none';
	menu_btn_eles[1].addEventListener('click', function () {
		if (menu_eles[1].style.display === 'none') {
			menu_eles[1].style.display = 'block';
			menu_eles[2].style.display = 'none';
			menu_eles[3].style.display = 'none';
		} else {
			menu_eles[1].style.display = 'none';
		}
	}, false);
	menu_eles[2].style.display = 'none';
	menu_btn_eles[2].addEventListener('click', function () {
		if (menu_eles[2].style.display === 'none') {
			menu_eles[2].style.display = 'block';
			menu_eles[1].style.display = 'none';
			menu_eles[3].style.display = 'none';
		} else {
			menu_eles[2].style.display = 'none';
		}
	}, false);
	menu_eles[3].style.display = 'none';
	menu_btn_eles[3].addEventListener('click', function () {
		if (menu_eles[3].style.display === 'none') {
			menu_eles[3].style.display = 'block';
			menu_eles[1].style.display = 'none';
			menu_eles[2].style.display = 'none';
		} else {
			menu_eles[3].style.display = 'none';
		}
	}, false);
	main_ele.addEventListener('click', function () {
		menu_ele.style.display = 'none';
		menu_eles[1].style.display = 'none';
		menu_eles[2].style.display = 'none';
		menu_eles[3].style.display = 'none';
	}, false);
}
	// 初始化
	push_parameters(); // 将初始的参数压入
	 // 和参数内容统一
	menu_btn.style.backgroundImage = img_url('menu', '40*24');
	menu_ele.style.display = 'none'; // 隐藏菜单选项
	advance_set_ele.style.backgroundImage = img_url('add', '18*18');
	undo_ele.style.backgroundImage = img_url('left_arrow_gray', '38*16');
	todo_ele.style.backgroundImage = img_url('right_arrow_gray', '38*16');
	apply_ele.style.backgroundImage = img_url('apply', '40*24');
	exit_ele.style.backgroundImage = img_url('exit', '40*24');

	var index_content = {};
	var get_content = function get_content (at) {
		var sub = function () {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/at', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText);
					page_number_ele.replaceChild(document.createTextNode(at), page_number_ele.firstChild);
					var div = document.createElement('div');
					var h1 = document.createElement('h1');
					h1.appendChild(document.createTextNode(index_content[at]));
					div.appendChild(h1);
					var p;
					for (var i = 0, len = data.length; i < len; i = i + 1) {
						p = document.createElement('p');
						p.appendChild(document.createTextNode(data[i]));
						div.appendChild(p);
					}
					main_ele.replaceChild(div, main_ele.firstChild);
				}
			};
			xhr.send(JSON.stringify({'at': at}));
		};
		return sub;
	};
	var add_list = function add_list () {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/list', true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				if (data['status'] === 'succeed') {
					var books = data['books'];
					var ul = document.createElement('ul');
					var li, a;
					for (var i = 0, len = books.length; i < len; i = i + 1) {
						li = document.createElement('li');
						a = document.createElement('a');
						a.href = 'read?id=' + books[i][0];
						a.appendChild(document.createTextNode(books[i][1]));
						li.appendChild(a);
						ul.appendChild(li);
					}
					book_list_ele.replaceChild(ul, book_list_ele.firstChild);
				}
			}
		};
		xhr.send(null);
	};
	var get_parameter = function get_parameter () {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/parameter', true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				if (data['parameter']) {
					parameters = data['parameter'];
				}
				rendering(main_ele);
				rendering(effect_ele);
				init();
				add_list();
			}
		};
		xhr.send(null);
	};
	var create_contents = function create_contents (indexs, contents) {
		var ul = document.createElement('ul');
		var li;
		for (var i = 0, len = contents.length; i < len; i = i + 1) {
			li = document.createElement('li');
			if (Array.isArray(contents[i])) {
				li.appendChild(create_contents(indexs[i], contents[i]));
			} else {
				li.appendChild(document.createTextNode(contents[i]));
				li.addEventListener('click', get_content(indexs[i]), false);
				index_content[indexs[i]] = contents[i];
			}
			ul.appendChild(li);
		}
		return ul;
	};
	var cookies = {};
	if (document.cookie) {
		var list = document.cookie.split(';');
		for (var i = 0, len = list.length; i < len; i = i + 1) {
			var pair = list[i].split('=');
			cookies[pair[0].trim()] = pair[1];
		}
	}
	if (cookies['id']) {
		// 获取目录
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/contents', true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				menu_eles[1].appendChild(create_contents(data['index'], data['contents']));
				var frag = document.createDocumentFragment();
				var p, strong;
				for (var i = 0, len = data['meta'].length; i < len; i = i + 1) {
					p = document.createElement('p');
					strong = document.createElement('strong');
					strong.appendChild(document.createTextNode(data['meta'][i]));
					p.appendChild(strong);
					p.appendChild(document.createElement('br'));
					if (Array.isArray(data['data'][i])) {
						for (var j = 0, len1 = data['data'][i].length; j < len1; j = j + 1) {
							p.appendChild(document.createTextNode(data['data'][i][j]));
							p.appendChild(document.createElement('br'));
							p.appendChild(document.createElement('br'));
						}
					} else {
						p.appendChild(document.createTextNode(data['data'][i]));
					}
					frag.appendChild(p);
				}
				document.title = data['data'][0];
				menu_eles[2].appendChild(frag);
				book_title_ele.appendChild(document.createTextNode(data['data'][0]));
				book_title_ele.setAttribute('title', data['data'][0]);
				if (cookies['at'] && cookies['at'] !== '0') {
					get_content(cookies['at'])();
				} else {
					var div = document.createElement('div');
					var p;
					for (var i = 0, len = data['meta'].length; i < len; i = i + 1) {
						if (data['meta'][i] === '介绍' || data['meta'][i] === '内容简介') {
							p = document.createElement('p');
							strong = document.createElement('strong');
							strong.appendChild(document.createTextNode(data['meta'][i]));
							p.appendChild(strong);
							div.appendChild(p);
							if (Array.isArray(data['data'][i])) {
								for (var j = 0, len1 = data['data'][i].length; j < len1; j = j + 1) {
									p = document.createElement('p');
									p.appendChild(document.createTextNode(data['data'][i][j]));
									div.appendChild(p);
								}
							} else {
								p = document.createElement('p');
								p.appendChild(document.createTextNode(data['data'][i]));
								div.appendChild(p);
							}
						}
					}
					main_ele.replaceChild(div, main_ele.firstChild);
				}
				get_parameter();
			}
		};
		xhr.send(null);
	}
};
document.addEventListener('DOMContentLoaded', main, false);