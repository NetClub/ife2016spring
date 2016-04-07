(function() {
    var timer = null;
    var stack = [];

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

    var root = document.getElementById('root'),
        DFSbtn = document.getElementById('dfs'),
        BFSbtn = document.getElementById('bfs'),
        B_search = document.getElementById('bfs_s'),
        D_search = document.getElementById('dfs_s'),
        text = document.getElementById('text');

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

})()
