import Star from '../../../assets/Vector.svg'

import { IRestaurants } from '../Home'

import { Link } from 'react-router-dom'

import './style.scss'

const BoxRestaurant: React.FC<IRestaurants> = (props) => {


    return (
        <Link to={`/Pizza/${props.id}`}>
            <div className="boxRestaurants">
                <div className="LeftBox">
                    <img
                        src={props.url}
                        height={'150px'}
                    />
                </div>
                <div className="RightBox">
                    <h3 style={{ color: '#000' }}>{props.nome}</h3>
                    <div className="groupText">
                        <p className="star">
                            <img src={Star} />
                            {props.avaliacao}
                        </p>
                        <div className="ball"></div>
                        <p style={{ color: "#A5A4A4" }}>{props.categoria}</p>
                    </div>
                    <p style={{ fontSize: '14px', textAlign: 'justify', color: '#000' }}>
                        {props.sobre}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default BoxRestaurant