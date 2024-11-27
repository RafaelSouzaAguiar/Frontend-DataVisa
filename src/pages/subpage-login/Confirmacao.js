import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logoOriginal.png'

const Confirmacao = () => {
    const navigate = useNavigate()

    return (
        <div className='col-6 text-center'>
            <img src={logo} alt="Logo" id="logo-login" /><br />

            <div className='header-div mt-4' style={{ marginLeft: '0' }}>
                Cadastro Realizado com Sucesso</div>

            <div className="scroll-white"
                style={{ height: "calc(100vh - 230px)", padding: "0px", maxHeight: "275px" }}>

            <div className='mt-4 m-1'>
                <p>
                    Seu cadastro foi concluido com êxito! <br />
                    <br />
                    Seus dados serão analisados pela equipe responsável.
                    Em breve, você receberá um e-mail com o resultado da analise. <br />
                    <br />
                    Agradecemos pela sua paciência.
                </p>
            </div>
            <button className="login-btn mt-2"
                onClick={() => navigate("/login/acesso")}>OK</button>
        </div>
        </div >
    )
}

export default Confirmacao