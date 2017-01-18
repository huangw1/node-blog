$(function(){
	systole()
	xss2html()
})

function systole(){
	if(!$('.history').length){
		return
	}
	var wrapper = $('.history-date'),
		button = wrapper.find('h2 a'),
		parentH,
		elements = []
	
	parentH = wrapper.parent().height()
	
	setTimeout(function(){
		
		wrapper.find('ul').children(":not('h2:first')").each(function(id){
			elements.push($(this).position().top)
			$(this).css({'margin-top':-elements[id]}).children().hide()
		}).animate({'margin-top':0}, 0).children().fadeIn()

		wrapper.parent().animate({"height":parentH}, 0)

		wrapper.find('ul').children(":not('h2:first')").addClass('bounceInDown').css({'-webkit-animation-duration':'0','-webkit-animation-delay':'0','-webkit-animation-timing-function':'ease','-webkit-animation-fill-mode':'both'}).end().children('h2').css({'position':'relative'})
		
	}, 0)

	button.click(function(){
		$(this).parent().css({'position':'relative'})
		$(this).parent().siblings().slideToggle()
		wrapper.parent().removeAttr('style')
		return false
	})
}

function xss2html() {
	try {
		var content = $('.article-body'),
			xss     = $('.content-temp').html()
			content.html(marked(xss))
	} catch (exception) {
		console.log(exception)
	}

}