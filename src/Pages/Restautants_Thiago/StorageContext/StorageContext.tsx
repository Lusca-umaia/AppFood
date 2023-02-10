import {createContext, useState} from "react";
import { ReactNode } from "react";
import { IProductCard } from "../Product/Product";

interface IContext {
    arrayOrders : IProductCard[],
    setArrayOrders: React.Dispatch<React.SetStateAction<IProductCard[]>>,
    arrayStorage: IProductCard[]
}

export const StorageContext = createContext<IContext>({arrayOrders: [], setArrayOrders : () => {}, arrayStorage : []}) ;

export const StorageProvider : React.FC<{children : ReactNode}> = ({children}) => {
    const [arrayOrders, setArrayOrders] = useState<IProductCard[]>([]);
    let arrayStorage: Array<IProductCard> = JSON.parse(localStorage.getItem('orders') || '');
    const [counter, setCounter] = useState(0)
    
    return (
        <StorageContext.Provider value={{ arrayOrders, setArrayOrders, arrayStorage}}>
            {children}
        </StorageContext.Provider>
    )
}