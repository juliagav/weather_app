import React, { useState } from 'react';

function Welcome(){
  const[city, setCity] = useState<string>("");
  const[weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const[loading, setLoading] = useState<boolean>(false);


  async function fetchWeather(){
    setError("");
    setWeather(null);
    setLoading(true);
    const url =`http://localhost:3001/weather?city=${city}`;
    try{
      const response = await fetch(url);
      if(!response.ok){
        setError("city not found or error fetching data");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setWeather(data);
      setCity("");
    } catch(error){
      setError("An error occured while fetching data")
    }
    setLoading(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){ //1 Se o usuário estiver digitando no campo de cidade e apertar Enter, execute a busca do clima
      if(e.key === 'Enter'){
        fetchWeather()
      }
    }

      
  return(
    <div className="weather-app">
     <h1>Weather App</h1>
      <p>Get information about the weather on your location</p>
      <input
      type="text"
      value={city}
      onChange={(e)=> setCity(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Enter city name"
      disabled={loading}
      />
      <button onClick={fetchWeather} disabled={loading || !city }>
        {loading ? "Buscando...": "Buscar"}</button>
      {error && <p style={{color: "red"}}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>         
          <p>{weather.main.temp}ºC</p>
          </div>
      )}
    </div>
  )
}

export default Welcome;


//1 e: Event x e: React.KeyboardEvent<HTMLInputElement>
 /*   Por que Event estava errado?
    No React (com TypeScript), os eventos não usam o tipo nativo do DOM (Event), mas sim tipos especiais que o React fornece.
    O Event do DOM é muito genérico.
    
    Ele não sabe que o evento vem de um <input> e que você pode acessar propriedades como .key.
    Por isso o TypeScript reclama, porque Event não garante que exista .key.
  Exemplo do problema:
      function handleKeyDown(e: Event) {
        console.log(e.key); // ❌ TypeScript não reconhece "key"
      }

2. O que é React.KeyboardEvent<HTMLInputElement>?
  É a forma correta de tipar um evento de teclado em React com TypeScript.
  React.KeyboardEvent<T> → tipo de evento de teclado no React.
  <HTMLInputElement> → especifica em qual elemento esse evento aconteceu (no seu caso, um <input>).
    Ou seja, o TypeScript agora sabe:
    que e.key existe e é uma string,
    que e.target é um <input>, então você pode acessar e.target.value, etc.
  Exemplo:
      function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(e.key);       // ✅ reconhecido
        console.log(e.currentTarget.value); // ✅ reconhecido (é o input)
      }

3. Comparação
  Event → genérico, não sabe nada sobre teclado, nem sobre input.
  React.KeyboardEvent<HTMLInputElement> → evento de teclado, vindo de um input, com todas as propriedades corretas.

👉 Resumindo:
  Você precisa de React.KeyboardEvent<HTMLInputElement> porque:
  Está lidando com um evento de teclado (KeyboardEvent).
  Está lidando com um input (HTMLInputElement).
  O React fornece os tipos certos para garantir que você não acesse propriedades inexistentes.
  
  
  function handleKeyDown(...)

Você está declarando uma função chamada handleKeyDown.
Essa função vai ser usada como handler (ou seja, tratador de evento) no seu <input>:

<input onKeyDown={handleKeyDown} />


  Isso quer dizer: “quando uma tecla for pressionada dentro do input, execute handleKeyDown”.
  2. O parâmetro e: React.KeyboardEvent<HTMLInputElement>
    e é o objeto do evento que o React fornece quando a tecla é pressionada.
  
  Esse objeto contém várias informações, como:
    e.key → qual tecla foi pressionada (Enter, a, Backspace, etc.).
    e.currentTarget → o elemento que disparou o evento (no caso, o <input>).
    e.preventDefault() → se você quiser impedir o comportamento padrão da tecla.

  O React.KeyboardEvent<HTMLInputElement> garante que o TypeScript entenda que esse evento veio de um input de texto.

  3. O if (e.key === 'Enter')
    Aqui você está checando qual tecla foi pressionada.
    Se for Enter, então chama fetchWeather().
   Se for qualquer outra (a, b, Tab, etc.), não faz nada.

4. O que isso representa no fluxo do app?
  Basicamente, esse código permite que o usuário pressione Enter dentro do input em vez de precisar clicar no botão "Buscar".
Fluxo:
  Usuário digita a cidade.
  Pressiona Enter.
  O handleKeyDown detecta a tecla.
 A função fetchWeather() é executada → faz a requisição da API.
 
*/