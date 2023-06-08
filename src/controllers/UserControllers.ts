import express from 'express';
import {getUserByEmail, createUser} from '../action/UserAction';
import { authentication,random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {username, email, password} = req.body;

        // validition
        if(!username || !email || !password){
            return res.status(401).send({
                success: false,
                message: 'fill-up the form'
            })
        }
        //existingUser
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: 'account already used'
            })
        }
        const salt = random();
        const user = await createUser({
            username, email, 
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).send({
            success: true,
            message: 'new created',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error while registering'
        })
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        // validition
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: 'fill-up the form'
            })
        }
        //existingUser
        const existingUser = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!existingUser){
            return res.status(201).send({
                success: false,
                message: 'Invalid account'
            })
        }

        const expectedHash = authentication(existingUser.authentication.salt, password);
        if(existingUser.authentication.password != expectedHash){
            return res.status(403).send({
                success: false,
                message: 'password wrong'
            })
        }
        const salt = random();
        existingUser.authentication.sessionToken = authentication(salt, existingUser._id.toString());
        await existingUser.save();

        res.cookie("Salvatus-REST-API", existingUser.authentication.sessionToken, {domain: 'localhost', path: '/'});
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            existingUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error while Login'
        })
    }
}