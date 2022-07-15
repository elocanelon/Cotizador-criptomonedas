import styled from "@emotion/styled"
import ImagenCrypto from "./img/imagen-criptos.png"
import Formulario from "./components/Formulario"
import { useEffect, useState } from "react"
import Resultado from "./components/Resultado"
import Spinner from "./components/Spinner"


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
   
  @media(min-width: 502px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px 0 auto 0;
  display: block;

  `

const Heading = styled.h1`
font-family: 'Nunito', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px;
&::after{
  content: '';
  width: 130px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 10px auto 0 auto;
  border-radius: 30px;
}
`
function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado ] = useState({})
  const [cargando, setCargando ] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
        const cotizarCripto =  async() => {
        setCargando(true)
        setResultado({})

        const { moneda, criptomoneda } = monedas
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

          const response = await fetch(url)
          const resultado = await response.json()
          
          setResultado(resultado.DISPLAY[criptomoneda][moneda])

          setCargando(false)
        }

      cotizarCripto()
    } 
  }, [monedas])
  
  return (

    <Contenedor>
      <Imagen 
      src={ImagenCrypto} 
      alt="Fondo de cryptos"/>

      <div>
        <Heading>Cotiza tus criptoMonedas al instante</Heading>
       <Formulario
          setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado  resultado={resultado}/>}
      </div>
    
    </Contenedor>
  )
}

export default App
