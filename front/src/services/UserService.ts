import $api from "../api";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static updateUserPassword(email: string, newPassword: string): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/update-password', {email, newPassword})
    }
    static deactivateUser(email: string): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/update-password', {email})
    }
}