export type PlatformUnionType =
    | 'youtube'
    | 'facebook'
    | 'github'
    | 'linkedin'
    | 'frontendmentor'

export const PlatformEnum: Record<PlatformUnionType, PlatformUnionType> = {
    youtube: 'youtube',
    facebook: 'facebook',
    github: 'github',
    linkedin: 'linkedin',
    frontendmentor: 'frontendmentor',
} as const

export const PlatformLinkRegexpEnum: Record<
    PlatformUnionType | 'default',
    string
> = {
    youtube:
        '^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$',
    linkedin:
        '^(http(s)?:\\/\\/)?([\\w]+\\.)?linkedin\\.com\\/(pub|in|profile)\n',
    github: 'https?:\\/\\/github\\.com.*',
    facebook:
        '(?:(?:http|https):\\/\\/)?(?:www.)?facebook.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?\n',
    frontendmentor: '(.*?)',
    default: '(.*?)',
}

export type LinkType = {
    id: string
    platform?: PlatformUnionType | null
    url?: string | null
}

export type UserType = {
    email: string
    password: string
    firstName?: string
    lastName?: string
    profileImage?: string
    contactEmail?: string
    links?: LinkType[]
}

export type UserTypeKeys = keyof UserType

export type UpdateUserType = Partial<UserType>

export type UserMediaType = {
    firstName: string
    lastName: string
    profileImage: string
}

export type UserCreateType = Partial<UserType>
