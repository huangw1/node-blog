$(function(){
	systole()
})

function systole(){
	if(!$(".history").length){
		return
	}
	var wrapper = $(".history-date"),
		button = wrapper.find("h2 a,ul li dl dt a"),
		parentH,
		elements = []
	
	parentH = wrapper.parent().height()
	wrapper.parent().css({"height":101})
	
	setTimeout(function(){
		
		wrapper.find("ul").children(":not('h2:first')").each(function(id){
			elements.push($(this).position().top)
			$(this).css({"margin-top":-elements[id]}).children().hide()
		}).animate({"margin-top":0}, 1600).children().fadeIn()

		wrapper.parent().animate({"height":parentH}, 2600)

		wrapper.find("ul").children(":not('h2:first')").addClass("bounceInDown").css({"-webkit-animation-duration":"2s","-webkit-animation-delay":"0","-webkit-animation-timing-function":"ease","-webkit-animation-fill-mode":"both"}).end().children("h2").css({"position":"relative"})
		
	}, 600)

	button.click(function(){
		$(this).parent().css({'position':'relative'})
		$(this).parent().siblings().slideToggle()
		wrapper.parent().removeAttr('style')
		return false
	})
}