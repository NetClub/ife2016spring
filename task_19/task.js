(function(){

	var array = [],
		sort = document.getElementById('sort'),
		btn = document.getElementsByTagName('button'),
		Lin = btn[0],
		Rin = btn[1],
		Lout = btn[2],
		Rout = btn[3],
		rand = btn[4],
		start = btn[5];
		
	var domUtil = {

		leftIn : function(value) {
			var div = this.CreateNum(div,value);
			array.unshift(value);
			sort.insertBefore(div,sort.firstChild);
			console.log(array);
		},

		rightIn : function(value) {
			var div = this.CreateNum(div,value);
			array.push(value);
			sort.appendChild(div);
		},

		leftOut : function() {
			if(sort.firstChild != null ) {
				array.shift();
				sort.removeChild(sort.firstChild);
			} else {
				alert('已经没有数据移走啦!')
			}
		},

		rightOut : function() {
			if(sort.lastChild != null) {
				array.pop();
				sort.removeChild(sort.lastChild);
			} else {
				alert('已经没有数据移走啦!');
			}
		},

		randNum : function() {
			sort.innerHTML = null;
			array.length = 0;
			for(var i=0;i< 50;i++) {
				domUtil.rightIn(parseInt(Math.random() * 91 + 10));
			}
		},

		CreateNum : function(el,value) {
			el = document.createElement('div');
			el.style.height = value * 4 + 'px';
			return el;
		}
	};

	function BubbleSort(array) {
		var len = array.length;
		var i = 0;
		var j = 0;
		setInterval(run,30); 
		
	} 

                                                                                               
	Lin.onclick = function() {
		var value = parseInt(document.getElementById('num').value);
		/^([0-9]{1,2}|100)$/.test(value) ? domUtil.leftIn(value) : alert('请输入正确数值');
	}

	Rin.onclick = function () {
		var value = parseInt(document.getElementById('num').value);
		/^([0-9]{1,2}|100)$/.test(value) ? domUtil.rightIn(value) : alert('请输入正确数值');
	}


	Lout.onclick = domUtil.leftOut;
	Rout.onclick = domUtil.rightOut;
	rand.onclick = domUtil.randNum;



})();





