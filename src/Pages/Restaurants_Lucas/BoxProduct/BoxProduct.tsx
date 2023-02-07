import './style.scss'
import { useEffect, useState } from 'react'

import add from '../../assets/add.svg'

import { IProducts } from '../Restaurant'

interface Ifunction {
    functionClick: (click: number, setClick: (value: React.SetStateAction<number>) => void, item: IProducts) => void
    item: IProducts
    arrayProduct: Array<IProducts>
}

const boxProduct: React.FC<IProducts & Ifunction> = (props) => {
    const [click, setClick] = useState(0)

    function clickControl() {

        if (props.arrayProduct) {
            let arrayFilter = props.arrayProduct

            arrayFilter = arrayFilter.filter((item) => item.nome == props.item.nome)

            if (arrayFilter.length == 1) {
                props.arrayProduct.forEach((element) => {
                    if (element.nome == props.nome) {
                        props.item.quantidade = element.quantidade
                        setClick(element.quantidade ? element.quantidade : 0)
                    }
                })
            }
            else {
                setClick(0)
            }
        }
        else {
            setClick(0)
        }

    }

    useEffect(() => {
        clickControl()
    })

    return (
        <div className="boxProducts">
            <div className="left">
                <h4>{props.nome}</h4>
                <p id="description">{props.descricao}</p>
                <div className="values">
                    {props.promocao == 'false' ? <p>R$ {props.valor}</p> : (
                        <article className='article'>
                            <p style={{ marginRight: '10px' }}>R$ {props.valorPromocional}</p>
                            <p style={{ textDecoration: 'line-through', fontSize: '1.3em', opacity: '.6' }}>R$ {props.valor}</p>
                        </article>
                    )}
                    <button onClick={() => props.functionClick(click, setClick, props.item)}>
                        <img
                            src={add}
                        />
                        {click}
                    </button>
                </div>
            </div>
            <div className="rigth">
                <img src={props.url} height={'150px'} width={'150px'} alt="imagem do produto" />
            </div>
        </div >
    )
}

export default boxProduct
