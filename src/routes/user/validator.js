const { check } = require('express-validator');

module.exports = {
    validateSignup: [
        check('email').isEmail().normalizeEmail().withMessage('should be in email format'),
        check('name').not().isEmpty().trim().escape().withMessage('is mandatory'),
        check('password').not().isEmpty().trim().escape().withMessage('is mandatory'),
        check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ],
    validateLogin: [
        check('email').isEmail().normalizeEmail().withMessage('should be in email format'),
        check('password').not().isEmpty().trim().escape().withMessage('is mandatory'),
        check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ],
};