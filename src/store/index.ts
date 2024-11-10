import { AuthStore } from './AuthStore'
import { createContext } from 'react'
import { autorun } from 'mobx'
import { UserStore } from './UserStore'
import { UiStore } from './UiStore.ts'

export class RootStore {
    authStore
    uiStore
    userStore
    constructor() {
        this.authStore = new AuthStore(this)
        this.userStore = new UserStore(this)
        this.uiStore = new UiStore(this)
    }
}

export const rootStore = new RootStore()
export const RootStoreContext = createContext(rootStore)

autorun(() => {
    // console.log(rootStore)
})
