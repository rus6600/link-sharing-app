import { AuthStore } from './AuthStore'
import { createContext } from 'react'
import { autorun } from 'mobx'
import { UserStore } from './UserStore'

export class RootStore {
    authStore
    userStore
    constructor() {
        this.authStore = new AuthStore(this)
        this.userStore = new UserStore(this)
    }
}

export const rootStore = new RootStore()
export const RootStoreContext = createContext(rootStore)

autorun(() => {
    // console.log(rootStore)
})
