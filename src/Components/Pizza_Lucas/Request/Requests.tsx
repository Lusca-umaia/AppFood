import { isHtmlElement } from "react-router-dom/dist/dom"
import { IProducts } from "../Pizza"

interface IRequest {
    valueArray: IProducts
    removeProduct: (item: IProducts) => void
}


const Requests: React.FC<IProducts & IRequest> = (props) => {

    function calculatorValue() {
        if (props.quantidade && props.valor) {
            let value: number | string = props.quantidade * props.valor
            return value.toFixed(2)
        }
    }

    return (
        <div>
            <section className="requests">
                <div className="headerRequests">
                    <p style={{ width: '60%', textAlign: 'justify' }}>{props.quantidade} - {props.nome}</p>
                    <p>R$ {calculatorValue()}</p>
                </div>
                <div className="bodyRequests">
                    <p>{props.descricao} </p>
                    <button onClick={() => props.removeProduct(props.valueArray)}> Remover</button>
                </div>
            </section >
        </div >
    )
}

export default Requests