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

export const getPostByCondition = async (req: Request, res: Response) => {
    try {
        const { title, authorId, page = 1, limit = 1000 } = req.query

        // Xây dựng filter object động
        const filter: any = {}

        if (title) {
            filter.title = { $regex: title, $options: 'i' } // Tìm kiếm không phân biệt hoa thường
        }

        if (authorId) {
            filter.userId = authorId
        }

        // Tính toán pagination
        const pageNum = parseInt(page as string)
        const limitNum = parseInt(limit as string)
        const skip = (pageNum - 1) * limitNum

        // Thực hiện query với populate author info
        const posts = await Post.find(filter)
            .populate('userId', 'firstName lastName loginName') // Lấy thông tin author
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo mới nhất
            .skip(skip)
            .limit(limitNum)

        // Đếm tổng số documents để tính pagination
        const total = await Post.countDocuments(filter)

        res.status(200).json(
            getResponse({
                message: 'Posts retrieved successfully',
                data: {
                    posts: posts.map(post => post.toJSON()),
                    total,
                    page: pageNum,
                    limit: limitNum
                }
            })
        )
    } catch (e) {
        console.error('Error getting posts by condition:', e)
        res.status(500).json(
            getResponse({
                message: 'Internal server error'
            })
        )
    }
}