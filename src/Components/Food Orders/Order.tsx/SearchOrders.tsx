import axios from "axios";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useQueryClient
} from "react-query"
import Order from "./Order";

const qc = new QueryClient();

async function fetchOrders() {
    const { data } = await axios.get('https://apigenerator.dronahq.com/api/UnmKdzm2/Orders');
    return data
}

function SearchOrders() {
    return (
        <QueryClientProvider client={qc}>
            <SearchOrderssWithData />
        </QueryClientProvider>
    );
}

function SearchOrderssWithData() {
    const queryClient = useQueryClient();
    const {data, status} = useQuery("orders", fetchOrders);
    return <Order data={data} status={status} />;
} 

export default SearchOrders