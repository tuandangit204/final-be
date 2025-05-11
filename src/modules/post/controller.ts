import { Request, Response } from "express";
import { getPostCollection } from "~/firebase/collections";
import { getResponse } from "~/utils/common";
import { ICreatePostParams } from "./type";

export const createPost = async (req: Request<unknown, unknown, ICreatePostParams>, res: Response) => {

    const doc = getPostCollection().doc();

    const createdAt = new Date();
    const updatedAt = new Date();

    const post = {
        ...req.body,
        id: doc.id,
        createdAt,
        updatedAt,
    }

    await doc.set(post);
    res.status(201).json(getResponse({
        data: post,
        message: 'Post created successfully',
    }));
}

export const getPosts = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const postCollection = getPostCollection();

    const snapshot = await postCollection
        .orderBy('createdAt', 'desc')
        .limit(Number(size))
        .offset(Number(page) * Number(size))
        .get();

    const posts = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    });

    res.status(200).json(getResponse({
        data: posts,
        message: 'Posts fetched successfully',
    }));
}



