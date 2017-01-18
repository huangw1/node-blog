$(function(){
	systole()
	xss2html()
})

function systole(){
	if(!$('.history').length){
		return
	}
	var wrapper = $('.history-date'),
		button = wrapper.find('h2 a')

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