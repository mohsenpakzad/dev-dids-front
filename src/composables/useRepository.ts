import { useStore } from 'vuex'
import { DevDIDs } from "../contractData/types";
import { BigNumberish } from "ethers";

export function useRepository() {

    const store = useStore()

    function devDIDs(): DevDIDs {
        return store.getters.devDIDs as DevDIDs
    }

    function account(): string {
        return store.getters.account
    }

    async function generateVp(userVcs: BigNumberish[], validFrom: number, validTo: number) {
        const devDIDs = store.getters.devDIDs as DevDIDs

        const vp = await devDIDs.generateVp(userVcs, validFrom, validTo)

        const stringVp = JSON.stringify(vp)
        const base64Vp = btoa(stringVp)

        return [base64Vp, vp]
    }

    async function verify(base64Vp: string, holderAddress: string, currentDate: number) {

        const stringVp = atob(base64Vp)
        const vp = JSON.parse(stringVp)

        const devDIDs = store.getters.devDIDs as DevDIDs

        return await devDIDs.verify(
            vp,
            holderAddress,
            currentDate
        )
    }

    return {
        devDIDs,
        account,
        generateVp,
        verify
    }
}