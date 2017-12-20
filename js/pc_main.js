var open=0;

$(function(){

	// 音乐功能
	// document.addEventListener("WeixinJSBridgeReady", function () { 
 //    $("#bgmusic")[0].play();
 //    $('.mus')[0].src='img/yue.png';
 //  }, false);
 //  $('.mus').click(function(){
 //      if (open==0) {
 //          $('.mus')[0].src='img/yue2.png';
 //          $("#bgmusic")[0].pause();
 //          $('.sliderWrap').addClass();
 //          $('.mus').removeClass('rotate');
 //          open=1;
 //      }else if (open==1) {
 //          $('.mus')[0].src='img/yue.png';
 //          $("#bgmusic")[0].play();
 //          $('.mus').addClass('rotate');
 //          open=0;
 //      }
 //  });
	
	
	// 内容


	// 自动滚屏
	var timerNum = 0;
	var timerS = null;
	var isGun = true;
	var isHove = true;
    //
    // timerS = setInterval(function(){
		// if (isGun && isHove) {
		// 	timerNum +=3;
		// 	$('html,body').scrollTop(timerNum);
    //
		// }
    // },50);
    //
    // $(document).bind('mousewheel',function(){
    //
		// isGun = false;
		//
		// setTimeout(function(){
		// 	isGun = true;
		// 	timerNum = $('html,body').scrollTop();
		// },1500);
		//
    //
    // });

	$(document).scroll(function(){

	});

	$('.listBg').hover(function(){

		isHove = false;

	},function(){

		isHove = true;

	})

	// timerFn();
	




	
	// 点击打开点赞和评论功能
	$(document).on('click','.xinIcon',function(){

		if ($(this).attr('alt') == 'true') {

			$(this).siblings('.kuang').css('width','0');
			$(this).attr('alt','false');

		}else{

			$(this).siblings('.kuang').css('width','360px');

			$(this).attr('alt','true');

		}

	});

	// 点赞功能
	$(document).on('click','.fabIcon',function(){

		$(this).parents('.listDate').find('.interaction').show();
		$(this).parents('.listDate').find('.liveBg').show();

		if ($(this).attr('alt') == '') {

			if ($(this).parents('.listDate').find('.liveBg small').length == 0) {

				$(this).parents('.listDate').find('.liveBg').append('<small>哈哈哈</small>');
			}else{
				$(this).parents('.listDate').find('.liveBg').append('，<small>哈哈哈</small>');
			}
			
			$(this).attr('alt','true');
		}

		$('.xinIcon').siblings('.kuang').css('width','0');
		$('.xinIcon').attr('alt','false');

		
	});

	// 评论功能
	$(document).on('click','.comIcon',function(){

		$(this).parents('.listDate').find('.interaction').show();
		$(this).parents('.listDate').find('.messageBg').show();

		$(this).parents('.listDate').find('.messageBg').append('<input type="text">');
		$(this).parents('.listDate').find('.messageBg input').focus();
		$(this).parents('.listDate').find('.messageBg input').blur(function(){

			if ($(this).parents('.listDate').find('.messageBg input').val() == '') {

				$(this).parents('.listDate').find('.messageBg input').remove();
			}else{

				var inputVal = $(this).parents('.listDate').find('.messageBg input').val();

				$(this).parents('.listDate').find('.messageBg').append('<div><small>'+wxName+'</small><em>：'+inputVal+'</em></div>');

				$(this).parents('.listDate').find('.messageBg input').remove();

			}
		});
		

		$('.xinIcon').siblings('.kuang').css('width','0');
		$('.xinIcon').attr('alt','false');
		
	});

	// 评论功能2
	$(document).on('click','.messageBg div',function(){


		$(this).parents('.messageBg').append('<input type="text">');
		$(this).parents('.messageBg').find('input').focus();

		var huifuName = $(this).find('small').eq(0).text();

		$(this).parents('.messageBg').find('input').blur(function(){

			if ($(this).parents('.messageBg').find('input').val() == '') {

				$(this).parents('.messageBg').find('input').remove();
			}else{

				var inputVal = $(this).parents('.messageBg').find('input').val();

				$(this).parents('.messageBg').append('<div><small>'+wxName+'</small>回复<i>'+huifuName+'</i><em>：'+inputVal+'</em></div>');

				$(this).parents('.listDate').find('.messageBg input').remove();

			}
		});
		

		$('.xinIcon').siblings('.kuang').css('width','0');
		$('.xinIcon').attr('alt','false');
		
	});

	document.addEventListener('touchstart',function(){

		$('.xinIcon').siblings('.kuang').css('width','0');
		$('.xinIcon').attr('alt','false');
	});
	document.addEventListener('touchmove',function(){

		$('.xinIcon').siblings('.kuang').css('width','0');
		$('.xinIcon').attr('alt','false');
	});


	// 我要留言

	$('.btn1').click(function(){

		$('.wrap').hide();
		$('.pc_banner').hide();
		$('.leavBg').show();

	})



	var _URL = window.URL || window.webkitURL;

	$('input[type="file"]').change(function(e){
	    // console.log(e)//e就是你获取的file对象
	     var file, img, imgURL;
		 if ((file = this.files[0])) {

		    imgURL = _URL.createObjectURL(file);
		    
		    $('.addImg').prepend('<img src='+imgURL+' alt="">');

		    imgHtml += '<img src='+imgURL+' alt="">';
		}

	});

	// 发布

	var wxName = '哈哈哈';
	var wxWords = '';
	var imgHtml = '';

	$('.release').click(function(){

		$('.leavBg').hide();
		$('.wrap').show();
		$('.pc_banner').show();

		wxWords = $('.content textarea').val();


		$('.listBg').prepend('<li><div class="headIcon"><img src="img/headIcon.png" alt=""></div><div class="listDate"><span>'+wxName+'</span><p>'+wxWords+'</p><div class="imgList tuBg">'+imgHtml+'</div><div class="mis"><i>刚刚</i><img src="img/xinIcon.png" alt="false" class="xinIcon"><div class="kuang"><img src="img/fabIcon.png" alt="" class="fabIcon"><img src="img/comIcon.png" alt="" class="comIcon"></div></div><div class="interaction"><img src="img/jiao.png" alt="" class="jiao"><div class="liveBg"><img src="img/live.png" alt="" class="live"></div><div class="messageBg"></div></div></div></li>');



	});


	// 取消
	$('.cancel').click(function(){

		$('.tuiBg').show();
	});

	$('.tips span').click(function(){

		$('.tuiBg').hide();

	});

	$('.tips i').click(function(){

		$('.tuiBg').hide();
		$('.leavBg').hide();
		$('.wrap').show();
		$('.pc_banner').show();

	});

	$('.newBtn').click(function(){

		$('.detaBg').hide();
		$('.wrap').show();
		$('.pc_banner').show();

	})



	// 点击图片放大
	$(document).on('click','.tuBg img',function(){

		var imgSrc = $(this).attr('src');

		$('.fuBg img').attr('src',imgSrc);

		$('.fuBg').fadeIn(300);
	});


	// 关闭图片层
	$('.fuBg').click(function(){
		$(this).fadeOut(300);
	});

	$('.fuBg').on('touchmove',function(){

		$(this).fadeOut(300);

	});

	// 返回

	$('.returnBtn').click(function(){

		$('.newBg').hide();
		$('.wrap').show();
		$('.pc_banner').show();

	});

	$('.news').click(function(){

		$('.wrap').hide();
		$('.pc_banner').hide();
		$('.detaBg').show();

	})



   
	
})