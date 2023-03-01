import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

export function inputValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const arrayErrors = errors.array();
        res.status(400).json({
            errorsMessages: arrayErrors.map((e) => ({message: e.msg, field: e.param}))
        });
    } else {
        next();
    }
}

export const nameValidation = body('name')
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage('field is required and max length 15 symbols')
export const descriptionValidation = body('description')
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage('field is required and max length 500 symbols')
export const websiteUrlValidation = body('websiteUrl')
    .isURL()
export const titleValidation = body('title')
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('field is required and max length 30 symbols')
export const shortDescriptionValidation = body('shortDescription')
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('field is required and max length 100 symbols')
export const contentValidation = body('content')
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('field is required and max length 1000 symbols')
export const blogIdValidation = body('blogId')
    .trim()
    .isLength({min: 1})
    .withMessage('field is required')

