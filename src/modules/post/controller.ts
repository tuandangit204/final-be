import { Request, Response } from 'express'
import { ICreatePost } from './type'
import Post from '~/db/models/postModel'
import { getResponse } from '~/utils/common'
import { IUser } from '~/db/models/userModel'

export const createPost = async (req: Request<unknown, unknown, ICreatePost>, res: Response) => {
    try {
        const user = req.user as IUser

        const { title, imageUrl } = req.body

        const post = new Post({
            title,
            imageUrl,
            userId: user?.id as string
        })

        await post.save()

        res.status(201).json(
            getResponse({
                message: 'Post created successfully',
                data: post.toJSON()
            })
        )
    } catch (e) {
        console.error('Error creating post:', e)
        res.status(500).json({ message: 'Internal server error' })
    }
}
