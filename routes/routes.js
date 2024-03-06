const express = require('express')
const router = express.Router()
const fetch=require('node-fetch')
const url=require('url')
const apicache=require('apicache')
const axios=require('axios')


//env variables
const API_BASE_URL=process.env.API_BASE_URL
const API_KEY_NAME=process.env.API_KEY_NAME
const API_KEY_VALUE=process.env.API_KEY_VALUE

//caching
let cache=apicache.middleware

//proxy logic
router.get('/', cache('2 minutes'), async (req,res,next)=>{

try{

    const params= new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
      
    })

    const response = await axios.get(`${API_BASE_URL}?${params}`);
    res.json(response.data);
}
catch(error){
  res.json({error})
}

})


  
module.exports = router