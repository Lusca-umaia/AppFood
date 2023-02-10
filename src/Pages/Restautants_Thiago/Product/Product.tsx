// @ts-ignore
import addCircle from "../../assets/addcircle.png";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StorageContext } from "../StorageContext/StorageContext";
export interface IProductCard {
    idRestaurante: number,
    nome: string,
    url: string,
    valor: number,
    promocao: string,
    valorPromocional: number,
    descricao: string,
    quantidade: number,
    id: number
}

interface IProducts {
    id: number
}

const Product: React.FC<IProducts> = (props) => {
    let { arrayOrders, setArrayOrders, arrayStorage} = useContext(StorageContext)

    async function fetchProducts() {
        const { data } = await axios.get('https://apigenerator.dronahq.com/api/3yNrDssc/produtos');
        let products = data.filter((product: IProductCard) => {
            return product.idRestaurante === props.id
        })
        products.map((item: IProductCard) => {
            item.quantidade = 0
        })
        setArrayOrders(products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToArray = (functionProduct: IProductCard) => {
        let array = [...arrayStorage]
        array.forEach((product) => {
            if (product.id === functionProduct.id) {
                product.quantidade++
            }
        })
        setArrayOrders(array)
        localStorage.setItem('orders', JSON.stringify(array))
        arrayStorage = JSON.parse(localStorage.getItem('orders') || '')
    }

    const RenderQuantity = (id: number) => {
        let quantity : number = 0
        arrayStorage.map(item => {
            if (id === item.id) {
                quantity = item.quantidade
            }
        })
        return quantity
    }

    return (
        <>
            {
                arrayOrders.map((product) => {
                    if (product.promocao === "false") {
                        return (
                            <div key={product.id} className="product">
                                <div className="leftBox">
                                    <h3>{product.nome}</h3>
                                    <p>{product.descricao} </p>
                                    <div className="bottomLeftBox">
                                        <h3>R$ {product.valor.toFixed(2)}</h3>
                                        <div className="quantity">
                                            <button onClick={() => addToArray(product)}><img src={addCircle}></img></button>
                                            <span>{RenderQuantity(product.id)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightBox">
                                    <img src={product.url}></img>
                                </div>
                            </div>
                        )

                    } else if (product.promocao === "true") {
                        return (
                            <div key={product.id} className="product">
                                <div className="leftBox">
                                    <h3>{product.nome}</h3>
                                    <p>{product.descricao} </p>
                                    <div className="bottomLeftBox">
                                        <h3>R${product.valorPromocional.toFixed(2)}</h3><span className="noPromotional">R${product.valor.toFixed(2)}</span>
                                        <div className="quantity">
                                            <button onClick={() => addToArray(product)}><img src={addCircle}></img></button>
                                            <span>{RenderQuantity(product.id)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightBox">
                                    <img src={product.url}></img>
                                </div>
                            </div>
                        )
                    }

                })
            }
        </>
    )
}

export default Product;