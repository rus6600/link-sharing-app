import { AuthStore } from './AuthStore'
import { createContext } from 'react'
import { autorun } from 'mobx'

export class RootStore {
    authStore
    constructor() {
        this.authStore = new AuthStore(this)
    }
}

export const rootStore = new RootStore()
export const RootStoreContext = createContext(rootStore)

autorun(() => {
    // console.log(rootStore)
})
