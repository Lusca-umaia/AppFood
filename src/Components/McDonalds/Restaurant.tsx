import { useEffect, useState } from "react";
import axios from "axios"
import star from "../../assets/Vector.svg"

interface IRestaurant {
    url: string,
    nome: string,
    categoria: string,
    avaliacao: number,
    sobre: string,
    id: number
}

const Restaurant: React.FC = () => {
    const [restaurant, setRestaurant] = useState({
        url: '',
        nome: '',
        categoria: '',
        avaliacao: 0,
        sobre: '',
    })

    useEffect(() => {
        getRestaurant()
    }, [])

    async function fetchRestaurant(id : number) {
        const {data} = await axios.get('https://apigenerator.dronahq.com/api/dstqgR3A/restaurantes/' + id)  
        return data
    }

    async function getRestaurant() {
        const data: IRestaurant = await fetchRestaurant(1);
        const place = {url : data.url, nome: data.nome, categoria : data.categoria, avaliacao: data.avaliacao, sobre: data.sobre}
        setRestaurant((place))
    }
    return (
        <div className="restaurant">
            <img className="logo" src={restaurant.url}></img>
            <h1 className="restaurantText">
                {restaurant.nome}
                <span className="star">
                    {restaurant.avaliacao}
                    <img src={star}></img>
                </span>
            </h1>
        </div>
    )
}

export default Restaurant;

