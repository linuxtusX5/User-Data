import {UserModel} from '../models/User';

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const UserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (value: Record<string, any>) => new UserModel(value).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserByById = (id: string, value: Record<string, any>) => UserModel.findByIdAndUpdate(id, value);