import { action, autorun, computed, makeObservable, observable } from 'mobx'
import { createContext } from 'react'

class Store {
    constructor() {
        makeObservable(this, {
            count: observable,
            inc: action,
            dec: action,
            double: computed,
            posts: observable,
            loading: observable,
            setPosts: action,
        })
    }

    count = 0
    posts = []
    loading = false
    asyncData = ''
}

export const counterStore = new Store()
export const PostStoreContext = createContext(counterStore)

autorun(() => {
    console.log(counterStore.count)
})
