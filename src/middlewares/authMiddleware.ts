import {NextFunction, Request, Response} from 'express'

const credentials = {
    login: 'admin',
    password: 'qwerty'
}

let data = `${credentials.login}:${credentials.password}`;
let buff = new Buffer(data);
let base64data = buff.toString('base64');

export let auth = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        res.send(401)
        return
    }
    if (authHeader && authHeader === `Basic ${base64data}`) {
        next();
    } else {
        res.send(401)
        return
    }
}