import express from "express"
import bcrypt from "bcrypt"
import { userModel, USER } from "../Models/userModel"


type userData = Pick<USER, "email" | "password" | "username"> & {updated?: string}

export class UserService{

    static async Create(data: userData){

        const hashedpassword = bcrypt.hash(data.password, 10)
        const user = new userModel({...data, password: hashedpassword})
        user.save()
        return user
    }

    static async Find(identifier: {key: "email" | "username", value: string}){

        try {
            const user = userModel.findOne(identifier.key === "email" ? {email: identifier.value} : {username: identifier.value}).exec()
            if(!user){
                throw new Error("Could not find User")
            }
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }

    }


    static async updateUsername(data: userData){

        try {
            const user = await userModel.findOneAndUpdate({username: data.username}, {username: data.updated}, {new: true, runValidators: true}).exec()
            if(!user){
                throw new Error("Could not update user")
            }

            user.save()
            return user

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }
    }


    static async deleteUser(identifier: {key: "email" | "username", value: string}){

        try {
            const user = userModel.findOneAndDelete(identifier.key === "email" ? {email: identifier.value} : {username: identifier.value})
            if(!user){
                throw new Error("Could not update user")
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }
    }

}