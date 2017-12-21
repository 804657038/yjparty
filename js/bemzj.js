$(function(){
	//如果没人签到
	var noperson = true;
	if(noperson==true)
	{
		var second = setTimeout(smallToBig,2000);	
	}
	$(document).keydown(function(event){ 
    	if(event.which==40)
    	{
    		stopBanner();
			
    	}else if(event.which==38){
			banner(5);
    	}
  	});	
  	//
  	var times = 2000;
  	var  tWeen= setInterval(function(){
		$('.pc_title>img:nth-child(2)').animate({'left':'100%'},times,function(){
			$(this).css('left','-80px');
		});
		$('.pc_title>img:nth-child(3)').animate({'right':'100%'},times,function(){
			$(this).css('right','-80px');
		});
  	},times)
});
//无缝轮播
function banner(time){
	if($('.signInBox').height()>474)
	{
		var h = $('.signInBox').height();
		$('.signInBox').append($('.signIn').clone());		
		var index = parseInt($('.signInBox').css('margin-top'));
		kTween = setInterval(function(){
			index -= 1;
			$('.signInBox').css('margin-top',index+'px');
			if(Math.abs(index) == h)
			{
				console.log(index);
				index = 0;
				$('.signInBox').css('margin-top',index+'px');
			}
		},time);
	}
	
}
//停止轮播
function stopBanner(){
	clearInterval(kTween);
	$('.signIn').removeClass('signInActive');
	$('.wrap').removeClass('wrapActive');
	setTimeout(function(){
		$('.signInBox').css('margin-top','0px');
		$('.signInBox .signIn').eq(1).remove();
	},1000);
}
//没有签到时从小头像到大
function smallToBig(){
	$('.signIn').addClass('signInActive');
	$('.wrap').addClass('wrapActive');
	
}
//增加一个
function add (src,wxname){
	var html = "";
	html += '<div class="person"><div class="pLeft"><img src="'+src+'" /></div>';
	html += '<div class="pRight"><ul><li><p class="name">'+wxname+'</p></li>';
	html += '<li><p>签到成功</p></li></ul></div><div style="clear: left;"></div></div>';
	$('.signIn').prepend(html);
	$('.signIn').css('margin-top','-52px');
	$('.signIn').animate({'margin-top':'0px'},1000);
}
