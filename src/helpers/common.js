exports.logData = (file, data) => {

    const fs   = require('fs')
    const path = require('path')

    const file_path  = path.join('/mnt/logs/', file)
    const setup_data = this.getDate('timestamp') + ' :: ' + data + '\n\n'

    fs.appendFile(file_path, setup_data, error => {})
}

exports.getDate = (type, calculateDays) => {

    date = calculateDays ? new Date(new Date().valueOf() + (1000 * 3600 * 24 * calculateDays)) : new Date()

    date = new Date(date.getTime() + (330 + date.getTimezoneOffset()) * 60000);

    const Y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), H = date.getHours(), i = date.getMinutes(), s = date.getSeconds()

    const format = (unit) => unit < 10 ? '0' + unit : unit

    switch (type) {

        case 'timestamp' :
            return Y + '-' + format(m) + '-' + format(d) + ' ' + format(H) + ':' + format(i) + ':' + format(s)
            
        case 'time' :
            return format(H) + ':' + format(i) + ':' + format(s)
    
        default :
            return Y + '-' + format(m) + '-' + format(d)
    }
}
