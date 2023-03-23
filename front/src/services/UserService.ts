import $api from "../api";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static updateUser(email: string, newPassword: string, isUserActive: boolean): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/update-user', {email, newPassword, isUserActive})
    }
}
