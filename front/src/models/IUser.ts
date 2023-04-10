export interface IUser {
    _id: string
    email: string
    password: string
    isEmailActivated: boolean
    isUserActive: boolean
    isAdmin: boolean
    datasets: string[]
}