import express from 'express';
import bodyParser from 'body-parser';
import {blogsRouter} from "./routs/blogs-router";
import {testingRouter} from "./routs/testing-alll-data";
import {runDb} from "./repositories/db/db";
import {postsRouter} from "./routs/posts-router";

//test
const app = express();
const port = process.env.PORT || 5002;

const jsonParserMiddleware = bodyParser.json();
app.use(jsonParserMiddleware);

app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.use('/testing', testingRouter);

const startApp = async () => {
    try {
        await runDb()
        console.log('PORT: ', port)
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (e) {
        console.log('Some error')
        console.log(e)
    }
}

startApp()

export default app
