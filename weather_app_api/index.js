const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

/*1*/app.get('/weather',async(req,res)=>{
  const city = req.query.city;
  const key = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`
    );
    res.json(response.data);
  } catch(error) {
    res.status(500).json({
      error: 'Erro ao buscar dados do tempo'
    })
  }
  });

  app.listen(3001,()=>{
    console.log('Servidor rodando na porta 3001');
  });


  /*
    ASYNC + AWAIT
     Em:
     app.get('/weather', async (req,res)=> {
      const city = req.query.city;
      const key = process.env.WEATHER_API_KEY;
      try{
        const city = await axious.get(`https://....`)
        res.json(response.data);
      }catch(error){
        res.status(500).json({
          error: 'Erro ao buscar dados'})
     })

     A sintaxe: app.get('/weather', async(req,res)=>{...}) é uma versão de função mais simplificada, na qual a função é definida diretamente na rota.
     Uma outra forma de definir esta função seria:
     async function weatherApp(req,res){
      const city = req.querry.city.
      const key = process.env.WEATHER_API_KEY;
      try{
        const city = 
        await axious.get('https://...')
        res.JSON(response.data);
     } catch(error){
        res.status(500).json({
          error: 'Erro ao buscar dados'})
      }

    **axios é uma biblioteca para fazer requisições HTTP.
    

  
  
  
  
  */