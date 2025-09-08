type Role = 'User' | 'Admin'

export interface User {
    avatar(arg0: string, avatar: any): unknown
    _id: string
    roles: Role[]
    email: string
    name?: string
    date_of_birth?: string
    address?: string
    phone?: string
    createdAt: string
    updatedAt: string

}