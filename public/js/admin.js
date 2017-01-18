/**
 * Created by wlhuang on 2017/1/16.
 */

/**
 * common function
 * @param e
 */
function stopDefault(e) {
    e.stopPropagation()
    e.preventDefault()
}
$(function() {
    /**
     * admin login
     */
    var submitButton = $('.form-body')
    submitButton.submit(function(e) {
        stopDefault(e)

        var action = this.action
        var method = this.method
        var data = $(this).serialize()

        if(!data.match(/(^|&)user_name=([^&]*)(&|$)/)[2]) {
            return alert('请填写用户名')
        }
        if(!data.match(/(^|&)pass_word=([^&]*)(&|$)/)[2]) {
            return alert('请填写密码')
        }

        $.ajax({
            url: action,
            method: method,
            data: data
        }).then(function(result) {
            if(result.code === 200) {
                console.log('result: ', result)
                location.href = result.redirect
            } else {
                alert('用户名或者密码错误')
            }
        })

        return false
    })

    /**
     * dropdown
     */
    function menuFold(e) {
        if(e.target.classList.contains('active')) {
            e.target.classList.remove('active')
        } else {
            e.target.classList.add('active')
        }
    }
    var dropdown = $('.dropdown')
    dropdown.on('click', menuFold)

    /**
     * editor
     */

    try {
        function fullScreen() {
            if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                var doc = document.documentElement;
                if(doc.requestFullscreen) {
                    doc.requestFullscreen()
                } else if(doc.mozRequestFullScreen) {
                    doc.mozRequestFullScreen()
                } else if(doc.webkitRequestFullScreen) {
                    doc.webkitRequestFullScreen()
                } else if(elem.msRequestFullscreen) {
                    elem.msRequestFullscreen()
                };
            } else {
                if(document.exitFullscreen) {
                    document.exitFullscreen()
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if(document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            }
        }

        var element = $('.full-screen')
        element.click(fullScreen)

        var editor = ace.edit('editor')
        editor.setTheme('ace/theme/chrome')
        editor.getSession().setMode('ace/mode/markdown')
        editor.renderer.setShowPrintMargin(false)

        var editorContent = $('.editor-content'),
            markdownBody  = $('.markdown-body'),
            textarea      = $('.textarea-content')
        editorContent.keyup(function() {
            markdownBody.html(marked(editor.getValue()))
            textarea.val(editor.getValue())
        })
        textarea.val().trim() !== '' && (editor.setValue(textarea.val().trim()), markdownBody.html(marked(textarea.val().trim())))
        function postArticle(e) {
            stopDefault(e)

            var action = this.action
            var method = this.method
            var data = $(this).serialize()

            $.ajax({
                url: action,
                method: method,
                data: data
            }).then(function(result) {
                if(result.code === 200) {
                    location.href = result.redirect
                } else {
                    alert('服务端错误')
                }
            })

            return false
        }
        var submit = $('.post-form')
        submit.submit(postArticle)
    } catch (exception) {
        console.log(exception)
    }

})
