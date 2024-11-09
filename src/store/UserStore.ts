import { makeAutoObservable } from 'mobx'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { AxiosError, AxiosResponse } from 'axios'
import {
    addLinks,
    addUserData,
    getUserData,
    queryClient,
} from '../shared/lib/api'
import { MobxQuery } from '../shared/lib/mobxQuery'
import {
    PlatformEnum,
    PlatformUnionType,
    UpdateUserType,
} from '../shared/types/Entities'
import { DragEndEvent } from '@dnd-kit/core'
import { SingleValue } from 'react-select'
import { arrayMove } from '@dnd-kit/sortable'
import { getKeys } from '../shared/utils'
import { OptionType } from '../components/ui'

export class UserStore {
    rootStore
    showProfileDetails: boolean = false
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }
    linksMutation = new MobxMutation<
        AxiosResponse,
        AxiosError<{ message: string }>,
        UpdateUserType,
        Record<number, string>
    >(
        {
            mutationFn: addLinks,
            mutationKey: ['mutateUserLinks'],
            onSuccess: async ({ data }) => {
                console.log(data)
                await queryClient.invalidateQueries({
                    queryKey: ['queryUserLinks'],
                })
            },
        },
        queryClient
    )

    userDataMutation = new MobxMutation<
        AxiosResponse,
        AxiosError<{ message: string }>,
        UpdateUserType,
        Record<number, string>
    >(
        {
            mutationFn: addUserData,
            mutationKey: ['mutateUserData'],
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['queryUserData'],
                })
            },
        },
        queryClient
    )

    userDataQuery = new MobxQuery<
        AxiosResponse<UpdateUserType>,
        AxiosError<{ message: string }>,
        AxiosResponse<UpdateUserType>,
        Record<number, string>
    >(
        {
            queryKey: ['queryUserData'],
            queryFn: getUserData,
        },
        queryClient
    )

    toggleShowEdit = () => {
        this.showProfileDetails = !this.showProfileDetails
    }

    get profileDetails() {
        return this.showProfileDetails
    }

    setUserData = async (data: UpdateUserType) => {
        return this.userDataQuery
            .update()
            .setQueryData<
                AxiosResponse<UpdateUserType>
            >(['queryUserData'], (prev) => {
                if (prev?.data) {
                    return { ...prev, data: { ...prev.data, ...data } }
                }
            })
    }

    removeUserLink = async (id: string) => {
        const links = this.userDataQuery
            .query()
            ?.data?.data?.links?.filter((link) => link.id !== id)
        if (links) {
            await this.setUserData({ links })
        }
    }

    submitData = async (newData: UpdateUserType) => {
        const data = await this.setUserData(newData)
        if (data) {
             this.userDataMutation.mutate(data.data)
        }
    }

    get userQuery() {
        return this.userDataQuery.query()
    }

    addNewLink = () => {
        this.userDataQuery
            .update()
            .setQueryData<
                AxiosResponse<UpdateUserType>
            >(['queryUserData'], (prev) => {
                if (prev) {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            ...(prev.data.links && {
                                links: [
                                    ...prev.data.links,
                                    {
                                        id: crypto.randomUUID(),
                                        url: null,
                                        platform: null,
                                    },
                                ],
                            }),
                        },
                    }
                }
            })
    }

    onSelectChange = (id: string, newValue: SingleValue<OptionType>) => {
        this.userDataQuery
            .update()
            .setQueryData<
                AxiosResponse<UpdateUserType>
            >(['queryUserData'], (prev) => {
                if (prev && prev.data && prev.data.links && newValue) {
                    prev.data.links = prev.data.links.map((link) => {
                        if (link.id === id)
                            return { ...link, platform: newValue.value }
                        return link
                    })
                    return prev
                }
            })
    }

    get selectOptions() {
        const selectedValues = new Set(
            this.userDataQuery
                .query()
                ?.data?.data?.links?.map(({ platform }) => platform)
        )

        return getKeys(PlatformEnum).reduce<PlatformUnionType[] | []>(
            (acc, cur) => {
                if (!selectedValues.has(cur)) {
                    return [...acc, cur]
                }
                return acc
            },
            []
        )
    }

    handleDragEnd = async ({ active, over }: DragEndEvent) => {
        const data = this.userDataQuery.query()?.data?.data?.links
        if (data && over && active.id !== over.id) {
            const oldIndex = data.findIndex((item) => item.id === active.id)
            const newIndex = data.findIndex((item) => item.id === over.id)
            const links = arrayMove(data, oldIndex, newIndex)
            await this.setUserData({ links })
        }
    }
}
