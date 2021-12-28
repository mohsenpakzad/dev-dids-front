import { createStore } from 'vuex'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

import contractAddress from '../contractData/contract-address.json'
import DevDIDsArtifact from '../contractData/DevDIDs.json'
import { DevDIDs } from "../contractData/types"


export type State = {
    account: string | null,
    error: string | null,
    devDIDs: DevDIDs | null,
    userHeldVcs: any[],
    userIssuedVcs: any[],
}

const store = createStore<State>({
    state: () => ({
        account: null,
        error: null,
        devDIDs: null,
        userHeldVcs: [],
        userIssuedVcs: [],
    }),
    getters: {
        account: (state): string | null => state.account,
        error: (state): string | null => state.error,
        devDIDs: (state): DevDIDs | null => state.devDIDs,
        userHeldVcs: (state): any[] => state.userHeldVcs,
        userIssuedVcs: (state): any[] => state.userIssuedVcs,
    },
    mutations: {
        setAccount(state, account) {
            state.account = account
        },
        setError(state, error) {
            state.error = error
        },
        setDevDIDs(state, devDIDs) {
            state.devDIDs = devDIDs
        },
        setUserHeldVcs(state, userHeldVcs) {
            state.userHeldVcs = userHeldVcs
        },
        setUserIssuedVcs(state, userIssuedVcs) {
            state.userIssuedVcs = userIssuedVcs
        }
    },
    actions: {
        async readOnlyConnect({commit}): Promise<void> {
            /********************************/
            /* Initiate ready-only contract */
            /********************************/

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const devDIDs = new ethers.Contract(
                contractAddress.DevDIDs,
                DevDIDsArtifact.abi,
                provider
            ) as DevDIDs

            commit('setDevDIDs', devDIDs)
        },
        async readWriteConnect({commit}): Promise<void> {
            /********************************/
            /* Initiate read-write contract */
            /********************************/

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const devDIDs = new ethers.Contract(
                contractAddress.DevDIDs,
                DevDIDsArtifact.abi,
                signer
            ) as DevDIDs

            commit('setDevDIDs', devDIDs)
        },
        async connectWallet({commit, dispatch, getters}): Promise<void> {

            /*****************************************/
            /* Detect the MetaMask Ethereum provider */
            /*****************************************/


            if (!await detectEthereumProvider()) {
                commit('setError', 'Metamask not installed!')
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
                    commit(
                        'setError',
                        'You are not connected to the Rinkeby Test Network!'
                    )
                }
            }


            /*************************************************************************************/
            /* Get connected accounts otherwise request for access and watch for account changes */
            /*************************************************************************************/


            let accounts = await window.ethereum.request({method: 'eth_accounts'}) as Array<string>

            if (accounts.length !== 0) {
                commit('setAccount', accounts[0])
            } else {
                try {
                    accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    }) as Array<string>
                    commit('setAccount', accounts[0])
                } catch (err) {
                    // @ts-ignore
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                        console.log('Please connect to MetaMask')
                        commit(
                            'setError',
                            'Please connect to MetaMask'
                        )
                    } else {
                        console.error(err)
                    }
                }
            }


            window.ethereum.on('accountsChanged', (accounts) => {
                // @ts-ignore
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    console.log('Please connect to MetaMask.')
                    commit(
                        'setError',
                        'Please connect to MetaMask'
                    )
                    // @ts-ignore
                } else if (accounts[0] !== getters.account) {
                    // @ts-ignore
                    commit('setAccount', accounts[0])

                    /*************/
                    /* Fetch vcs */
                    /*************/
                    dispatch('fetchUserHeldVcs')
                    dispatch('fetchUserIssuedVcs')
                }
            })


            /***********************/
            /* Connect to contract */
            /***********************/


            dispatch('readWriteConnect')


            /*************/
            /* Fetch vcs */
            /*************/
            dispatch('fetchUserHeldVcs')
            dispatch('fetchUserIssuedVcs')
        },
        async fetchUserHeldVcs({getters, commit}) {
            const devDIDs = getters.devDIDs as DevDIDs

            const vcIds = await devDIDs.vcsOfHolder(getters.account)
            commit('setUserHeldVcs', [])

            let vcs = []
            for (let i = 0; i < vcIds.length; i++) {
                if (vcIds[i].isZero()) continue

                const myVc = await devDIDs.getVc(vcIds[i])
                vcs.push({...myVc, id: vcIds[i]})
            }
            commit('setUserHeldVcs', vcs)
        },
        async fetchUserIssuedVcs({getters, commit}) {
            const devDIDs = getters.devDIDs as DevDIDs

            const vcIds = await devDIDs.vcsOfIssuer(getters.account)
            commit('setUserIssuedVcs', [])

            let vcs = []
            for (let i = 0; i < vcIds.length; i++) {
                if (vcIds[i].isZero()) continue

                const myVc = await devDIDs.getVc(vcIds[i])
                vcs.push({...myVc, id: vcIds[i]})
            }
            commit('setUserIssuedVcs', vcs)
        }
    }
})

export default store
