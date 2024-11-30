import { body } from "express-validator";

export const registerValidation = [
    body("username")
        .isString()
        .withMessage("Username must be a string.")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long."),
    body("password")
        .isString()
        .withMessage("Password must be a string.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),
    body("email").isEmail().withMessage("Email must be a valid email address.")
];

export const loginValidation = [
    body("username").isString().withMessage("Username must be a string."),
    body("password").isString().withMessage("Password must be a string.")
];
