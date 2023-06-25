// 格式化时间
export default (format: string, time: number) => {

    // eslint-disable-next-line prefer-const
    let {days, hours, minutes, seconds, milliseconds} = parseTime(time);

    // 判断是否需要展示 天数，需要则补 0，否则将 天数 降级加到 小时 部分
    if (format.includes('DD')) {
        format = format.replace('DD', padZero(String(days)))
    } else {
        hours += days * 24
    }

    // 判断是否需要展示 小时，需要则补 0，否则将 小时 降级加到 分钟 部分
    if (format.includes('HH')) {
        format = format.replace('HH', padZero(String(hours)))
    } else {
        minutes += hours * 60
    }

    // 判断是否需要展示 分钟，需要则补 0，否则将 分钟 降级加到 秒数 部分
    if (format.includes('mm')) {
        format = format.replace('mm', padZero(String(minutes)))
    } else {
        seconds += minutes * 60
    }

    // 判断是否需要展示 秒数，需要则补 0，否则将 秒数 降级加到 毫秒 部分
    if (format.includes('ss')) {
        format = format.replace('ss', padZero(String(seconds)))
    } else {
        milliseconds += seconds * 1000
    }

    // 默认展示 3位 毫秒数
    if (format.includes('SSS')) {
        const ms = padZero(String(milliseconds), 3)
        format = format.replace('SSS', ms)
    }

    // 最终返回格式化的数据
    return {format, days, hours, minutes, seconds, milliseconds}
}

enum DateTime {
    SECOND = 1000,
    MINUTE = 60 * SECOND,
    HOUR = 60 * MINUTE,
    DAY = 24 * HOUR,
}

const parseTime = (time: number) =>  {
    const days = Math.floor(time / DateTime.DAY)
    const hours = Math.floor((time % DateTime.DAY) / DateTime.HOUR)
    const minutes = Math.floor((time % DateTime.HOUR) / DateTime.MINUTE)
    const seconds = Math.floor((time % DateTime.MINUTE) / DateTime.SECOND)
    const milliseconds = Math.floor(time % DateTime.SECOND)

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    }
}

// 不足位数用 0 填充
const padZero = (str: string, padLength = 2) => {
    if (str.length < padLength) {
        str = '0'.repeat(padLength - str.length) + str
    }
    return str
}