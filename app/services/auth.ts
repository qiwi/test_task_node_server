import * as crypto from "crypto";
import {UsersModel} from "../models/users";

const usersModel = new UsersModel();

export class AuthService {
    public async authUser(email: string, password: string): Promise<boolean> {
        const user = await usersModel.getUserForAuth(email);
        if (!user) {
            return false;
        }
        return this.getSha256(password) === user.userPassword;
    }

    protected getSha256(value: string): string {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
}