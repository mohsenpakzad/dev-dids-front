import { date, DateLocale } from 'quasar'

export function useFormatting() {

    const dateFormat = 'YYYY/MM/DD'

    function simplifyAddress(address: string) {
        return address.substring(0, 6) + '...' + address.substring(38, 42)
    }

    function formatLongStrings(str: string) {
        if (str.length > 15) {
            return str.substring(0, 6) + '...' + str.substring(str.length - 6, str.length)
        }
        return str
    }

    function timestampToStringDate(timeStamp: number): string {
        return date.formatDate(timeStamp, dateFormat)
    }

    function stringDateToTimestamp(dataString: string): number {
        return date.extractDate(dataString, dateFormat).valueOf()
    }

    return {
        dateFormat,
        simplifyAddress,
        formatLongStrings,
        timestampToStringDate,
        stringDateToTimestamp
    }
}
