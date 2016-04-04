window.onload = function() {
	(function() {

		//浏览器事件兼容
		var EventUtil = {
			addHandler : function(el,type,handler) {
				el.addEventListener ? el.addEventListener(type,handler,false) :
										el.attachEvent('on' + type,handler);
			},
			removeHandler : function(el,type,handler) {
				el.removeEventListener ? el.removeEventListener(type,handler,false) :
										el.detachEvent('on' + type,handler);
			}
		};

		//点击删除事件
		function dele(event) {
			var e = event || window.event;
			if(e.target.tagName.toLowerCase() == 'li') {
				var index = e.target.getAttribute('data-index');
				this.removeChild(this.childNodes[index]);
			}
		}

		//使用构造函数模式和原型链构造对象
		function nodeObj(container) {		
			this.array = [];
			this.paint = function() {
				var str = this.array.reduce(function(previous,current){
					return previous + '<li>'+current+'</li>';
				},'');

				container.innerHTML = str;
			}
		}

		nodeObj.prototype = {
			leftIn : function(str) {
				this.array.unshift(str);
			},

			rightIn : function(str) {
				this.array.push(str);
			},

			leftOut : function() {
				this.array.shift();
			},

			rightOut : function() {
				this.array.pop();
			},

			dele : function() {
				
			}
		}

		function updateHobby() {
			var hobby = textarea.value;
			hobby = hobby.split(/[\r\n\s ,.，]+/)
							.map(function(a) {return a;})
								.forEach(function(value) {
									if(hobbyList.array.indexOf(value) === -1) {
										hobbyList.rightIn(value);
										if(hobbyList.array.length > 10)
											hobbyList.leftOut();
									}
								});
			hobbyList.paint();
		}

		function updateTag(event) {
			var e = event || window.event;
			if(/^[\r\n\s ,.，]/.test(tag.value)) {
				tag.value = null;
			}
			if(/[\r\n\s ,.，]+/.test(tag.value) || e.keyCode ===13) {
				var value = tag.value.match(/[^\r\n\s ,.，]+/)[0];		//注意match返回的是数组
				if(tagList.array.indexOf(value) === -1){
					tagList.rightIn(value);
					if(tagList.array.length > 10)
						tagList.leftOut();
				}
				tagList.paint();
				tag.value = null;
			}
		}

		//下面开始装逼了！
		var tagBox = document.getElementById('tag-box'),
			hobbyBox = document.getElementById('hobby-box'),
			insert = document.getElementById('insert'),
			tag = document.getElementById('tag'),
			textarea = document.getElementById('textarea'),
			tagList = new nodeObj(tagBox), 
			hobbyList = new nodeObj(hobbyBox);

		
			EventUtil.addHandler(insert,'click',updateHobby);
			EventUtil.addHandler(tag,'keyup',updateTag);
	})();
}