const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = 5000

app.use(cors())
const API_KEY_VALUE=process.env.API_KEY_VALUE

app.get('/weather', async (req,res)=>{
     try{
        city = req.body.city;
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
