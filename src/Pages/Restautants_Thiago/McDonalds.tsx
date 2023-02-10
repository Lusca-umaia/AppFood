import NavBar from "../NavBar/NavBar";
import "./styles.scss"
import Restaurant from "./RenderRestaurant/RenderRestaurant";
import Product from "./Product/Product";
import { useState } from "react";
import OrdersModal from "./Modal/OrdersModal";
import { StorageProvider } from "./StorageContext/StorageContext";


const McDonalds: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false)

    return (
        <>
            <StorageProvider>
                <NavBar modal={() => setModalVisible(true)} product={true}></NavBar>
                {isModalVisible ? (
                    <OrdersModal OnClose={() => setModalVisible(false)}></OrdersModal>
                ) : null}
                <section className="effect">
                    <div className="content">
                        {isModalVisible ? (
                            <div className="modalEffect">

                            </div>
                        ) : null}
                        <Restaurant></Restaurant>
                        <div className="products">
                            <Product id={1}></Product>
                        </div>
                    </div>
                </section>
            </StorageProvider>
        </>
    )
}

export default McDonalds