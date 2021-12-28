import { date } from 'quasar'
import { useFormatting } from './useFormatting'

export function useUtils(){

    function getCurrentTimestamp(){
        const format = useFormatting().dateFormat
        const formatted = date.formatDate(Date.now(), format)
        return date.extractDate(formatted, format).valueOf()
    }

    return {
        getCurrentTimestamp
    }
}
