import { makeAutoObservable } from 'mobx'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { AxiosError, AxiosResponse } from 'axios'
import { linkModel, userModel } from '../shared/models'
import { addLinks, queryClient } from '../shared/lib/api'

export class UserStore {
    rootStore
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }

    userMutation = new MobxMutation<
        AxiosResponse,
        AxiosError<{ message: string }>,
        linkModel,
        Record<number, string>
    >(
        () => ({
            mutationFn: addLinks,
            mutationKey: ['addLinks'],
            onSuccess: ({ data }) => {
                console.log(data)
                // queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
        }),
        queryClient
    )

    async addLinks(links: linkModel) {
        const res = await this.userMutation.mutate(links)
        console.log(res)
    }
}
