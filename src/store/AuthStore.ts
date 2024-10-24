import { makeObservable } from 'mobx'
import axios from 'axios'

import { MobxQuery } from '../shared/lib/mobxQuery'
import { queryClient } from '../shared/lib/api'
import { MobxMutation } from '../shared/lib/mobxMutation'

const postTodo = (args: Record<string, string>) => {
    return axios.post('http://localhost:3000/auth/signup', args)
}

export class AuthStore {
    rootStore
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeObservable(this, {})
    }

    showPassword = false

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

    mutateQuery = new MobxMutation(
        () => ({
            mutationFn: postTodo,
            mutationKey: ['posts'],
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

    postUser() {
        return this.mutateQuery
    }
}
