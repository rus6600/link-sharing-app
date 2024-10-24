import { makeAutoObservable } from 'mobx'

import { queryClient } from '../shared/lib/api'
import { getUsers, signIn, signUp } from '../shared/lib/authApi'
import { AuthMutation } from '../shared/lib/authApi/mutation'
import { AuthQuery } from '../shared/lib/authApi/query'
import { AxiosError, AxiosResponse } from 'axios'
import { userModel } from '../shared/models'

export class AuthStore {
    rootStore
    private signInFormShown = true
    private isAuthenticated = false
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }
    postsQuery = new AuthQuery(
        () => ({
            queryKey: ['users'],
            queryFn: getUsers,
        }),
        queryClient
    )

    signUpMutation = new AuthMutation<
        AxiosResponse<{ accessToken: string; refreshToken: string }>,
        AxiosError<{ message: string }>,
        userModel,
        Record<number, string>
    >(
        () => ({
            mutationFn: signUp,
            mutationKey: ['signUp'],
            onSuccess: ({ data }) => {
                localStorage.setItem(
                    'social-link-share-access-token',
                    data.accessToken
                )
                this.isAuthenticated = true
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
        }),
        queryClient
    )
    signInMutation = new AuthMutation<
        AxiosResponse<{ accessToken: string; refreshToken: string }>,
        AxiosError<{ message: string }>,
        userModel,
        Record<number, string>
    >(
        () => ({
            mutationFn: signIn,
            mutationKey: ['signIn'],
            onSuccess: ({ data }) => {
                localStorage.setItem(
                    'social-link-share-access-token',
                    data.accessToken
                )
                this.isAuthenticated = true
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
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

    get isUserAuthenticated() {
        return this.isAuthenticated
    }

    get showSignInForm() {
        return this.signInFormShown
    }
    get signUpStatus() {
        return this.signUpMutation.status()
    }
    async handleSubmit(formData: userModel) {
        if (this.signInFormShown) {
            return await this.signInMutation.mutate(formData)
        } else {
            return await this.signUpMutation.mutate(formData)
        }
    }
    toggleForm = () => {
        this.signInFormShown = !this.signInFormShown
    }
    resetForm() {
        this.signUpMutation.reset()
    }
}
