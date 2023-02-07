import Product from "../../Restautants_Thiago/Product/Product"

interface IOrder {
    data: IOrders[],
    status: string
}

interface IProduct {
    quantity: number,
    name: string,
    productUrl: string
}

interface IOrders {
    restaurant: string,
    restaurantUrl: string,
    products: IProduct[]
    id: number
}

const Order: React.FC<IOrder> = ({ data, status }) => {
    const Orders = (orders: IOrders[]) => {
        return orders.map((order) => {
            return (
                <div key={order.id} className="order">
                    <div className="orderUp">
                        <img src={order.restaurantUrl}></img>
                        <span>{order.restaurant}</span>
                    </div>
                    {order.products.map((product) => {
                        return (
                            <div className="orderBottom">
                                <img src={product.productUrl}></img>
                                <span>{product.quantity} {product.name}</span>
                            </div>
                        )
                    })}
                </div>
            )
        })
    };

    return (
        <>
            {status === 'loading' && <div className="products">Loading...</div>}
            {status === 'error' && <div className="products">Error fetching products</div>}
            {status === 'success' && <div className="products">{Orders(data)}</div>}
        </>
    );
}

export default Order

