const { pi, pow, sqrt, sin, cos, asin } = require('mathjs')

exports.logData = (file, data) => {

    const fs = require('fs')
    const path = require('path')

    const file_path = path.join('/mnt/logs/', file)
    const setup_data = this.getDate('timestamp') + ' :: ' + data + '\n\n'

    fs.appendFile(file_path, setup_data, error => { })
}

exports.getDate = (type, calculateDays) => {

    date = calculateDays ? new Date(new Date().valueOf() + (1000 * 3600 * 24 * calculateDays)) : new Date()

    date = new Date(date.getTime() + (330 + date.getTimezoneOffset()) * 60000);

    const Y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), H = date.getHours(), i = date.getMinutes(), s = date.getSeconds()

    const format = (unit) => unit < 10 ? '0' + unit : unit

    switch (type) {

        case 'timestamp':
            return Y + '-' + format(m) + '-' + format(d) + ' ' + format(H) + ':' + format(i) + ':' + format(s)

        case 'time':
            return format(H) + ':' + format(i) + ':' + format(s)

        default:
            return Y + '-' + format(m) + '-' + format(d)
    }
}

exports.getDistance = async (params) => {

    let lat1 = params.lat1
    let lon1 = params.lon1
    let lat2 = params.lat2
    let lon2 = params.lon2


    lon1 = lon1 * pi / 180;
    lon2 = lon2 * pi / 180;
    lat1 = lat1 * pi / 180;
    lat2 = lat2 * pi / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = pow(sin(dlat / 2), 2)
        + cos(lat1) * cos(lat2)
        * pow(sin(dlon / 2), 2);

    let c = 2 * asin(Math.sqrt(a));
    let r = 6371;
    let finres = c * r

    return finres
}