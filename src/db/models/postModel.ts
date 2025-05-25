import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
    title: string
    imageUrl: string
    userId: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

// Schema định nghĩa cấu trúc collection
const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' // Liên kết với model User
        }
    },
    {
        timestamps: true, // Tự động tạo createdAt và updatedAt
        versionKey: false
    }
)

const Post = mongoose.model<IPost>('Post', postSchema)

export default Post
