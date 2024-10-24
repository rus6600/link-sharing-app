type userModelUnion = 'email' | 'password'

export type userModel = Record<userModelUnion, string>

type linkType = {
    platform: string
    link: string
}

export type linkModel = linkType[]
