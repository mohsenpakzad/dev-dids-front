import { useStore } from '../store'
import { DevDIDs } from "../contractData/types";
import { BigNumberish } from "ethers";

export function useEthereum() {

    const store = useStore()

    function devDIDs(): DevDIDs {
        return store.devDIDs as DevDIDs
    }

    function account(): string {
        return store.account!
    }

    async function generateVp(userVcs: BigNumberish[], validFrom: number, validTo: number) {
        const vp = await store.devDIDs!.generateVp(userVcs, validFrom, validTo)

        const stringVp = JSON.stringify(vp)
        const base64Vp = btoa(stringVp)

        return [vp, base64Vp]
    }

    async function verify(base64Vp: string, holderAddress: string, currentDate: number) {

        const stringVp = atob(base64Vp)
        const vp = JSON.parse(stringVp)

        return await store.devDIDs!.verify(
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