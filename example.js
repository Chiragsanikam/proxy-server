const express = require('express')
const cors = require('cors')
const app = express()
const rateLimit=  require('express-rate-limit')
const apicache= require('apicache')
require('dotenv').config()
const port = 5000
const bodyParser= require('body-parser')



app.use(cors())
app.use(bodyParser.json())
const API_KEY_VALUE=process.env.API_KEY_VALUE

//init cache
let cache= apicache.middleware

//rate limiting
const limiter = rateLimit({
  windowMs: 10*60*100, //10 minutes
  limit: 3, //10 requests in 10 minutes each IP
})
app.use(limiter)
app.set('trust proxy', 1)


app.post('/weather',cache('2 minutes'), async (req,res)=>{
     try{
        const city = req.body.city;
        if(!city){
            res.json({error:"city is missing"})
        }
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_VALUE}`)
        const data = await weatherResponse.json()
        const finaldata={
          cityName: data.name,
          temperature:data.main.temp
        }
        res.json(finaldata)
     }
     catch(error){
      console.log(error)
     }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
