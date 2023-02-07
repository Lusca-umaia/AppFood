import NavBar from "../NavBar/NavBar";

const FoodOrder: React.FC = () => {
    return (
        <>
            <NavBar product={false} />
            <div className="orders">
                <div className="title">
                    <h1>Meus Pedidos</h1>
                </div>
                <div className="order">
                    <div className="orderUp">
                        <img src="https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/7511e4a3-65d9-4851-9c4a-e81cb1180a80/202104061944_XJh4_i.png"></img>
                        <span>Mcdonald's- Shopping Analia Franco</span>
                    </div>
                    <div className="orderBottom">
                        <img src="https://static-images.ifood.com.br/image/upload/t_low/pratos/7511e4a3-65d9-4851-9c4a-e81cb1180a80/202212270445_03jqi4o5dkmu.png"></img>
                        <span>Big Tasty</span>
                    </div>
                </div>
                <div className="order">

                </div>
                <div className="order">

                </div>
            </div>
        </>

    )
}

export default FoodOrder