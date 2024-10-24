import { makeAutoObservable } from 'mobx'

import { queryClient } from '../shared/lib/api'
import { getUsers, signIn, signUp } from '../shared/lib/authApi'
import { AuthMutation } from '../shared/lib/authApi/mutation'
import { AuthQuery } from '../shared/lib/authApi/query'

export class AuthStore {
    rootStore
    private signInFormShown = true
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
    postsQuery = new AuthQuery(
        () => ({
            queryKey: ['users'],
            queryFn: getUsers,
        }),
        queryClient
    )

    signUpMutation = new AuthMutation(
        () => ({
            mutationFn: signUp,
            mutationKey: ['signUp'],
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
        }),
        queryClient
    )
    signInMutation = new AuthMutation(
        () => ({
            mutationFn: signIn,
            mutationKey: ['signIn'],
        }),
        queryClient
    )

    getUsers() {
        // console.log(this.postsQuery.result())
        return this.postsQuery.query()
    }

    get signUpMutationStatus() {
        return this.signUpMutation
    }

    get showSignInForm() {
        return this.signInFormShown
    }
    async handleSubmit(formData: Record<string, string>) {
        if (this.signInFormShown) {
            await this.signInMutation.getInstance().mutate(formData)
        } else {
            await this.signUpMutation.getInstance().mutate(formData)
        }
    }
    toggleForm = () => {
        this.signInFormShown = !this.signInFormShown
    }
}
