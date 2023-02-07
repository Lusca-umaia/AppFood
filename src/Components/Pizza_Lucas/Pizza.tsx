//Style
import './style.scss'

//Hooks
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from 'react-router-dom'

//Imgs
import Star from '../../assets/Vector.svg'
import X from './X.png'

//Components
import BoxProduct from "./BoxProduct/BoxProduct"
import NavBar from "../NavBar/NavBar"
import Requests from "./Request/Requests"

//Intefaces
export interface IProducts {
    idRestaurante?: number,
    nome?: string,
    url?: string
    valor?: number,
    promocao?: string,
    valorPromocional?: number,
    descricao?: string
    quantidade?: number
}

import { IRestaurants } from "../Home/Home"

const Pizza: React.FC = () => {
    //Identificação do restaurante
    const { id } = useParams()

    //Armazenamento 
    let arrayLocal = (localStorage.getItem(`Products${id}`))
    let arrayStorage: Array<IProducts> = (localStorage.getItem(`Products${id}`) != null ? JSON.parse(arrayLocal ? arrayLocal : '') : [])

    //Informações referentes ao restaurante
    const [restaurant, setRestaurant] = useState<IRestaurants[]>([])

    //Informações dos produtos do restaurante escolhido
    const [product, setProduct] = useState<IRestaurants[]>([])

    //Armazena um array que conterá o pedido do cliente, com os produtos e sua quantidade
    const [arrayProduct, setArrayProduct] = useState<IProducts[]>(arrayStorage ? arrayStorage : [])

    //Controle do modal
    const [modal, setModal] = useState(false)

    //Constante de renderização, que torna a atualização dos dados imediata
    const [render, setRender] = useState(0)

    async function renderRestaurant() {
        const restaurantsValues = await axios.get('https://apigenerator.dronahq.com/api/dstqgR3A/restaurantes')
        setRestaurant(restaurantsValues.data.filter((item: IRestaurants) => item.id == id))
    }

    async function renderProducts() {
        const productsValues = await axios.get('https://apigenerator.dronahq.com/api/3yNrDssc/produtos')
        const dataProducts = productsValues.data.filter((item: IProducts) => item.idRestaurante == id)

        if (arrayStorage.length == 0) {
            let value = dataProducts

            value.forEach((item: IProducts) => {
                item.quantidade = 0
            })

            setProduct(value)
        }

        else {
            let filterArray = dataProducts

            let produtosTotal: Array<IProducts> = []
            filterArray.forEach((item: IProducts) => {
                arrayStorage.forEach((element: IProducts) => {
                    if (item.nome == element.nome) {
                        item.quantidade = element.quantidade
                    }
                })
                produtosTotal.push(item)
            })

            setProduct(produtosTotal)
        }
    }

    useEffect(() => {
        renderRestaurant()
        renderProducts()
    }, [])

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

    function AddProduct(click: number, setClick: (value: React.SetStateAction<number>) => void, item: IProducts) {
        if (click == 0) {
            item.quantidade = click + 1
            localStorage.setItem(`Products${id}`, JSON.stringify([...arrayProduct, item]))
            setArrayProduct([...arrayProduct, item])
        }

        else {
            arrayProduct.forEach((value) => {
                if (value.nome == item.nome) {
                    value.quantidade = click + 1
                }
            })

            localStorage.setItem(`Products${id}`, JSON.stringify(arrayProduct))
            setArrayProduct(arrayProduct)
        }
        setRender(render + 1)
        setClick(click + 1)
    }

    function removeProduct(item: IProducts) {
        arrayProduct.forEach((value, index: number) => {
            if (value.nome == item.nome && value.quantidade) {
                value.quantidade -= 1

                if (!value.quantidade) {
                    arrayProduct.splice(index, 1);
                }
            }
        })

        localStorage.setItem(`Products${id}`, JSON.stringify(arrayProduct))
        setArrayProduct(arrayProduct)
        setRender(render + 1)
    }


    useEffect(() => {
    }, [render])

    return (
        <div>
            <NavBar product={true} modal={() => setModal(true)} />
            <section className="sectionProducts">
                {restaurant[0] && (
                    <div className="containerProducts">
                        <div className="headerContainer">
                            <img src={restaurant[0].url} alt="Logo Restaurante" />
                            <div className='groupDivider'>
                                <h2>{restaurant[0].nome}</h2>
                                <div className="assessment">
                                    <img src={Star} alt="star" height={'60px'} />
                                    <p>{restaurant[0].avaliacao}</p>
                                </div>
                            </div>
                        </div>
                        <h3>Produtos</h3>
                        <section className="sectionRenderProducts">
                            {product &&
                                product.map((item: IProducts) => (
                                    <BoxProduct
                                        item={item}
                                        nome={item.nome}
                                        arrayProduct={arrayProduct}
                                        quantidade={item.quantidade}
                                        descricao={item.descricao}
                                        valor={item.valor}
                                        url={item.url}
                                        promocao={item.promocao}
                                        valorPromocional={item.valorPromocional}
                                        functionClick={AddProduct}
                                    />
                                ))
                            }
                        </section>
                        {modal ? (
                            <div className='effectModal'>
                            </div>
                        ) : null}
                        <section className="modal" style={modal ? { right: '0' } : {}}>
                            <section>
                                <div className="headerModal">
                                    <button onClick={() => setModal(false)}>
                                        <img
                                            src={X}
                                        />
                                    </button>
                                    <p>Seu Pedido em:</p>
                                </div>
                                <h3>{restaurant[0].nome}</h3>
                                {arrayProduct && modal &&
                                    arrayProduct.map((item) => (
                                        <Requests
                                            quantidade={item.quantidade}
                                            valor={item.promocao == "true" ? item.valorPromocional : item.valor}
                                            nome={item.nome}
                                            descricao={item.descricao}
                                            valueArray={item}
                                            removeProduct={removeProduct}
                                        />
                                    ))
                                }
                            </section>
                            <section>
                                <article className='totalArticle'>
                                    <p>Total:</p>
                                    <p>R$ {calculateValueTotal(arrayProduct)}</p>
                                </article>
                                <div className='buttonBox'>
                                    {arrayProduct.length > 0 &&
                                        <button id='ButtonFinalize'>Finalizar Pedido</button>
                                    }
                                </div>
                            </section>
                        </section>
                    </div>
                )
                }
            </section >
        </div >
    )
}

export default Pizza