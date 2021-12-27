export function useFormatting() {

    function simplifyAddress(address: string) {
        return address.substring(0, 6) + '...' + address.substring(38, 42)
    }

    return {
        simplifyAddress
    }
}
