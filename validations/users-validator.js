const {check} = require("express-validator");


const insertUserValidation = [
    check('user_first_name').notEmpty().withMessage("first name is required"),
    check('user_last_name').notEmpty().withMessage("Last Name is required"),
    check('user_password').isLength({min: 6}).withMessage("Your password is too short"),
    check('user_password').isStrongPassword().withMessage("Use a combination of lowercase/uppercase numbers and special characters for your pwd"),
    check('user_email').isEmail().withMessage("Wrong Email format.")
];


const updateUserValidation = [
    check('user_id').notEmpty().withMessage("user id is required"),
    check('user_first_name').notEmpty().withMessage("first name is required"),
    check('user_last_name').notEmpty().withMessage("Last Name is required"),
    check('user_password').isLength({min: 6}).withMessage("Your password is too short"),
    check('user_password').isStrongPassword().withMessage("Use a combination of lowercase/uppercase numbers and special characters for your pwd"),
    check('user_email').isEmail().withMessage("Wrong Email format.")
];

const getUserByIdValidation = [
    check('user_id').notEmpty().withMessage("user id is required"),
    check('user_id').isNumeric().withMessage("user id must be a number"),
]


module.exports = {
    insertUserValidation,
    updateUserValidation,
    getUserByIdValidation,
}