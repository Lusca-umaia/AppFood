// @ts-ignore
import cart from '../assets/cart.svg'
// @ts-ignore
import flit from "../assets/logo.png"
// @ts-ignore
import archivetick from "../assets/archivetick.svg"
// @ts-ignore
import register from "../assets/Vector.svg"
// @ts-ignore
import Lupa from '../assets/lupa.png'
// @ts-ignore
import Return from '../assets/return.png'

import { Link } from "react-router-dom"

import './style.scss'

interface INavBar {
    product?: boolean
    modalRegister?: () => void
    functionSearch?: (value: string) => void
    home?: boolean
    modal?: () => void
}

const NavBar: React.FC<INavBar> = (props) => {
    return (
        <nav>
            <div className="logo">
                <Link to={'/'}><img src={flit} ></img></Link>
            </div >
            {props.home
                ? (
                    <div className="search">
                        <img
                            src={Lupa}
                        />
                        <input type="text" placeholder="Busque por restaurante"
                            onChange={(e) => {
                                if (props.functionSearch) {
                                    props.functionSearch(e.target.value)
                                }
                            }}
                        />

                    </div>
                )
                : (
                    <Link to={'/'}>
                        <div className="return">
                            <img
                                src={Return}
                            />
                            <h2>Restaurantes</h2>
                        </div>
                    </Link>
                )
            }
            <div className="buttons">
                <Link to={'/orders'}><img src={archivetick} /></Link>
                {props.product ? <button onClick={props.modal}><img src={cart}></img></button> : null}
                {props.home ? <button onClick={props.modalRegister}><img src={register}></img></button> : null}
            </div>
        </nav>
    )
}

export default NavBar