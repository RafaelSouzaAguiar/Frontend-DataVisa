import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import DBClient from '../../utils/DBClient';
import logo from '../../assets/logoOriginal.png'

const Acesso = () => {
    const [value, setValue] = useState('');
    const [view, setView] = useState(false)
    const navigate = useNavigate();
    const [exibeMensagem] = useOutletContext();

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        fazerLogin();
        event.preventDefault();
    }

    async function fazerLogin() {
    console.log(document.getElementById('email').value + " " + document.getElementById('senha').value)

        try {
            await DBClient.get('/dataVisa/user/login', {
                headers: {
                    email: document.getElementById('email').value,
                    senha: document.getElementById('senha').value,
                }
            }).then((res) => {
                if (res.status == 200) {
                    localStorage.setItem('session', JSON.stringify(res.data));
                    navigate('/menu/recentes')
                }
            });
        } catch (error) {
            exibeMensagem("Ocorreu um erro: "
                + error.response.status + " - "
                + error.response.data.mensagemRetorno)
            console.log(error)
        }
    }

    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" />
            <div className='header-div mt-2' >
                Digite seu e-mail e senha, para acessar sua conta.
            </div>

            <div className="scroll-white" style={{ height: "calc(100vh - 275px)", maxHeight:"335px" }}>
                <form onSubmit={onFormSubmit} onChange={handleChange}
                    style={{ marginLeft: '5px' }}>

                    <div className='mt-1' style={{ width: "80%" }}>
                        <label>E-mail
                            <div className="input-div">
                                <input className='input-field' placeholder="Digite seu e-mail"
                                    type="email" id="email" required />
                            </div>
                        </label>
                    </div>

                    <div className='mt-2' style={{ width: "87.8%" }}>
                        <label>Senha
                            <div className="input-div">
                                <input className="input-field" placeholder="Digite sua senha"
                                    type={view == true ? "text" : "password"} id="senha" required />
                                <i className={view == true ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'}
                                    id='eye' onClick={() => setView(!view)} />
                            </div>
                        </label>
                    </div>
                    <button className='login-btn mt-2' type='submit'>
                        Acessar
                    </button>
                </form>
            </div>

            <div style={{ marginLeft: '20px' }}>
                <div className='mt-2'>
                    Esqueceu sua senha?
                    <a onClick={() => navigate("/login/recupera-senha")}
                        className="link ml-1">Clique aqui</a>
                </div>
                <div className="mt-2">
                    Ainda não possui conta?
                    <a onClick={() => navigate("/login/cadastro")}
                        className="link ml-1">Cadastre-se</a>
                </div>
            </div>
        </div>
    )
}

export default Acesso