// window.onload = function() {
//     new fullpage('#fullpage', {
//         //options here
//         anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
//         menu: '#myMenu'
//     });
// }
$(document).ready(function() {
    var flag = true;
    var flag1 = true;
	$('#fullpage').fullpage({
		//options here
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
        menu: '#myMenu',
        verticalCentered : false,
        afterLoad (origin, destination, direction) {
            $('.MODELS').removeClass('fo');
            $('.MODELS').eq(destination.index).addClass('fo');
            if (flag1) {
                if (destination.index == 0) {
                    $('.crosswise .lirun').addClass('fate');
                    setTimeout(function() {
                        $('.crosswise .lirun').addClass('fate1').removeClass('fate');
                    },1600);
                    flag1 = false;
                }
            }
        },
        onLeave (origin, destination, direction) {
            if (destination.index == 0) {
                $('.headstock').removeClass('headstock-appear');
                $('.store').removeClass('headstock-appear');
                $('.header .Return-top').removeClass('Return-top-appear');

            } else {
                $('.headstock').addClass('headstock-appear');
                $('.store').addClass('headstock-appear');
                $('.header .Return-top').addClass('Return-top-appear');
            }
            if (destination.index == 1) {
                $('video')[0].currentTime = 0;
            } 
            if (destination.index == 3) {
                $('video')[1].currentTime = 0;
            }
        }
    });
    $('.header .Return-top').on('click', function() {
        fullpage_api.moveTo(1);
    })
    $('.line').click(function() {
        if(flag) {
            $(this).addClass('active').removeClass('back');
            $('.right-border').removeClass('close').addClass('open');
            $('.overspread').css({
                'opacity': '1',
                'z-index' : '997'
            });
            flag = false;
            fullpage_api.setAllowScrolling(flag);
        } else {
            $(this).addClass('back');
            $('.right-border').removeClass('open').addClass('close');
            $('.overspread').css({
                'opacity' : '0',
                'z-index' : '0'
            });
            $('#fullpage').removeClass('notScroll');
            flag = true;
            // 禁止滚动
            fullpage_api.setAllowScrolling(flag);
        }
    })
    $('.overspread').click(function() {
        if (flag == false) {
            $('.line').addClass('back');
            $('.right-border').removeClass('open').addClass('close');
            $(this).css({
                'opacity' : '0',
                'z-index' : '0'  
            });
            flag = true;
            fullpage_api.setAllowScrolling(flag);
        }
    })
    var $lang = $('.MODELS-one div a'); 
    $('.page-break li span').on('click', function() {
        $(this).addClass('status').parent().siblings().children().removeClass('status present');
        $(this).parent().css('border', '1px solid #fff').siblings().css('border', '1px solid transparent');
    })
    $('.page-break li').eq(0).children().on('click', function() {
        $('.crosswise .lirun').stop().animate({
            left : 0
        },500);
        $('.MODELS-one h1 ul').stop().animate({
            left : 0
        }).children().eq(0).addClass('appear').removeClass('disappear').siblings().addClass('disappear').removeClass('appear');
        $lang.eq(0).text('定制我的 MODEL S').siblings().text('了解 MODEL S');
    })
    $('.page-break li').eq(1).children().on('click', function() {
        $('.crosswise .lirun').stop().animate({
            left : '-50%'
        },500);
        $('.MODELS-one h1 ul').stop().animate({
            left : -$('.MODELS-one h1 ul li').width(),
        }).children().eq(1).addClass('appear').removeClass('disappear').siblings().addClass('disappear').removeClass('appear');
        $lang.eq(0).text('定制我的 MODEL 3').siblings().text('了解 MODEL 3');
    })
    $('.page-break li').eq(2).children().on('click', function() {
        $('.crosswise .lirun').stop().animate({
            left : '-100%'
        },500);
        $('.MODELS-one h1 ul').stop().animate({
            left : -(2 * $('.MODELS-one h1 ul li').width()),
        }).children().eq(2).addClass('appear').removeClass('disappear').siblings().addClass('disappear').removeClass('appear');
        $lang.eq(0).text('定制我的 MODEL X').siblings().text('了解 MODEL X');
    })
    // 添加点击波纹事件
    $('.MODELS div a').on('click', function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            var $span =  $('<span></span>');
           $span.css({
                left : x,
                top : y
            }).addClass('damaskeen');
            $(this).append($span);
            setTimeout(function() {
                $span.remove();
            },1000)
    })
    // 构建元素img添加到section中
    var $img = $('<img src="./images/下载 (2).svg">');
    $img.addClass('z');
    $img.on('click', function() {
        fullpage_api.moveSectionDown();
    })
    $('.section:nth-child(-n+4)').append($img);
    // 拖动
    // var $tuo = $('.crosswise li');
    // $('.overSpread').on('mousedown', function(e){
    //        var x = e.pageX;
    //        var spaceX = 0;
    //        console.log(x);
    //        $('.overSpread').on('mousemove', function(e) {
    //            spaceX = e.pageX - x;
    //            var num = $tuo.offset().left;
    //            var count = spaceX / 2 + num;
    //            if ($tuo.offset().left >= 0) {
    //                count = 0;
    //            }else if ($tuo.offset().left <= -$(window).width()) {
    //                count = -$(window).width();
    //            }
    //            $tuo.css({
    //                left : count,
    //            });
    //             if (spaceX > 0) {
    //            if ($tuo.offset().left <= (-$(window).width() * 0.45) && $tuo.offset().left >= (-$(window).width() * 0.55)){
    //                $('.page-break li').eq(0).children().click();
    //            } else if ($tuo.offset().left <= (-$(window).width() * 0.95) && $tuo.offset().left >= (-$(window).width() * 1.05)) {
    //                $('.page-break li').eq(1).children().click();
    //            }
    //        } else if (spaceX < 0) {
    //            if ($tuo.offset().left <= (-$(window).width() * 0.45) && $tuo.offset().left >= (-$(window).width() * 0.55)) {
    //                $('.page-break li').eq(2).children().click();
    //            } else if ($tuo.offset().left === 0) {
    //                $('.page-break li').eq(1).children().click();
    //            }
    //        }
    //        })
    //        $('.overSpread').on('mouseup', function() {
    //         $('.overSpread').off('mousemove');
    //        })
    // });
    //     $(document).on('mouseup', function(e) {
    //        if (spaceX > 0) {
    //            if ($tuo.offset().left <= (-$(window).width() * 0.45) && $tuo.offset().left >= (-$(window).width() * 0.55)){
    //                $('.page-break li').eq(0).children().click();
    //            } else if ($tuo.offset().left <= (-$(window).width() * 0.95) && $tuo.offset().left >= (-$(window).width() * 1.05)) {
    //                $('.page-break li').eq(1).children().click();
    //            }
    //        } else if (spaceX < 0) {
    //            if ($tuo.offset().left <= (-$(window).width() * 0.45) && $tuo.offset().left >= (-$(window).width() * 0.55)) {
    //                $('.page-break li').eq(2).children().click();
    //            } else if ($tuo.offset().left === 0) {
    //                $('.page-break li').eq(1).children().click();
    //            }
    //        }
    //        // if (spaceX > 0) {
    //        //        if ($tuo.offset().left == (-$(window).width() * 0.5)) {
    //        //         $('.page-break li').eq(0).children().click();
    //        //        } else if ($tuo.offset().left == -$(window).width()) {
    //        //         $('.page-break li').eq(1).children().click();
    //        //        } else if ($tuo.offset().left === 0) {
    //        //         $tuo.css('left','0');
    //        //        }
    //        // } else if (spaceX < 0) {
    //        //     if($tuo.offset().left == (-$(window).width() * 0.5)) {
    //        //         $('.page-break li').eq(2).children().click();
    //        //     } else if ($tuo.offset().left === 0) {
    //        //         $('.page-break li').eq(1).children().click();
    //        //     } else if ($tuo.offset().left == -$(window).width()) {
    //        //         $tuo.css({
    //        //             left : -$(window).width(),
    //      //         });
    //      //     }
    //      // }
    //          $(document).off('mousemove');
    //     })
    // })
});