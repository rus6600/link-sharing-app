import { makeAutoObservable } from 'mobx'
import { RootStore } from './index.ts'
import { pageEnum, pageUnion } from '../shared/types/Entities'

export class UiStore {
    rootStore
    page: pageUnion = 'signIn'
    showAuth: boolean = true
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }
    get currentPage() {
        return this.page
    }
    toggleCurrentAuthPage = () => {
        this.page =
            this.page === pageEnum.signIn ? pageEnum.signUp : pageEnum.signIn
    }
    setCurrentPage = (newPage: pageUnion) => {
        this.page = newPage
    }

    toggleShowAuthPage = () => {
        this.showAuth = !this.showAuth
    }
}
