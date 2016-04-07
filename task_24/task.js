(function() {
    var timer = null;
    var stack = [];
    var click_node = null;

    var EventUtil = {
        addHandler: function(el, type, handler) {
            el.addEventListener ? el.addEventListener(type, handler, false) :
                el.attachEvent('on' + type, handler);
        },
        removeHandler: function(el, type, handler) {
            el.removeEventListener ? el.removeEventListener(type, handler, false) :
                el.detachEvent('on' + type, handler);
        }
    };

    function DFS(node) {
        if (node != null) {
            stack.push(node);
            for (var i = 0; i < node.children.length; i++) {
                DFS(node.children[i]);
            }
        }
    }

    function BFS(node) {
        var queue = [];
        queue.push(node);
        while (queue.length > 0) {
            count = 0;
            queue.forEach(function(node) {
                for (var i = 0; i < node.children.length; i++)
                    queue.push(node.children[i]);
                count++;
            });
            stack = stack.concat(queue.splice(0, count));
        }
    }

    function animate() {
        var temp = stack;
        count = 0,
            argu = arguments[0];
        flag = false;
        if (temp[count].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == arguments[0]) {
            temp[count].style.backgroundColor = "red";
            flag = true;
            return;
        } else {
            temp[count].style.backgroundColor = "blue";
        }
        timer = setInterval(function() {
            count++;
            if (count < stack.length) {
                temp[count - 1].style.backgroundColor = 'white';
                if (temp[count].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == argu) {
                    temp[count].style.backgroundColor = "red";
                    flag = true;
                    clearInterval(timer);
                } else
                    temp[count].style.backgroundColor = "blue";
            } else {
                clearInterval(timer);
                temp[count - 1].style.backgroundColor = 'white';
                (flag == false) && (argu != undefined) && (alert('艾玛没找到'));
            }
        }, 200);
    }

    function reset() {
        clearInterval(timer);
        for (var i = 0; i < stack.length; i++) {
            stack[i].style.backgroundColor = 'white';
        }
        stack = [];
    }

    function del() {
        if (click_node != null) {
            var parent = click_node.parentNode;
            parent.removeChild(click_node);
        }
    }

    function setColor(event) {
        if (click_node != null) {
            click_node.style.backgroundColor = "white";
        }
        var e = event || window.event;
        click_node = e.target;
        if (click_node.nodeName.toLowerCase() == 'div') {
            click_node.style.backgroundColor = 'yellow';
        }
    }

    function insertDom() {
        if (click_node != null && ctext.value.length > 0) {
            var node = document.createElement('div');
            node.innerHTML = ctext.value;
            click_node.parentNode.appendChild(node);
        }
    }

    var root = document.getElementById('root'),
        DFSbtn = document.getElementById('dfs'),
        BFSbtn = document.getElementById('bfs'),
        B_search = document.getElementById('bfs_s'),
        D_search = document.getElementById('dfs_s'),
        text = document.getElementById('text'),
        ctext = document.getElementById('ctext'),
        insert = document.getElementById('insert'),
        dele = document.getElementById('dele');

    EventUtil.addHandler(DFSbtn, 'click', function() {
        reset();
        DFS(root);
        animate();
    });

    EventUtil.addHandler(BFSbtn, 'click', function() {
        reset();
        BFS(root);
        animate();
    });

    EventUtil.addHandler(D_search, 'click', function() {
        reset();
        DFS(root);
        animate(text.value);
    });

    EventUtil.addHandler(B_search, 'click', function() {
        reset();
        BFS(root);
        animate(text.value);
    });

    EventUtil.addHandler(root, 'click', setColor);
    EventUtil.addHandler(insert, 'click', insertDom);
    EventUtil.addHandler(dele, 'click', del);
})()
