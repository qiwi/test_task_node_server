import {pgService} from "../../app";

export interface IUser {
    idUser: number;
    email: string;
    name: string;
}

export interface IUserAuth {
    userEmail: string;
    userPassword: string;
}

export class UsersModel {
    public async getItems(): Promise<Array<IUser>> {
        return await pgService.getRows(`SELECT id_user, user_email, user_name FROM obj_user`);
    }

    public async getItem(idUser: number): Promise<IUser> {
        return await pgService.getRow(`
        SELECT id_user, user_email, user_name FROM obj_user
            WHERE id_user = $1`,
            [idUser]);
    }

    public async getItemByEmail(email: string): Promise<IUser> {
        return await pgService.getRow(
            `SELECT id_user, user_email, user_name FROM obj_user
            WHERE user_email = $1`,
            [email]);
    }

    public async getUserForAuth(email: string): Promise<IUserAuth> {
        return await pgService.getRow(
            `
            SELECT user_email, user_password FROM obj_user
            WHERE user_email = $1
            `,
            [email]);
    }

}
