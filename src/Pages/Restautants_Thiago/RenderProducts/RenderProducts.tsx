import axios from "axios";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useQueryClient
} from "react-query"
import Product from "../Product/Product";

const qc = new QueryClient();

async function fetchProducts() {
    const { data } = await axios.get('https://apigenerator.dronahq.com/api/3yNrDssc/produtos');
    return data
}

function SearchProducts() {
    return (
        <QueryClientProvider client={qc}>
            <SearchProductsWithData />
        </QueryClientProvider>
    );
}

function SearchProductsWithData() {
    const queryClient = useQueryClient();
    const {data, status} = useQuery("products", fetchProducts);
    return <Product id={1} data={data} status={status} />;
} 

export default SearchProducts;