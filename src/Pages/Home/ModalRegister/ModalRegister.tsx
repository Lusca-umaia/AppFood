import './style.scss'

import * as yup from 'yup';

import { Formik, Field, Form, FormikHelpers } from 'formik';

import axios from 'axios';

import X from '../../assets/X_Yellow.svg'

interface Values {
    avaliacao: number;
    categoria: string;
    nome: string;
    sobre: string;
    url: string;
}

interface Ipros {
    modal: () => void
}

const ModalRegister: React.FC<Ipros> = ({ modal }) => {

    async function onSubmit(values: Values) {
        axios.post('https://apigenerator.dronahq.com/api/dstqgR3A/restaurantes', values)
            .then(() => window.location.reload())
            .catch(function (error) {
                console.log(error);
            });
    }

    const schema = yup.object().shape({
        nome: yup.string().required('Preencha o nome'),
        categoria: yup.string().required('Preencha a categoria'),
        sobre: yup.string().required('Preencha esta informação do seu restaurante'),
        avaliacao: yup.number().min(0, 'O mínimo permitido é 0').max(5, 'O máximo permitido é 5').required('Preencha a avaliação'),
        url: yup.string().url('Informe uma url válida').required('Preencha a url')
    });

    return (
        <div className='modal-container'>
            <Formik
                validationSchema={schema}
                validateOnChange={true}
                initialValues={{
                    avaliacao: 0,
                    categoria: '',
                    nome: '',
                    sobre: '',
                    url: '',
                }}
                onSubmit={onSubmit}
                render={({ values, errors, handleChange }) => {
                    return (
                        <section className='modal-agroup'>
                            <h1 id='modal-text'>Cadastrar Restaurante</h1>
                            <button className='modal-buttonClose' onClick={modal}>
                                <img
                                    src={X}
                                    height={'45px'}
                                />
                            </button>
                            <Form className='modal-form'>
                                <div className='modal-groupInput' id='nome_'>
                                    <label htmlFor="nome">Nome:</label>
                                    <Field id="nome" name="nome" placeholder="Mcdonald's" style={values.nome != '' ? { borderColor: '#00243f' } : null} />
                                    {errors.nome && (
                                        <span>{errors.nome}</span>
                                    )}
                                </div>
                                <div className='modal-groupInput' id='categoria_'>
                                    <label htmlFor="categoria">Categoria</label>
                                    <Field id="categoria" name="categoria" placeholder="Lanches" style={values.categoria != '' ? { borderColor: '#00243f' } : null} />
                                    {errors.categoria && (
                                        <span>{errors.categoria}</span>
                                    )}
                                </div>
                                <div className='modal-groupInput' id='url_'>
                                    <label htmlFor="url">Url da Logo</label>
                                    <Field id="url" name="url" placeholder="https://..." style={values.url != '' ? { borderColor: '#00243f' } : null} />
                                    {errors.url && (
                                        <span>{errors.url}</span>
                                    )}
                                </div>
                                <div className='modal-groupInput' id='avaliacao_'>
                                    <label htmlFor="avaliacao">Avaliação</label>
                                    <Field id="avaliacao" name="avaliacao" type='number' style={values.avaliacao != 0 ? { borderColor: '#00243f' } : null} />
                                    {errors.avaliacao && (
                                        <span>{errors.avaliacao}</span>
                                    )}
                                </div>
                                <div className='modal-groupInput' id='sobre_'>
                                    <label htmlFor="sobre">Sobre</label>
                                    <textarea name="sobre" id="sobre" onChange={handleChange} style={values.sobre != '' ? { borderColor: '#00243f' } : {}} />
                                    {errors.sobre && (
                                        <span>{errors.sobre}</span>
                                    )}
                                </div>
                                <button type="submit" id='modal-buttonRegister'>Cadastrar</button>
                            </Form>
                        </section>
                    );
                }}
            >
            </Formik>
        </div>
    );
};

export default ModalRegister