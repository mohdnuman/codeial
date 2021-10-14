const express=require('express');
const router=express.Router();

const postsApiController=require("../../../controllers/api/v1/posts_api.js");

router.get('/',postsApiController.index);
router.delete('/:id',postsApiController.destroy);

module.exports=router;