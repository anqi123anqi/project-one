function animate(obj, target, callback) { //obj：目标对象 target：目标位置
    //先清除以前的定时器，只保留当前的一个
    // console.log(callback);
    clearInterval(obj.time);
    obj.time = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //三元表达式
        // if (step >= 0) {
        //     step = Math.ceil(step);
        // } else {
        //     step = Math.floor(step);
        // }
        if (obj.offsetLeft == target) {
            //停止动画，本质是停止定时器
            clearInterval(obj.time);
            // //回调函数写到定时器结束里面
            // if (callback) {
            //     //调用函数
            //     callback();
            // }
            callback && callback();
        }
        //把每次移动的步长改为慢慢变小的数值
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30)
}