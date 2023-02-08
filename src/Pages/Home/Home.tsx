//Style
import './StyleHome.scss'

//Loading
import Loading from '../Loading/Loading'
//Components
import ModalRegister from './ModalRegister/ModalRegister'
import NavBar from "../NavBar/NavBar"
import BoxRestaurant from "./BoxRestaurant/BoxRestaurant"

//Hooks
import axios from "axios"
import { useEffect, useState } from "react"

//Interface
export interface IRestaurants {
    url?: string,
    nome?: string,
    id?: number,
    sobre?: string,
    categoria?: string,
    avaliacao?: number
}

const Home: React.FC = () => {
    //Armazena as informações dos restaurantes
    const [restaurants, setRestaurants] = useState([])

    //Tem o intuito de controlar os filtros, visto que não é alterado
    const [restaurantsTotal, setRestaurantsTotal] = useState([])

    //Todas as categorias
    const [categories, setCategories] = useState<string[]>([])

    //Categoria de filtro
    const [categorie, setCategorie] = useState<string>()

    //Ordem de filtro
    const [order, setOrder] = useState<string>()

    //Constante de renderização, que torna a atualização dos dados imediata
    const [render, setRender] = useState(0)
    const [modal, setModal] = useState(false)


    async function renderRestaurants() {
        const restaurantsValues = await axios('https://apigenerator.dronahq.com/api/dstqgR3A/restaurantes')
        setRestaurants(restaurantsValues.data)
        setRestaurantsTotal(restaurantsValues.data)

        console.log(restaurantsValues.data)

        let categoriesFilter: Array<string> = []
        restaurantsValues.data.forEach((item: IRestaurants) => {
            categoriesFilter.push(item.categoria ? item.categoria : '')
        })

        setCategories(categoriesFilter.filter((item, index) => categoriesFilter.indexOf(item) === index))

    }

    function functionSearch(name: string) {
        //Reseta os filtros para que não prejudiquem a pesquisa
        setOrder('')
        setCategorie('')

        if (name != '') {
            let filterName = restaurantsTotal.filter((item: IRestaurants) => {
                if (item.nome) {
                    return item.nome.toUpperCase().startsWith(name.toUpperCase())
                }
            })
            setRestaurants(filterName)
        }

        else {
            setRestaurants(restaurantsTotal)
        }
    }

    function filterCategories() {
        if (categorie != '') {
            setRestaurants(restaurantsTotal.filter((item: IRestaurants) => item.categoria == categorie))
        }
        else {
            setRestaurants(restaurantsTotal)
            setOrder('')
        }

        setRender(render + 1)
    }

    function ordinationNote() {
        if (order) {
            setOrder(order)
            if (order == 'Crescente') {
                restaurants.sort((a: IRestaurants, b: IRestaurants) => (b.avaliacao ? b.avaliacao : 0) - (a.avaliacao ? a.avaliacao : 0))
                setRestaurants(restaurants)
            }
            else {
                restaurants.sort((a: IRestaurants, b: IRestaurants) => (a.avaliacao ? a.avaliacao : 0) - (b.avaliacao ? b.avaliacao : 0))
                setRestaurants(restaurants)
            }
            setRender(render + 1)
        }
    }


    useEffect(() => {
        renderRestaurants()
    }, [])

    useEffect(() => {
        ordinationNote()
    }, [order])

    useEffect(() => {
        filterCategories()
    }, [categorie])

    useEffect(() => {
    }, [render])

    return (
        <div className='home'>
            <NavBar home={true} functionSearch={functionSearch} modalRegister={() => setModal(true)} />
            <div className="containerHome">
                <div className="header">
                    <select name="categoria" id="categoria" value={categorie ? categorie : ''} onChange={(e) => setCategorie(e.target.value)}>
                        <option value="">
                            Categoria - Tudo
                        </option>
                        {categories &&
                            categories.map((element) => (
                                <option value={element}>
                                    {element}
                                </option>
                            ))
                        }
                    </select>
                    <select name="ordenar" id="ordenar" value={order ? order : ''} onChange={(e) => setOrder(e.target.value)}>
                        <option value="">
                            Ordenar
                        </option>
                        <option value="Crescente">
                            Crescente
                        </option>
                        <option value="Decrecente">
                            Decrecente
                        </option>
                    </select>
                </div>
                <h2>Restaurantes</h2>
                {restaurants.length == 0 ? (
                    <Loading />
                ) : null}
                <div className="restaurantsBoxs">
                    {restaurants &&
                        restaurants.map((item: IRestaurants) => (
                            <BoxRestaurant
                                categoria={item.categoria}
                                nome={item.nome}
                                sobre={item.sobre}
                                url={item.url}
                                avaliacao={item.avaliacao}
                                id={item.id}
                            />
                        ))
                    }
                </div>
                {modal ? <div className='effectBlur'></div> : null}
                {modal ? <ModalRegister modal={() => setModal(false)} /> : null}
            </div>
        </div >
    )
}

export default Home