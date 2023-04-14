import { Types } from "mongoose";

export default interface IUser {
    _id?: Types.ObjectId,
    username: string,
    email: string,
    secret?: string
}