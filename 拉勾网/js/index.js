window.addEventListener('load', function() {
    //获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', function() {
        //停止自动播放
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器
    });
    banner.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = this.setInterval(function() {
            //手动调用事件
            arrow_r.click();
        }, 2000)
    });
    var ul = banner.querySelector('ul');
    var ol = banner.querySelector('.circle');
    var bannerWidth = banner.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号 添加为自定义属性
        li.setAttribute('index', i);
        //将小 li 添加到 ol 里面
        ol.appendChild(li);
        //小圆圈的排他思想 生成 li 同时添加绑定事件
        li.addEventListener('click', function() {
            //干掉所有人 清楚所有的 li 的 current 类名
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            //只留自己
            this.className = 'current';
            //点击小圆圈，移动图片 ul 
            //ul 移动的距离就是 小圆圈索引号 × 图片的宽度  注意为负值
            //当我们点击了某个小 li 就会拿到当前的 li 的索引号
            var index = this.getAttribute('index');
            //当我点击了某个小 li 就把这个小 li 的索引传递给 num
            num = index;
            //当我点击了某个小 li 就把这个小 li 的索引传递给 circle
            circle = index;
            // console.log(index);
            // console.log(bannerWidth);
            animate(ul, -index * bannerWidth);
        })
    }
    // 将 ol 里的第一个 li 设为当前 current
    ol.children[0].className = 'current';
    // 克隆第一张图片（li），放到 ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    //节流阀flag
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果移动到最后一张复制图时，ul的 快速left：0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * bannerWidth, function() {
                flag = true; //打开节流阀
            });
            // //点击右侧按钮，小圆圈跟着一起变化
            circle++;
            //如果 circle == ol.children.length 已经到最后一个小圆圈,复原到第一个
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果移动到最后一张复制图时，ul的 快速right：0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * bannerWidth + 'px';
            }
            num--;
            animate(ul, -num * bannerWidth, function() {
                flag = true; //打开节流阀
            });
            // //点击右侧按钮，小圆圈跟着一起变化
            circle--;
            //如果 circle < 0 就立马跳到最后一个
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //调用函数
            circleChange();
        }
    });

    function circleChange() {
        //清除其余小圆圈的 current 类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = this.setInterval(function() {
        //手动调用事件
        arrow_r.click();
    }, 2000);
    var classify = this.document.querySelectorAll('.classify');
    var classify_extend = this.document.querySelectorAll('.classify_extend');
    for (let i = 0; i < classify_extend.length; i++) {
        // clas[i].setAttribute('index', i);
        classify[i].addEventListener('mouseover', function() {
            classify_extend[i].style.display = 'block';

        });
        classify[i].addEventListener('mouseout', function() {
            classify_extend[i].style.display = 'none';
        });

    }
    var linkTitle = this.document.querySelectorAll('.linkTitle');
    var links = document.querySelectorAll('.links');
    for (let i = 0; i < linkTitle.length; i++) {
        linkTitle[i].setAttribute('index', i);
        linkTitle[i].addEventListener('click', function() {
            for (let j = 0; j < linkTitle.length; j++) {
                linkTitle[j].className = ''; //循环去掉所有linkTitle的自定义属性的样式
            }
            this.className = 'current'; //独自设置样式
            let index = this.getAttribute('index');
            // console.log(index);
            for (let i = 0; i < links.length; i++) {
                links[i].style.display = 'none'; //将所有的links隐藏
            }
            links[index].style.display = 'block'; //当点击对应的标题时，获取其索引值，使之对应的内容显示
        })
    }
    var show_or_close = this.document.querySelector('.show_or_close');
    var detail_list = this.document.querySelector('.detail_list');
    show_or_close.addEventListener('click', function() {
        if (detail_list.style.height == '30px') {
            detail_list.style.height = '90px';
        } else {
            detail_list.style.height = '30px';
        }
    })
    var login_method_btn = this.document.querySelectorAll('.login_method_btn');
    var login_method_btn_img = this.document.querySelectorAll('.login_method_btn_img');
    for (let i = 0; i < login_method_btn.length; i++) {
        login_method_btn[i].addEventListener('mouseover', function() {
            login_method_btn_img[i].style.display = 'block';
        });
        login_method_btn[i].addEventListener('mouseout', function() {
            login_method_btn_img[i].style.display = 'none';
        });
    }
})