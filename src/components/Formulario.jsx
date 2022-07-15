import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import useSelectMonedas from "../hooks/useSelectMonedas"
import Error from "./Error"

const InputSubmit = styled.input`
    background-color: #9A97FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }


`

const Formulario = ({setMonedas}) => {


    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)
    

    const monedas = [
        { id: 'USD', nombre: 'Dolar de Estados Unidos'},
        { id: 'MXN', nombre: 'Peso Mexicano'},
        { id: 'EUR', nombre: 'Euro'},
        { id: 'GBP', nombre: 'Libra Esterlina'}
    ]
    const [ moneda, SelectMonedas ] = useSelectMonedas("Elije tu moneda", monedas)
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas("Elije tu criptomoneda", criptos)


    useEffect(() => {
        const consultarApi = async()=> {
            const URL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

            const response = await fetch(URL)
            const result = await response.json()

            

            const arrayCriptos = result.Data.map( cripto => {
                
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                
                return objeto
                
            })
            setCriptos(arrayCriptos)
        } 
        consultarApi()
    }, [])
   
    const handleSubmit = (e) => {
        e.preventDefault()

        if([moneda,criptomoneda].includes("")) {
            setError(true)
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })

    }
    return(
        <>
        {error && <Error>Todos los campos son requeridos</Error> }
        
        <form
                onSubmit={handleSubmit}>
   
            
            <SelectMonedas />

            <SelectCriptomonedas />
            
            <InputSubmit type="submit" value="cotizar" />
        </form>
        </>
        )
}

export default Formulario