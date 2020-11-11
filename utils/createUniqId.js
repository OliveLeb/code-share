const { nanoid } = require('nanoid');

const createUniqId = async (req,res,next) => {

    if(!req.params.id) {
        req.id = await nanoid(5);
        return next();
    }
    req.id = req.params.id;
    next();
};

module.exports = createUniqId;