(function(){
	
	function isMember(text) {
		var reg = new RegExp("[^\s ,.，0-9a-zA-Z\u4e00-\u9fa5]");
		if(reg.test(text)) {
			alert('请输入正确的分隔符号');
			return false;
		} else 
			return true;
	}

	function leftIn() {
		var parent = document.getElementById('box');
		var text =document.getElementById('textarea').value;
		if(isMember(text)) {
			text = text.split(/[\s\r\n、.,，]+/);
			for(var i in text) {
				if(/[^\s\r\n ]+/.test(text[i])) {
					var node = document.createElement('li');
					node.innerHTML = text[i];
					parent.insertBefore(node,parent.firstChild);					
				}
			}
		}
	}

	function rightIn() {
		var parent = document.getElementById('box');
		var text =document.getElementById('textarea').value;
		if(isMember(text)) {
			text = text.split(/[\s\r\n、.,，]+/);
			for(var i in text) {
				if(/[^\s\r\n ]+/.test(text[i])) {
					var node = document.createElement('li');
					node.innerHTML = text[i];
					parent.appendChild(node);					
				}
			}
		}
	}

	function leftOut() {
		var parent = document.getElementById('box');
		if(parent.hasChildNodes()) {
			parent.removeChild(parent.firstChild);
		} else {
			alert('队列为空');
		}
	}

	function rightOut() {
		var parent = document.getElementById('box');
		if(parent.hasChildNodes()) {
			parent.removeChild(parent.lastChild);
		} else {
			alert('队列为空');
		}
	}

	function search() {
		var text = document.getElementById('scon').value;
		if(text.length <= 0) 
			alert('请输入内容');
		else {
			var li = document.getElementsByTagName('li');
			var reg = new RegExp(text);
			for(var i=0;i < li.length ; i++) {
				if(reg.test(li[i].innerHTML))
					li[i].style.color = 'red';
				else 
					li[i].style.color = 'white';
			}
		}
	}

	document.getElementById('Lin').addEventListener('click',leftIn);
	document.getElementById('Rin').addEventListener('click',rightIn);
	document.getElementById('Lout').addEventListener('click',leftOut);
	document.getElementById('Rout').addEventListener('click',rightOut);
	document.getElementById('search').addEventListener('click',search);
})()
