import React, { useState } from 'react'
import logo from '../../assets/logoOriginal.png'
import { useNavigate, useOutletContext } from 'react-router-dom';

const RecuperaSenha = () => {
    const [value, setValue] = useState('');
    const [exibeMensagem] = useOutletContext();
    const navigate = useNavigate()


    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        resetarSenha(document.getElementById('email').value);
        event.preventDefault();
    }
    async function resetarSenha(email) {
        exibeMensagem("Nova senha enviada para o email " + email)
        navigate("/login/acesso")
    }

    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" />
            <div className='header-div mt-2'>Redefinir senha</div>

            <div className="scroll-white"
                style={{ height: "calc(100vh - 275px)", padding: "0px", maxHeight: "335px" }}>
                <form onChange={handleChange} onSubmit={onFormSubmit}
                    style={{ marginLeft: '20px', marginTop: '10px' }}>

                    <div className='mt-1'>
                        <label>E-mail
                            <div className="input-div" style={{ width: "80%" }}>
                                <input className="input-field" placeholder="Digite seu e-mail"
                                    type="email" id="email" required />
                            </div>
                        </label>
                    </div>

                    <button className='login-btn mt-2' type='submit'>
                        Confirmar
                    </button>

                    <div className='mr-3'>
                        <p>
                            Uma nova senha será enviada para a conta do e-mail informada acima.
                            <br /><br />
                            Caso tenha dificuldades com a recuperação, solicite a alteração para um administrador
                            de sua empresa ou o suporte DataVisa.
                        </p>
                    </div>
                </form>
            </div>
            <div className='mt-2' style={{ marginLeft: '20px' }}>
                <div className='mt-2'>
                    Já possui conta?
                    <a onClick={() => navigate("/login/acesso")}
                        className="link ml-1">Clique Aqui</a>
                </div>
                <div className='mt-2'>
                    Ainda não possui conta?
                    <a onClick={() => navigate("/login/cadastro")}
                        className="link ml-1">Cadastre-se</a>
                </div>

            </div>
        </div>
    )
}

export default RecuperaSenha