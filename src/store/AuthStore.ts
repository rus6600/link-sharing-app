import { makeAutoObservable } from 'mobx'

import { MobxQuery } from '../shared/lib/mobxQuery'
import { queryClient } from '../shared/lib/api'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { signIn, signUp } from '../shared/lib/authApi'

export class AuthStore {
    rootStore
    private signInFormShown = true
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }
    postsQuery = new MobxQuery(
        () => ({
            queryKey: ['posts'],
            queryFn: async () => {
                const response = await fetch('http://localhost:3000/users')
                return await response.json()
            },
        }),
        queryClient
    )

    signUpMutation = new MobxMutation(
        () => ({
            mutationFn: signUp,
            mutationKey: ['signUp'],
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
            onError: () => {
                console.log('burrr')
            },
        }),
        queryClient
    )
    signInMutation = new MobxMutation(
        () => ({
            mutationFn: signIn,
            mutationKey: ['signIn'],
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
            onError: () => {
                console.log('burrr')
            },
        }),
        queryClient
    )

    getPosts() {
        // console.log(this.postsQuery.result())
        return this.postsQuery.result()
    }

    get showSignInForm() {
        return this.signInFormShown
    }
    handleSubmit(formData: Record<string, string>) {
        if (this.signInFormShown) {
            this.signInMutation.mutate(formData)
        } else {
            this.signUpMutation.mutate(formData)
        }
    }
    toggleForm = () => {
        this.signInFormShown = !this.signInFormShown
    }
}
