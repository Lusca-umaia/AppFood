import { IRestaurants } from "../../Home/Home"

// @ts-ignore
import Star from '../../assets/Star.svg'

const HeaderContainer: React.FC<IRestaurants> = (props) => {
    return (
        <div className="headerContainer">
            <img src={props.url} alt="Logo Restaurante" height={'150px'} />
            <div className='groupDivider'>
                <h2>{props.nome}</h2>
                <div className="assessment">
                    <img src={Star} alt="star" height={'60px'} />
                    <p>{props.avaliacao}</p>
                </div>
            </div>
        </div>
    )
}

export default HeaderContainer