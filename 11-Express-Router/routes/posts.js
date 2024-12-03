const express = require('express')
const router = express.Router();

// handle user routes
router.get('/' , (req , res)=>{
    res.send('Posts is listening');
})

router.post('/' , (req , res)=>{
    res.send('Posts is listening');
})

router.put('/:id' , (req , res)=>{
    res.send('Posts is updating');
})
router.delete('/:id' , (req , res)=>{
    res.send('Posts is deleting');
})

// export the routes
module.exports = router;

