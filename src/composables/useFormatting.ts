export function useFormatting() {

    function simplifyAddress(address: string) {
        return address.substring(0, 6) + '...' + address.substring(38, 42)
    }
    function formatLongStrings(str: string){
        if(str.length>15) {
            return str.substring(0, 6) + '...' + str.substring(str.length - 6, str.length)
        }
        return str
    }

    return {
        simplifyAddress, formatLongStrings
    }


}
