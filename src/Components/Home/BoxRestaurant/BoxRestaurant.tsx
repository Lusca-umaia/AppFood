import Star from '../../../assets/Vector.svg'
import './style.scss'

const BoxRestaurant: React.FC = () => {
    return (
        <div className="boxRestaurants">
            <div className="LeftBox">
                <div className="boxLogo">
                    Logo
                </div>
            </div>
            <div className="RightBox">
                <h3>Restaurante 1</h3>
                <div className="groupText">
                    <p className="star">
                        <img src={Star} />
                        5,0
                    </p>
                    <div className="ball"></div>
                    <p style={{ color: "#A5A4A4" }}>Lanches</p>
                </div>
                <p style={{ fontSize: '14px', textAlign: 'justify' }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Id omnis dolore perferendis ipsa nostrum, tempora libero eius nobis rerum vero labore!
                </p>
            </div>
        </div>
    )
}

export default BoxRestaurant