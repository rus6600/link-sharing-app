import { QueryClient } from '@tanstack/react-query'

import axios from 'axios'
import { UpdateUserType, UserCreateType } from '../types/Entities'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 8000,
    headers: {
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('social-link-share-access-token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const signUp = (args: UserCreateType) => {
    return axiosInstance.post('/auth/signup', args)
}

export const signIn = (args: UserCreateType) => {
    return axiosInstance.post('/auth/signin', args)
}

export const getUserData = () => {
    return axiosInstance.get('/users')
}

export const addLinks = (args: UpdateUserType) => {
    return axiosInstance.post('/users/', args)
}

export const addUserData = (args: UpdateUserType) => {
    return axiosInstance.post('/users', args)
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})
