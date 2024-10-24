type userModelUnion = 'email' | 'password'

export type userModel = Record<userModelUnion, string>
