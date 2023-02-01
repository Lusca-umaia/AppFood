import flit from "../assets/logo.png"
import archivetick from "../assets/archivetick.svg"
import vector from "../assets/Vector.svg"

const NavBar: React.FC = () => {
    return (
        <nav>
            <div className="logo">
                <img src={flit}></img>
            </div>
            <div className="search">
                <input type="text"></input>
            </div>
            <div className="buttons">
                <a><img src={archivetick}></img></a>
                <img src={vector}></img>
            </div>
        </nav>
    )
}

export default NavBar