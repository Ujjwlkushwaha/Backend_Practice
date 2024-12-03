const express = require('express')
const router = express.Router();

// handle user routes
router.get('/' , (req , res)=>{
    res.send('User is listening');
})

router.post('/' , (req , res)=>{
    res.send('User is listening');
})

router.put('/:id' , (req , res)=>{
    res.send('User is updating');
})
router.delete('/:id' , (req , res)=>{
    res.send('User is deleting');
})

// export the routes
module.exports = router;

