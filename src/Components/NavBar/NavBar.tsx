import flit from "../assets/logo.png"
import archivetick from "../assets/archivetick.svg"
import vector from "../assets/Vector.svg"
import Lupa from '../../assets/lupa.png'


import './style.scss'

interface INavBar {
    OnClick: () => void
}

const NavBar: React.FC<INavBar> = (props) => {
    return (
        <nav>
            <div className="logo">
                <img src={flit}></img>
            </div >
            <div className="search">
                <img
                    src={Lupa}
                />
                <input type="text" placeholder="Busque por restaurante" />
            </div>
            <div className="buttons">
                <a href="/orders"><img src={archivetick}></img></a>
                <button onClick={() => { props.OnClick() }}><img src={vector}></img></button>
            </div>
        </nav>
    )
}

export default NavBar