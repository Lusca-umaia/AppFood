import NavBar from "../NavBar/NavBar";
import "./styles.scss"
import Restaurant from "./Restaurant";
import SearchProducts from "./SearchProducts";
import { useState } from "react";
import Modal from "./Modal";

const McDonalds: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false)

    return (
        <>
            <NavBar modal={() => setModalVisible(true)} product={true}></NavBar>
            {isModalVisible ? (
                <Modal OnClose={() => setModalVisible(false)}></Modal>
            ) : null}
            <div className="content">
                <Restaurant></Restaurant>
                <SearchProducts></SearchProducts>
            </div>
        </>
    )
}

export default McDonalds