import { makeAutoObservable } from 'mobx'

import { queryClient, signUp, signIn } from '../shared/lib/api'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { AxiosError, AxiosResponse } from 'axios'
import { RootStore } from './index'
import { UserCreateType, UserType } from '../shared/types/Entities'

export class AuthStore {
    rootStore
    private signInFormShown = true
    private isAuthenticated = false
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }

    signUpMutation = new MobxMutation<
        AxiosResponse<{
            accessToken: string
            refreshToken: string
            links: UserType['links']
        }>,
        AxiosError<{ message: string }>,
        UserCreateType,
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
                queryClient.setQueryData(['queryUserLinks'], data.links)
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
        }),
        queryClient
    )
    signInMutation = new MobxMutation<
        AxiosResponse<{
            accessToken: string
            refreshToken: string
            links: UserType['links']
        }>,
        AxiosError<{ message: string }>,
        UserCreateType,
        Record<number, string>
    >(
        () => ({
            mutationFn: signIn,
            mutationKey: ['signIn'],
            onSuccess: async ({ data }) => {
                localStorage.setItem(
                    'social-link-share-access-token',
                    data.accessToken
                )
                this.isAuthenticated = true
                // queryClient.setQueryData(['queryUserLinks'], data.links)

                await queryClient.invalidateQueries({
                    queryKey: ['queryUserLinks'],
                })
            },
        }),
        queryClient
    )

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
    async handleSubmit(formData: UserCreateType) {
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
