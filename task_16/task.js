/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var city = document.getElementById('aqi-city-input');
var quality = document.getElementById('aqi-value-input');
var confirm = document.getElementById('add-btn');
var tips = document.getElementsByTagName('span'); //提示框
var ul = document.getElementById('aqi-table');
var del = document.getElementsByClassName('del');
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var reg = /^[a-zA-Z\u4E00-\u9FA5]*$/;
	c = trim(city.value);
	q = quality.value;
	var c = trim(city.value);
	var q = quality.value;
	if (!reg.test(c)) {
		tips[0].innerHTML = '城市名称填写不合理';
		city.value = null;
		return false;
	}
	if (!(parseInt(q) == q)) {
		tips[1].innerHTML = '空气质量必须为整数';
		quality.value = null;
		return false;
	}
	aqiData[c] = q;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var li = '<li><span>城市</span><span>空气质量</span> <span>操作</span></li>';
	for (var i in aqiData) li += '<li><span class="city">' + i + '</span><span class="value">' + aqiData[i] + '</span><button class="del" data-role=' + i + ' >删除</button></li>';
	ul.innerHTML = li;
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	delete aqiData[city];
	renderAqiList();
}

function init() {
	confirm.onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	ul.onmouseover = function () {
		for (var i in del) del[i].onclick = function () {
			delBtnHandle(this.getAttribute('data-role'));
		}
	}
}

function trim(str) {
	return str.replace(/\s*/g, '');
}
init();
