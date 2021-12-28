import { ethers } from 'ethers'

export function useFieldRules() {

    function required(val: string) {
        return val && val.length > 0 || 'Required'
    }

    function ethereumAddress(val: string) {
        return ethers.utils.isAddress(val) || 'Invalid address'
    }

    function validVp(val: string) {
        try {
            atob(val)
            return
        } catch (e) {
            return 'Invalid verifiable presentation'
        }
    }

    return {
        required,
        ethereumAddress,
        validVp
    }
}
