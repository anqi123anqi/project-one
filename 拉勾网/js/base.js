window.onload = function() {
    var city = document.querySelector('.city');
    var ChangeCity = city.children[1];
    ChangeCity.addEventListener('mouseover', function() {
        this.style.color = "#fff";
    });
    ChangeCity.addEventListener('mouseleave', function() {
        this.style.color = "#afb5c0";
    });
    var areaCode = document.querySelector('.area-code');
    // console.log(areaCode.children[1]);
    areaCode.addEventListener('click', function() {
        // alert(123)
        areaCode.children[1].style.display = 'block';
    })
    var classify = document.querySelector('.classify');
    var lis = classify.children;
    // for (var i = 0; i < length - 1; i++) {
    //     lis[i].addEventListener('mouseover', function() {
    //         alert(1);
    //     })
    // }

}