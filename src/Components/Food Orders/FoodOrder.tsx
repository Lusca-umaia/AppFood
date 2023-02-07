import NavBar from "../NavBar/NavBar";
import "./styles.scss"
import Order from "./Order.tsx/Order";
import SearchOrders from "./Order.tsx/SearchOrders";

const FoodOrder: React.FC = () => {
    return (
        <>
            <NavBar product={false} />
            <div className="orders">
                <div className="title">
                    <h1>Meus Pedidos</h1>
                </div>
                <SearchOrders></SearchOrders>
            </div>
        </>

    )
}

export default FoodOrder