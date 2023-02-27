import {uuid} from 'uuidv4';
import {blogsCollection} from "./db";
import {Collection} from "mongodb";
import {BlogType} from "./types/db-types";

class BlogsRepositories {
    constructor(private readonly blogsCollection: Collection<BlogType>) {
    }

    async getBlogs(): Promise<BlogType [] | null> {
        try {
            const res = this.blogsCollection.find({}, {projection: {_id: 0}}).toArray();
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }

    }

    async getBlogById(id: string): Promise<BlogType | null> {
        const res = await this.blogsCollection.find({id}, {projection: {_id: 0}}).next();
        if (res) {
            return res;
        } else {
            return null;
        }
    }

    async createBlog(dto: CreateBlogDtoType): Promise<BlogType | null> {
        const newBlog = {
            id: uuid(),
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date(),
            isMembership: true
        }

        await this.blogsCollection.insertOne(newBlog);
        const blog = await this.blogsCollection.find({id: newBlog.id}, {projection: {_id: 0}}).next();
        if (blog) {
            return blog;
        } else return null;
    }

    async updateBlog(id: string, dto: CreateBlogDtoType): Promise<boolean> {
        const res = await this.blogsCollection.updateOne({id}, {...dto});
        if (res.modifiedCount) {
            return true;
        } else {
            return false;
        }
    }

    async deleteBlog(id: string): Promise<boolean> {
        const res = await this.blogsCollection.deleteOne({id});
        if (res.deletedCount) {
            return true;
        } else {
            return false;
        }
    }
}

export default new BlogsRepositories(blogsCollection);
