import { Request, Response } from 'express'
import { getPostCollection } from '~/firebase/collections'
import { getResponse } from '~/utils/common'
import { ICreatePostParams, IUpdatePostParams } from './type'

export const updatePost = async (req: Request<unknown, unknown, IUpdatePostParams>, res: Response) => {
    const { id, ...params } = req.body

    if (!id) {
        res.status(400).json(
            getResponse({
                data: null,
                message: 'Post ID is required'
            })
        )

        return
    }

    const docRef = getPostCollection().doc(id)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
        res.status(404).json(
            getResponse({
                data: null,
                message: 'Post not found'
            })
        )

        return
    }

    const updatedAt = new Date()
    await docRef.update({ ...params, updatedAt });

    const newPostSnap = await docRef.get();
    const post = newPostSnap.data()

    res.status(200).json(
        getResponse({
            data: post,
            message: 'Post updated successfully'
        })
    )
}

export const createPost = async (req: Request<unknown, unknown, ICreatePostParams>, res: Response) => {
    const doc = getPostCollection().doc()

    const createdAt = new Date()
    const updatedAt = new Date()

    const post = {
        ...req.body,
        id: doc.id,
        createdAt,
        updatedAt
    }

    await doc.set(post)
    res.status(201).json(
        getResponse({
            data: post,
            message: 'Post created successfully'
        })
    )
}

export const getPosts = async (req: Request, res: Response) => {
    const { page = 1, size = 10 } = req.query

    const postCollection = getPostCollection();

    const snapshot = await postCollection
        .orderBy('createdAt', 'desc')
        .limit(Number(size))
        .offset(Number(+page - 1) * Number(size))
        .get()

    const posts = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    res.status(200).json(
        getResponse({
            data: posts,
            message: 'Posts fetched successfully'
        })
    )
}
