import NavBar from "../NavBar/NavBar";
import "./styles.scss"
import Restaurant from "./RenderRestaurant/RenderRestaurant";
import SearchProducts from "./RenderProducts/RenderProducts";
import Product from "./Product/Product";
import { useState } from "react";
import Modal from "./Modal/Modal";

const McDonalds: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false)

    return (
        <>
            <NavBar modal={() => setModalVisible(true)} product={true}></NavBar>
            {isModalVisible ? (
                <Modal OnClose={() => setModalVisible(false)}></Modal>
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

        </>
    )
}

export default McDonalds