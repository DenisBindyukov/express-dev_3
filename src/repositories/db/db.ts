import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
import {BlogType, PostType} from "../types/db-types";


dotenv.config()
const mongoUri = process.env.MONGO_URL || '';

export const client = new MongoClient(mongoUri);

const db = client.db('blogger-platform');
export const blogsCollection = db.collection<BlogType>('blogs');
export const postsCollection = db.collection<PostType>('posts');

export async function runDb() {
    try {
        await client.connect();
        console.log('client mongo db connected');
    } catch (e) {
        console.log('can not to connect to mongo db');
    }
}