import addCircle from "../../assets/addcircle.png"
import { useEffect, useState } from "react";
import Order from "../Food Orders/Order.tsx/Order";

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
    id: number,
    data: IProductCard[],
    status: string
}

const arrayOrders: IProductCard[] = []

const Product: React.FC<IProducts> = ({ id, data, status }) => {
    const Products = (products: IProductCard[]) => {
        return products.map((product) => {

            const [quantity, setQuantity] = useState(0)

            const addToArray = (product: IProductCard, array: IProductCard[]) => {
                setQuantity(quantity + 1)
                const newOrder = {
                    idRestaurante: product.idRestaurante,
                    nome: product.nome,
                    url: product.url,
                    valor: product.valor,
                    promocao: product.promocao,
                    valorPromocional: product.valorPromocional,
                    descricao: product.descricao,
                    quantidade: quantity + 1,
                    id: product.id
                }

                array.push(newOrder)

            }

            if (product.idRestaurante === id && product.promocao === "false") {
                return (
                    <div key={product.id} className="product">
                        <div className="leftBox">
                            <h3>{product.nome}</h3>
                            <p>{product.descricao} </p>
                            <div className="bottomLeftBox">
                                <h3>R$ {product.valor.toFixed(2)}</h3>
                                <div className="quantity">
                                    <button onClick={() => addToArray(product, arrayOrders)}><img src={addCircle}></img></button>
                                    <span>{quantity}</span>
                                </div>
                            </div>
                        </div>
                        <div className="rightBox">
                            <img src={product.url}></img>
                        </div>
                    </div>

                )
            } else if (product.idRestaurante === id && product.promocao === "true") {
                return (
                    <div key={product.id} className="product">
                        <div className="leftBox">
                            <h3>{product.nome}</h3>
                            <p>{product.descricao} </p>
                            <div className="bottomLeftBox">
                                <h3>R${product.valorPromocional.toFixed(2)}</h3><span className="noPromotional">R${product.valor.toFixed(2)}</span>
                                <div className="quantity">
                                    <button onClick={() => addToArray(product, arrayOrders)}><img src={addCircle}></img></button>
                                    <span>{quantity}</span>
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
    };
    return (
        <>
            {status === 'loading' && <div className="products">Loading...</div>}
            {status === 'error' && <div className="products">Error fetching products</div>}
            {status === 'success' && <div className="products"><h2 className="title">Produtos</h2>{Products(data)}</div>}
        </>
    );
}

export default Product;