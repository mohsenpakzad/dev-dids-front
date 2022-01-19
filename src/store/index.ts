import { Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

import contractAddress from '../contractData/contract-address.json'
import DevDIDsArtifact from '../contractData/DevDIDs.json'
import { DevDIDs } from "../contractData/types"


export const useStore = defineStore('main', () => {

    const account: Ref<string | null> = ref(null)
    const error: Ref<string | null> = ref(null)
    const devDIDs: Ref<DevDIDs | null> = ref(null)
    const userHeldVcs: Ref<any[]> = ref([])
    const userIssuedVcs: Ref<any[]> = ref([])
    const loadingHeldVcs: Ref<boolean> = ref(false)
    const loadingIssuedVcs: Ref<boolean> = ref(false)


    async function readOnlyConnect(): Promise<void> {
        /********************************/
        /* Initiate ready-only contract */
        /********************************/

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        devDIDs.value = new ethers.Contract(
            contractAddress.DevDIDs,
            DevDIDsArtifact.abi,
            provider
        ) as DevDIDs
    }

    async function readWriteConnect(): Promise<void> {
        /********************************/
        /* Initiate read-write contract */
        /********************************/

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        devDIDs.value = new ethers.Contract(
            contractAddress.DevDIDs,
            DevDIDsArtifact.abi,
            signer
        ) as DevDIDs
    }

    async function connectWallet(): Promise<void> {

        /*****************************************/
        /* Detect the MetaMask Ethereum provider */
        /*****************************************/


        if (!await detectEthereumProvider()) {
            error.value = 'Metamask not installed!'
            return
        }

        /*******************************************************/
        /* Make sure network is Rinkeby otherwise switch to it */
        /*******************************************************/

        let chainId = await window.ethereum.request({method: "eth_chainId"})
        const rinkebyChainId = '0x4'
        if (chainId !== rinkebyChainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: rinkebyChainId}],
                })
            } catch (err) {
                console.log(err)
                error.value = 'You are not connected to the Rinkeby Test Network!'
            }
        }


        /*************************************************************************************/
        /* Get connected accounts otherwise request for access and watch for account changes */
        /*************************************************************************************/


        let accounts = await window.ethereum.request({method: 'eth_accounts'}) as Array<string>

        if (accounts.length !== 0) {
            account.value = accounts[0]
        } else {
            try {
                accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                }) as Array<string>
                account.value = accounts[0]
            } catch (err) {
                // @ts-ignore
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask')
                    error.value = 'Please connect to MetaMask'
                } else {
                    console.error(err)
                }
            }
        }


        window.ethereum.on('accountsChanged', async (accounts) => {
            // @ts-ignore
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.')
                error.value = 'Please connect to MetaMask'
                // @ts-ignore
            } else if (accounts[0] !== account.value) {
                // @ts-ignore
                account.value = accounts[0]

                /*************/
                /* Fetch vcs */
                /*************/
                await fetchUserHeldVcs()
                await fetchUserIssuedVcs()
            }
        })


        /***********************/
        /* Connect to contract */
        /***********************/


        await readWriteConnect()


        /*************/
        /* Fetch vcs */
        /*************/
        await fetchUserHeldVcs()
        await fetchUserIssuedVcs()
    }

    async function fetchUserHeldVcs(): Promise<void> {
        loadingHeldVcs.value = true

        const vcIds = await devDIDs.value!.vcsOfHolder(account.value!)
        userHeldVcs.value = []

        let vcs = []
        for (let i = 0; i < vcIds.length; i++) {
            if (vcIds[i].isZero()) continue

            const myVc = await devDIDs.value!.getVc(vcIds[i])
            vcs.push({...myVc, id: vcIds[i]})
        }
        userHeldVcs.value = vcs.reverse()

        loadingHeldVcs.value = false
    }

    async function fetchUserIssuedVcs(): Promise<void> {
        loadingIssuedVcs.value = true

        const vcIds = await devDIDs.value!.vcsOfIssuer(account.value!)
        userIssuedVcs.value = []

        let vcs = []
        for (let i = 0; i < vcIds.length; i++) {
            if (vcIds[i].isZero()) continue

            const myVc = await devDIDs.value!.getVc(vcIds[i])
            vcs.push({...myVc, id: vcIds[i]})
        }
        userIssuedVcs.value = vcs.reverse()

        loadingIssuedVcs.value = false
    }

    return {
        account,
        error,
        devDIDs,
        userHeldVcs,
        userIssuedVcs,
        loadingHeldVcs,
        loadingIssuedVcs,
        readOnlyConnect,
        readWriteConnect,
        connectWallet,
        fetchUserHeldVcs,
        fetchUserIssuedVcs
    }
})