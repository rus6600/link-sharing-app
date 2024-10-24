type platformUnionType = 'github' | 'youtube' | 'linkedIn'

export type LinkDataType = {
    platform: platformUnionType
    link: string
}

export type UserDataType = LinkDataType[]
