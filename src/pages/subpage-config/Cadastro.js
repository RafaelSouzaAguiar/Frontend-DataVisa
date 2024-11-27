import React from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import CadastroUser from '../../components/Config/CadastroUser'
import CadastroDb from '../../components/Config/CadastroDb';
import CadastroTemplate from '../../components/Config/CadastroTemplate';

const Cadastro = () => {
    const [session, alteraModo, exibeMensagem] = useOutletContext();
    const location = useLocation();

    switch (location.pathname) {
        case "/config/cadastro/usuario":
            return <CadastroUser exibeMensagem={exibeMensagem}/>

        case "/inspect/cadastro/conexao":
            return <CadastroDb 
                exibeMensagem={exibeMensagem}
                session={session}/>
        case "/inspect/cadastro/template":
            return <CadastroTemplate 
                exibeMensagem={exibeMensagem}
                session={session}/>
        default:
            return alert("Pagina não encontrada")
    }
}

export default Cadastro