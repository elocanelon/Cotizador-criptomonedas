import styled from "@emotion/styled"

const Resultados = styled.div`
    color: #fff;
    font-family: 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 10px;
`

const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Texto = styled.p`
     font-size: 20px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
     font-size: 24px;
    span{
        font-weight: 700;
    }
`

const Resultado = ({resultado}) => {
    
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado
    return (
        <Resultados>
            <Imagen 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="Imagen criptomoneda" />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span></Precio>
                <Texto>El precio mas alto del dia es de: <span>{HIGHDAY}</span></Texto>
                <Texto>El precio mas bajo del dia es de: <span>{LOWDAY}</span></Texto>
                <Texto>La variacion en el dia es de: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima actualizacion: <span>{LASTUPDATE}</span></Texto>
            </div>
            

        </Resultados>
    )
}

export default Resultado 