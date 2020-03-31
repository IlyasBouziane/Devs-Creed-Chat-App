const moment = require('moment')


function formatMessage(devname,messageText) {
    return {
        devname,
        messageText,
        time : moment().format('h:mm a')
    }
}

module.exports = formatMessage