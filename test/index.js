
const Log = require('../lib/log')
const log = new Log('info')
const uuid = require('../common/uuid')
const url  = require('url')
const qs   = require('querystring')
const config = require('../config')

const admins = require('../models/admins')

const crypto = require('crypto')

//const utils    = require('../../common/utils')

function isEqual(password1, password2) {
    return crypto.createHash('md5').update(password1).digest('hex') == password2
}

function cryption(password) {
    return crypto.createHash('md5').update(password).digest('hex')
}

//log.info((url.parse('https://git.oschina.net/yutent?dir=0&id=9').pathname))
//log.info(url.format(url.parse('https://git.oschina.net/yutent?dir=0&id=9')))

const moment = require('moment')
//console.log(moment().format('YYYY'))
//console.log(new Date('Tue Jan 17 2017 09:44:35 GMT+0800 (中国标准时间)').getTime())

const posts  = require('../models/posts')

posts.createPost({
    title:'征服JavaScript面试系列',
    auth: 'huangw1',
    tags: 'javascript',
    content: `<p>图-电子吉他-Feliciano Guimarães（CC BY 2.0）</p><blockquote>“征服JavaScript面试”是我所写的一个系列文章，旨在帮助那些应聘中、高级JavaScript开发职位的读者们准备一些常见的面试问题。我自己在实际面试当中也经常会问到这类问题。系列的第一篇文章请参见“什么是闭包”。注：本文均以ES6标准做代码举例。如果想了解ES6，可以参阅“ES6学习指南”。</blockquote><p>原文链接：<a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9#.d84c324od">https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9#.d84c324od</a></p><p>对象在JavaScript语言中使用十分广泛，学会如何有效地运用对象，有助于工作效率的提升。而不良的面向对象设计，可能会导致代码工程的失败，更严重的话还会引发<a href="https://medium.com/javascript-scene/inside-the-dev-team-death-spiral-6a7ea255467b">整个公司悲剧</a>。</p><p>不同于其它大部分语言，JavaScript是基于原型的对象系统，而不是基于类。遗憾的是，大多数JavaScript开发者对其对象系统理解不到位，或者难以良好地应用，总想按照类的方式使用，其结果将导致代码里的对象使用混乱不堪。所以JavaScript开发者最好对原型和类都能有所了解。</p><h3>类继承和原型继承有何区别？</h3><p>这个问题比较复杂，大家有可能会在评论区各抒己见、莫衷一是。因此，列位看官需要打起十二分的精神学习个中差异，并将所学良好地运用到实践当中去。</p><p>类继承：可以把类比作一张蓝图，它描绘了被创建对象的属性及特征。</p>
                <p><br></p>`,
    update_time: new Date('2016-9').getTime(),
    create_time: new Date('2016-9').getTime()
})

posts.createPost({
    title:'JavaScript 代码整洁之道',
    auth: 'huangw1',
    tags: 'javascript',
    content: `<p>Robert C. Martin 在&nbsp;<a href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882">《代码整洁之道》</a>&nbsp;中提到的软件工程原则，同样适用于 JavaScript。这不是一个风格参考。它指导如何用 JavaScript 编写可读、可复用、可重构的软件。</p><p>并不是每一个原则都必须严格遵循，甚至很少得到大家的认同。它们仅用于参考，不过要知道这些原则都是《代码整洁之道》的作者们累积多年的集体经验。</p><p>我们在软件工程方面的技术发展刚刚超过 50 年，我们仍然在学习很多东西。当软件架构和架构本身一样古老的时候，我们应该遵循更为严格规则。现在，对于你和你的团队编写的 JavaScript 代码，不妨依据这些准则来进行质量评估。</p><p>还有一件事：知道这些不会马上让你成为更好的软件开发者，在工作中常年使用这些准则不能让你避免错误。每一段代码都从最初的草图开始到最终成型，就像为湿粘土塑形一样。最后，当我们与同行一起审查的时候，再把不完美的地方消除掉。不要因为初稿需要改善而否定自己，需要要否定的只是那些代码！</p>
                <p><br></p>`,
    update_time: new Date('2016-2').getTime(),
    create_time: new Date('2016-2').getTime()
})

posts.createPost({
    title:'开始使用 Webpack 2',
    auth: 'huangw1',
    tags: 'webpack,javascript',
    content: `<h3>什么是 Webpack？</h3><p>最初的时候，Webpack 仅是一个 JavaScript 的模块打包工具。随着 Webpack 日渐流行，逐渐演变成了前端代码的管理工具（不论是人为故意还是社区推动的）。</p><p>以前的运行方式是：标记文件、样式文件和 JavaScript 文件都被分割开的。你必须要独立管理每一个文件，使得所有文件可以正确的运行。</p><p>像 Gulp 这样的构建工具可以操作许多不同的预处理器和编译器，不过基本上所有的工作都看成是把一个源文件作为输入，经过处理后生成一个编译后的输出文件。Gulp 做的工作更像是一个任务接着一个任务的进行的，没有从全局的管理上考虑。这就会加重开发者的负担：在生产环境下，开发者需要知道任务在哪里结束，然后需要正确地把所有任务都组装在一起。</p><p></p><p>Webpack 尝试询问一个大胆的问题来减轻开发者的负担：是否有一个开发过程可以处理所引用到的依赖？我们是否可以简单地用某种方式去写代码，而构建程序会去管理最终所必需使用到的代码？</p>
                <p><br></p>`,
    update_time: new Date('2017-1').getTime(),
    create_time: new Date('2017-1').getTime()
})
//
//posts.getPostByTag('javascript').then(function(data) {
//    console.log(data)
//})

admins.createAdmin({user_name: config.user.user_name, pass_word: cryption(config.user.pass_word)})