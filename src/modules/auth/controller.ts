import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import RefreshToken from '~/db/models/refreshTokenModel'
import User from '~/db/models/userModel'
import { getResponse } from '~/utils/common'
import { ILgoutUser, ILoginUser } from './type'

export const login = async (req: Request<unknown, unknown, ILoginUser>, res: Response) => {
    try {
        const { loginName, password } = req.body

        const user = await User.findOne({ loginName })

        if (!user) {
            res.status(400).json({ message: 'User name or password is invalid' })
            return
        }

        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            res.status(400).json({ message: 'User name or password is invalid' })
            return
        }

        // Generate JWT access token
        const accessToken = user.genJWTAccessToken()
        const refreshToken = uuidv4()

        // Save refresh token
        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            isRevoked: false
        })

        res.status(200).json(
            getResponse({
                message: 'Login successful',
                data: {
                    user: user.toJSON(),
                    accessToken,
                    refreshToken
                }
            })
        )
    } catch (e) {
        console.error('Error logging in:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const logout = async (req: Request<unknown, unknown, ILgoutUser>, res: Response) => {
    try {
        const { refreshToken } = req.body

        const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken })

        if (!refreshTokenDoc) {
            res.status(400).json({ message: 'Invalid refresh token' })
            return
        }

        RefreshToken.updateOne({ token: refreshToken }, { isRevoked: true }).exec()

        res.status(200).json({ message: 'Logout successful' })
    } catch (e) {
        console.error('Error logging out:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}
