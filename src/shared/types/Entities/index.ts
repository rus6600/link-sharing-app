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
        '(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)',
    frontendmentor: '(.*?)',
    default: '(.*?)',
}

export const PlatformPlaceholderEnum: Record<
    PlatformUnionType | 'default',
    string
> = {
    github: 'e.g. https://www.github.com/johnappleseed',
    facebook: 'e.g. https://www.facebook.com/zuck',
    youtube: 'e.g. https://www.youtube.com/watch?v=6ka00GpyxkM',
    linkedin: 'e.g. https://www.linkedin.com/in/rus6600',
    frontendmentor: 'e.g. https://www.frontendmentor.io/profile/rus6600',
    default: 'Please choose platform',
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

export type pageUnion =
    | 'links'
    | 'profileDetails'
    | 'preview'
    | 'signIn'
    | 'signUp'

export const pageEnum: Record<pageUnion, pageUnion> = {
    links: 'links',
    profileDetails: 'profileDetails',
    preview: 'preview',
    signIn: 'signIn',
    signUp: 'signUp',
} as const
