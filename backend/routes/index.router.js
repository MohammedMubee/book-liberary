const express =require('express')


const router = express.Router();

const usersRouter =require( './users.route');
const bookRouter = require( './book.route');

router.use('/user'.usersRouter)
router.use('/book'.bookRouter)

module . exports = router;