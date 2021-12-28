import { useStore } from 'vuex'
import { DevDIDs } from "../contractData/types";

export function useRepository() {

    const store = useStore()

    function devDIDs(): DevDIDs {
        return store.getters.devDIDs as DevDIDs
    }

    function account(): string {
        return store.getters.account
    }

    return {
        devDIDs,
        account
    }
}