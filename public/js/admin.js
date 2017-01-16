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

        $.ajax({
            url: action,
            method: method,
            data: data
        }).then(function(result) {
            console.log(result)
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
        var editor = new wangEditor('editor-trigger'),
            content = $('.editor-content')
        editor.config.uploadImgUrl = '/upload'
        editor.onchange = function () {
            content.val(this.$txt.html())
        }
        editor.create()
        editor.$txt.html(content.val())

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
                }
            })

            return false
        }
        var submit = $('.post-form')
        submit.submit(postArticle)
    } catch (exception) {

    }

})
