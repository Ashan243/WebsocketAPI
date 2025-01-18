import express from "express"
import mongoose from "mongoose"



export interface USER extends Document{

    id: number
    username: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema<USER>({

    id:{
        type: Number,
        required: true,
        unique: true
    },

    username:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    }

}, {virtuals: true, timestamps: true})



export const userModel = mongoose.model<USER>("users", userSchema)