import { Request, Response } from 'express'
import { ICreatePost } from './type'
import Post from '~/db/models/postModel'
import { getResponse } from '~/utils/common'

export const createPost = async (req: Request<unknown, unknown, ICreatePost>, res: Response) => {
    try {
        const user = req.user

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

export const findOne = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId)

        if (!post) {
            res.status(404).json(
                getResponse({
                    message: 'Post not found'
                })
            )
            return
        }

        res.status(200).json(
            getResponse({
                message: 'Post found successfully',
                data: post.toJSON()
            })
        )
    } catch (e) {
        console.error('Error finding post:', e)
        res.status(500).json(
            getResponse({
                message: 'Internal server error'
            })
        )
    }
}
