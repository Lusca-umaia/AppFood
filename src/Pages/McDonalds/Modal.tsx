import closeButton from "../assets/closebutton.png"
import { IProductCard } from "./Product"

interface IModal {
    OnClose: () => void,
    total: number,
    restaurant: string
}

const Modal: React.FC<IModal> = (props) => {
    const orders: string | null = localStorage.getItem('order')
    const logger = () => {
        console.log(orders)
    }
    return (
        <>
            <div className="backdrop">
                <div className="modal">
                    <div className="modalHeader">
                        <button onClick={() => props.OnClose()}><img src={closeButton}></img></button>
                        <span>Seu pedido em </span>
                        <h3>Mcdonald's- Shopping Analia Franco</h3>
                    </div>
                    <div className="modalContent">
                        <div className="order">
                            <span><h4>1x Big Tasty</h4> R$ 24.99</span>
                            <p>Composto pelo nosso pão tipo brioche, hambúrguer de carne 100% bovina, a nova Méquinese, exclusiva maionese especial com sabor de carne defumada, alface, tomate, fatias de bacon e queijo sabor cheddar, acompanhamento e bebida</p>
                            <button onClick={logger}>Remover</button>
                        </div>

                    </div>

                    <div className="modalFooter">
                        <h3>Total <span>R${props.total}</span></h3>
                        <button>Finalizar Pedido</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Modal