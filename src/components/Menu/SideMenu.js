import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    function selected(path) {
        if (path == location.pathname) return { border: 'solid 2px #366FE1' }
    }
    function selectedCreate() {
        if (location.pathname == "/menu/criar" ||
            location.pathname == "/menu/filtrar" ||
            location.pathname == "/menu/gerar")
            return {
                background: "linear-gradient(44deg, #044BD9 0%, #00A6AB 100%)",
                color: "white", borderColor: "white"
            }
    }


    return (
        <div id='side-menu' className='col-2 text-center'>
            <div>
                <button className='side-menu-create-btn' onClick={() => navigate('/menu/criar')}
                    style={selectedCreate()}>Criar</button>
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/recentes')}
                    className='side-menu-btn' style={selected("/menu/recentes")} >
                    <i className='fi fi-rr-clock' /><br />Recentes</button>
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/pesquisar')}
                    className='side-menu-btn' style={selected("/menu/pesquisar")}>
                    <i className='fi fi-rr-search' /><br />Pesquisar</button>
            </div>

            <div className='relative' style={{ height: "calc(100vh - 400px)" }}>

                {location.pathname == "/menu/criar" || location.pathname == "/menu/filtrar" ?
                    <div className='absolute bottom-0 ml-5'>
                        <button onClick={() => navigate(-1)}
                            className='side-menu-btn'>
                            <i className='fi fi-rr-undo-alt' /> Retornar</button>
                    </div>
                    : <div />
                }
            </div>
        </div>
    )
}

export default SideMenu