// @ts-ignore
import loading from '../assets/loading.gif'

const Loading: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={loading} alt="loading" width={'100px'} />
        </div>
    )
}

export default Loading