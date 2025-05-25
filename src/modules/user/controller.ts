import { Request, Response } from 'express'
import User from '~/db/models/userModel'
import { getResponse } from '~/utils/common'
import { ICreateUser, IUpdateUser } from './type'

export const createUser = async (req: Request<unknown, unknown, ICreateUser>, res: Response) => {
    try {
        const { loginName, password, firstName, lastName, description, location, occupation } = req.body

        const user = await User.findOne({ loginName })

        if (user) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        const newUser = new User({
            loginName,
            password,
            firstName,
            lastName,
            description,
            location,
            occupation
        })

        newUser.save()

        res.status(201).json({ message: 'User created successfully' })
    } catch (e) {
        console.error('Error creating user:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateUser = async (req: Request<unknown, unknown, IUpdateUser>, res: Response) => {
    try {
        const userId = req.user?.id

        const user = await User.findById(userId)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json(
            getResponse({
                message: 'User updated',
                data: updatedUser?.toJSON()
            })
        )
    } catch (e) {
        console.error('Error updating user:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password -__v -createdAt -updatedAt')

        res.status(200).json(
            getResponse({
                message: 'Users retrieved successfully',
                data: users.map((user) => user.toJSON())
            })
        )
    } catch (e) {
        console.error('Error getting all users:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}
