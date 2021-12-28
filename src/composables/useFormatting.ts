import { date, DateLocale } from 'quasar'

export function useFormatting() {

    const dateFormat = 'YYYY/MM/DD'

    function simplifyAddress(address: string) {
        return address.substring(0, 6) + '...' + address.substring(38, 42)
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
        timestampToStringDate,
        stringDateToTimestamp
    }
}
