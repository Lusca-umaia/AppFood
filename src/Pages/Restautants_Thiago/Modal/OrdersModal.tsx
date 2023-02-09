import { useEffect, useState } from "react"
// @ts-ignore\0
import closeButton from "../../assets/closebutton.png"
import { IProductCard } from "../Product/Product"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Formik, useFormik } from "formik"

interface IModal {
    OnClose: () => void,
}

interface IOrderProducts {
    quantity?: number
    name?: string
    productUrl?: string
}
interface IOrder {
    restaurant?: string
    restaurantUrl?: string
    products?: Array<IOrderProducts>
}

const OrdersModal: React.FC<IModal> = (props) => {
    let arrayLocal = (localStorage.getItem('orders'))
    let arrayStorage: Array<IProductCard> = (localStorage.getItem('orders') != null ? JSON.parse(arrayLocal ? arrayLocal : '') : [])
    const [render, setRender] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    // const formik = useFormik({
    //     initialValues: {
    //         nome: '',
    //         telefone: '',
    //         cpf: '',
    //         email: ''
    //     }, onSubmit: (values) => {
            
    //     },
    //     validate: (values) => {
    //         const errors: {
    //             nome?: string,
    //             telefone?: string;
    //             cpf?: string;
    //             email?: string;
    //         } = {};
    //         if (!values.nome) {
    //             errors.nome = "Preencha esse campo!"
    //         } else if (/[^a-zA-ZÀ-ü]/i.test(values.nome)) {
    //             errors.nome = "Algarismos inválidos!"
    //         }

    //         if (!values.cpf) {
    //             errors.cpf = "Preencha esse campo!"
    //         } else if (!parseInt(values.cpf)) {
    //             errors.cpf = "Insira somente números!"
    //         }

    //         if (!values.email) {
    //             errors.email = "Preencha esse campo!"
    //         } else if (/[^a-zA-ZÀ-ü0-9@_.]/i.test(values.email)) {
    //             errors.email = "Algarismo inválidos!"
    //         }

    //         if (!values.telefone) {
    //             errors.telefone = "Preencha esse campo!"
    //         } else if (!parseInt(values.telefone)) {
    //             errors.telefone = "Insira somente números!"
    //         } else if (values.telefone.length > 9) {
    //             errors.telefone = "Quantidade de números inválido!"
    //         }

    //         return errors
    //     }
    // })

    const removeProduct = (id: number) => {
        arrayStorage.forEach(item => {
            if (id === item.id) {
                item.quantidade--
            }
        })
        localStorage.setItem('orders', JSON.stringify(arrayStorage))
        setRender(render + 1)
    }

    const calculateTotal = () => {
        let total: number = 0
        arrayStorage.forEach(item => {
            total = total + (item.quantidade * (item.promocao === 'true' ? (item.valorPromocional) : (item.valor)))
        })
        return total
    }

    const submitOrder = (e : any) => {
        console.log('teste')
        e.preventDefault()
        let orderRestaurant: IOrder = {}
        let productsArray: IOrderProducts[] = []

        arrayStorage.forEach(product => {
            let productObject: IOrderProducts = {}
            if (product.quantidade > 0) {
                productObject.quantity = product.quantidade
                productObject.name = product.nome
                productObject.productUrl = product.url
                productsArray.push(productObject)
            }
        })

        orderRestaurant.restaurant = "Mcdonald's- Shopping Analia Franco"
        orderRestaurant.restaurantUrl = "https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/7511e4a3-65d9-4851-9c4a-e81cb1180a80/202104061944_XJh4_i.png"
        orderRestaurant.products = productsArray

        axios.post('https://apigenerator.dronahq.com/api/UnmKdzm2/Orders', orderRestaurant)
            .then(() => {
                arrayStorage.forEach(product => {
                    product.quantidade = 0
                })
                localStorage.setItem('orders', JSON.stringify(arrayStorage))
                navigate('/orders')
            })
            .catch(function (error) {
                console.log(error);
            });

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
                                    <div key={item.id} className="order">
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
                        <h3>Total: <span>R${calculateTotal().toFixed(2)}</span></h3>
                        {arrayStorage.map((item) => {
                            if (item.quantidade > 0) {
                                return (
                                    <button key="button" onClick={() => setModalVisible(true)}>Fazer Pedido</button>
                                )
                            }
                        })}
                        {isModalVisible ? (
                                <div className="registerUser">
                                    <form onSubmit={submitOrder}>
                                        <div className="forms">
                                            <label htmlFor="nome">Nome:</label>
                                            <input id="nome" type="text" />

                                            <label htmlFor="cpf">CPF:</label>
                                            <input id="cpf" type="text" />

                                            <label htmlFor="email">E-mail:</label>
                                            <input id="email" type="text" />

                                            <label htmlFor="telefone">Telefone:</label>
                                            <input id="telefone" type="text" />

                                            <button type="submit">Finalizar Pedido</button>
                                        </div>
                                    </form>
                                </div>
                        ) : null}
                    </div>

                </div>

            </div>
        </>
    )
}

export default OrdersModal