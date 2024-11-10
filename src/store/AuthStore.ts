import { makeAutoObservable } from 'mobx'

import { queryClient, signUp, signIn } from '../shared/lib/api'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { AxiosError, AxiosResponse } from 'axios'
import { RootStore } from './index'
import { pageEnum, UserCreateType, UserType } from '../shared/types/Entities'

export class AuthStore {
    rootStore
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
        {
            mutationFn: signUp,
            mutationKey: ['signUp'],
            onSuccess: async ({ data }) => {
                localStorage.setItem(
                    'social-link-share-access-token',
                    data.accessToken
                )
                await queryClient.invalidateQueries({
                    queryKey: ['queryUserData'],
                })
                this.rootStore.uiStore.setCurrentPage(pageEnum.links)
            },
        },
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
        {
            mutationFn: signIn,
            mutationKey: ['signIn'],
            onSuccess: async ({ data }) => {
                localStorage.setItem(
                    'social-link-share-access-token',
                    data.accessToken
                )
                await queryClient.invalidateQueries({
                    queryKey: ['queryUserData'],
                })
                this.rootStore.uiStore.setCurrentPage(pageEnum.links)
            },
        },
        queryClient
    )

    get signUpStatus() {
        return this.signUpMutation.status()
    }
    get signInStatus() {
        return this.signInMutation.status()
    }
    async handleSubmit(formData: UserCreateType) {
        if (this.rootStore.uiStore.page === pageEnum.signIn) {
            return await this.signInMutation.mutate(formData)
        } else {
            return await this.signUpMutation.mutate(formData)
        }
    }
}
