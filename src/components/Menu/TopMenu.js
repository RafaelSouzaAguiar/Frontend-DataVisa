import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import DBClient from '../../utils/DBClient';
import logo from '../../assets/logoBranco.png'

const TopMenu = ({ alteraModo, nivel, exibeMensagem }) => {
    const navigate = useNavigate();
    const user = useRef(null);
    const config = useRef(null);
    const inspect = useRef(null);

    function navegar(e, panel, path) {
        if (path == "usuarios" || path == "pendentes" || path ==  "auditoria") {
            alteraModo(3)
            navigate('/config/' + path)
        } else {
            if (path == "conexoes" || path == "templates") {
                alteraModo(2)
                navigate('/inspect/' + path)
            } else {
                alteraModo(1)
                navigate('/menu/' + path)
            }
        }
        panel.current.toggle(e)
    }
    const confirmLogout = () => {
        confirmDialog({
            message: "Deseja mesmo deslogar?",
            header: 'Confirmar ação',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            rejectLabel: "Não",
            acceptLabel: "Sim",
            accept() {
                deslogar()
            },
            reject() {
                return
            }
        })
    }
    async function deslogar() {
        try {
            await DBClient.get('/dataVisa/user/logout').then(
                (res) => {
                    console.log(res)
                    if (res.status == 200) {
                        exibeMensagem(res.data)
                        localStorage.clear()
                        navigate("/login/acesso")
                    }
                }
            )
        } catch (error) {
            exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
                error.response.data)
            console.log(error)
        }
    }

    return (
        <div id='top-menu' className='grid col-12'>
            <ConfirmDialog />
            <div className='col-2 flex align-items-center justify-content-center mt-3'>
                <img src={logo} alt="Logo" id="logo-menu" onClick={() => {
                    alteraModo(1)
                    navigate('/menu/recentes')
                }} />
            </div>

            <div className='col-3 col-offset-7 flex align-items-center justify-content-center mt-3'>
                {nivel <= 2 ?
                    <div>
                        <button className="top-menu-btn pt-2" onClick={(e) => inspect.current.toggle(e)}>
                            <i className='icon-white fi fi-rr-chart-histogram' />
                        </button>
                        <OverlayPanel ref={inspect}>
                            <div className='justify-content-center text-center'>
                                <i className='icon-black fi fi-rr-chart-histogram' style={{ fontSize: '20px' }} />
                                <br />
                                <div style={{ fontWeight: 'bold', color: 'black' }}>Inspecionar</div>
                                <button className='top-menu-btn-config'
                                    onClick={(e) => { navegar(e, inspect, "conexoes", 2) }}>Conexões</button>
                                <br />
                                <button className='top-menu-btn-config'
                                    onClick={(e) => { navegar(e, inspect, "templates", 2) }}>Templates</button>
                            </div>
                        </OverlayPanel>
                    </div> : <div />}

                {nivel <= 1 ?
                    <div>
                        <button className="top-menu-btn pt-2" onClick={(e) => config.current.toggle(e)}>
                            <i className='icon-white fi fi-rr-settings' />
                        </button>
                        <OverlayPanel ref={config}>
                            <div className='justify-content-center text-center'>
                                <i className='icon-black fi fi-rr-settings' style={{ fontSize: '20px' }} />
                                <br />
                                <div style={{ fontWeight: 'bold', color: 'black' }}>Configurações</div>

                                <button className='top-menu-btn-config'
                                    onClick={(e) => { navegar(e, config, "usuarios", 3) }}>Usuarios</button>
                                <br />
                                <button className='top-menu-btn-config'
                                    onClick={(e) => { navegar(e, config, "pendentes", 3) }}>Pendentes</button>
                                <br />
                                <button className='top-menu-btn-config'
                                    onClick={(e) => { navegar(e, config, "audit", 3) }}>Auditoria</button>
                            </div>
                        </OverlayPanel>
                    </div> : <div />}

                <button className="top-menu-btn pt-2" onClick={(e) => user.current.toggle(e)}>
                    <i className='icon-white fi fi-rr-user' />
                </button>
                <OverlayPanel ref={user}>
                    <div className='justify-content-center text-center'>
                        <i className='icon-black fi fi-rr-user' style={{ fontSize: '20px' }} />
                        <br />
                        <div style={{ fontWeight: 'bold', color: 'black' }}>Usuário</div>

                        <button className='top-menu-btn-config'
                            onClick={(e) => { navegar(e, user, "perfil", 1) }}>Ver Perfil</button>
                        <br />
                        <button className='top-menu-btn-exit'
                            onClick={() => confirmLogout(exibeMensagem)}>Sair</button>
                    </div>
                </OverlayPanel>
            </div>
        </div>
    )
}

export default TopMenu