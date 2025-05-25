import { Request, Response } from 'express'
import Comment from '~/db/models/commentModel'
import Post from '~/db/models/postModel'
import { getResponse } from '~/utils/common'

export const createComment = async (req: Request, res: Response) => {
    try {
        const content = req.body.content
        const postId = req.params.id
        const userId = req.user?.id

        const post = await Post.findById(postId)

        if (!post) {
            res.status(404).json(
                getResponse({
                    message: 'Post not found'
                })
            )
            return
        }

        const comment = await Comment.create({
            content,
            postId,
            userId
        })

        await comment.save()

        res.status(201).json(
            getResponse({
                message: 'Comment created successfully',
                data: comment.toJSON()
            })
        )
    } catch (e) {
        console.error('Error creating comment:', e)
        res.status(500).json(
            getResponse({
                message: 'Comment creation failed'
            })
        )
    }
}
