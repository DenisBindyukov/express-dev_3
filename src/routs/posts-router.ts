import {Request, Response, Router} from "express";

export const postsRouter = Router({});

interface ReqBodyType {
    title: string
    author: string
    canBeDownloaded: any
    minAgeRestriction: number
    publicationDate: any
    availableResolutions: string[]
}

postsRouter.get('/', (req: Request, res: Response) => {
});

postsRouter.get('/:id', (req: Request, res: Response) => {
});


postsRouter.post('/', (req: Request<{}, {}, ReqBodyType>, res: Response) => {
});

postsRouter.put('/:id', (req: Request<{ id: string }, {}, ReqBodyType>, res: Response) => {
    console.log(req.body)
    res.status(204).send('OK')
});


postsRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {

    res.status(204).send()
});
