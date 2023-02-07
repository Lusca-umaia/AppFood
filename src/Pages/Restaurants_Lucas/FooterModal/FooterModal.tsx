import { IProducts } from "../Restaurant"

interface IProps {
    arrayProduct: Array<IProducts>
}

const FooterModal: React.FC<IProps> = (props) => {

    function calculateValueTotal(arrayProduct_: Array<IProducts>) {
        let valueTotal = 0

        arrayProduct_.forEach((item) => {
            if (item.quantidade && item.valor && item.promocao) {
                let value: number | string = (item.quantidade * (item.promocao == "true" ? (item.valorPromocional ? item.valorPromocional : 0) : item.valor)).toFixed(2)
                valueTotal += parseFloat(value)
            }
        })
        return valueTotal.toFixed(2)
    }


    return (
        <section>
            <article className='totalArticle'>
                <p>Total:</p>
                <p>R$ {calculateValueTotal(props.arrayProduct)}</p>
            </article>
            <div className='buttonBox'>
                {props.arrayProduct.length > 0 &&
                    <button id='ButtonFinalize'>Finalizar Pedido</button>
                }
            </div>
        </section>
    )
}

export default FooterModal