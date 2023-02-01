import NavBar from "../NavBar/NavBar"
import './StyleHome.scss'

import BoxRestaurant from "./BoxRestaurant/BoxRestaurant"

const Home: React.FC = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="containerHome">
                <div className="header">
                    <select name="categoria" id="categoria">
                        <option value="">
                            Categoria
                        </option>
                    </select>
                    <select name="ordenar" id="ordenar">
                        <option value="">
                            Ordenar
                        </option>
                    </select>
                </div>
                <h2>Restaurantes</h2>
                <div className="restaurantsBoxs">
                    <BoxRestaurant />
                    <BoxRestaurant />
                    <BoxRestaurant />
                    <BoxRestaurant />
                </div>
            </div>
        </div>
    )
}

export default Home