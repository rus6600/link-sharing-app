import axios from 'axios'

export const signUp = (args: Record<string, string>) => {
    return axios.post('http://localhost:3000/auth/signup', args)
}

export const signIn = (args: Record<string, string>) => {
    return axios.post('http://localhost:3000/auth/signin', args)
}

export const getUsers = () => {
    return axios.get('http://localhost:3000/users')
}
