import { useEffect, useState } from "react"
import { render } from "react-dom"

// @ts-ignore
import closeButton from "../../assets/closebutton.png"
import { IProductCard } from "../Product/Product"



interface IModal {
    OnClose: () => void
    total?: number,
    restaurant?: string
}

const Modal: React.FC<IModal> = (props) => {
    let arrayLocal = (localStorage.getItem('orders'))
    let arrayStorage: Array<IProductCard> = (localStorage.getItem('orders') != null ? JSON.parse(arrayLocal ? arrayLocal : '') : [])
    const [render, setRender] = useState(0)

    const removeProduct = (id: number) => {
        arrayStorage.forEach(item => {
            if (id === item.id) {
                item.quantidade--
            }
        })
        localStorage.setItem('orders', JSON.stringify(arrayStorage))
        setRender(render + 1)
    }

    const CalculateTotal = () => {
        let total: number = 0
        arrayStorage.forEach(item => {
            total = total + (item.quantidade * (item.promocao === 'true' ? (item.valorPromocional) : (item.valor)))
        })
        return total
    }

    useEffect(() => {

    }, [render])

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
                        {arrayStorage.map((item) => {
                            if (item.quantidade > 0) {
                                return (
                                    <div className="order">
                                        <span><h4>{item.quantidade}x {item.nome}</h4> R$ {item.promocao === 'true' ? (item.valorPromocional * item.quantidade).toFixed(2) : (item.valor * item.quantidade).toFixed(2)}</span>
                                        <p>{item.descricao}</p>
                                        <button onClick={() => removeProduct(item.id)}>Remover</button>
                                    </div>
                                )
                            }
                        })

                        }
                    </div>

                    <div className="modalFooter">
                        <h3>Total <span>R${CalculateTotal().toFixed(2)}</span></h3>
                        <button>Finalizar Pedido</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Modal