import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SideConfig = ({ modo, alteraModo, nivel }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const retornar = (path) => {
        if (path.split('/').slice(-2)[0] == "cadastro") {
            navigate(-1)
        } else {
            alteraModo(1)
            navigate("/menu/recentes")
        }
    }

    function selected(path) {
        if (path == location.pathname) {
            return { color: 'white', border: 'solid 2px', borderRadius: '10px' }
        }
    }

    return (
        <div id='side-config' className='col-2 text-center'>
            {nivel <= 1 && modo == 3 ? <div>
                <div className='mt-3' style={{ fontSize: "20px", fontWeight: 'bold' }}>
                    <i className='fi fi-rr-settings' /> Configurações
                </div>
                <br /><hr className='ml-1'/>
                <div>
                    <button onClick={() => navigate('/config/usuarios')}
                        className='side-config-btn' style={selected("/config/usuarios")}>
                        <i className='fi fi-rr-user' /> Usuários</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/config/pendentes')}
                        className='side-config-btn' style={selected("/config/pendentes")}>
                        <i className='fi fi-rr-shield-exclamation' /> Pendentes</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/config/audit')}
                        className='side-config-btn' style={selected("/config/audit")}>
                        <i className='fi fi-rr-shield-check' /> Auditoria</button>
                </div>
                <br />
            </div> : <div />}
            {nivel <= 2 && modo == 2 ? <div>
                <div className='mt-3' style={{ fontSize: "20px", fontWeight: 'bold' }}>
                    <i className='fi-rr-chart-histogram' /> Inspecionar
                </div>
                <br /><hr className='ml-1'/>
                <div>
                    <button onClick={() => navigate('/inspect/conexoes')}
                        className='side-config-btn' style={selected("/inspect/conexoes")}>
                        <i className='fi fi-rr-database' /> Conexões</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/inspect/templates')}
                        className='side-config-btn' style={selected("/inspect/templates")}>
                        <i className='fi fi-rr-chart-histogram' /> Templates</button>
                </div>
                <br />
            </div> : <div />}
            <hr className='ml-1'/>
            <div>
                <button onClick={() => retornar(location.pathname)} className='side-config-btn'>
                    <i className='fi fi-rr-undo-alt' />
                    {location.pathname.split('/').slice(-2)[0] == "cadastro" ? " Retornar" : " Menu"}
                </button>
            </div>
        </div>
    )
}

export default SideConfig