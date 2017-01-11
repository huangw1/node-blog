
const Log = require('../lib/log')
const log = new Log('info')
const uuid = require('../lib/uuid')
const url  = require('url')
const qs   = require('querystring')

log.info((url.parse('https://git.oschina.net/yutent?dir=0&id=9').pathname))
log.info(url.format(url.parse('https://git.oschina.net/yutent?dir=0&id=9')))
