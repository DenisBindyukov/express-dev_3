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

