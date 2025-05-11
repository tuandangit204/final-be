import * as admin from 'firebase-admin';

export const getPostCollection = () => admin.firestore().collection('posts');