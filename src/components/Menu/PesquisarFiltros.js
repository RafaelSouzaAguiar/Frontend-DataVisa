import React, { useEffect, useState } from 'react'
import { Checkbox } from "primereact/checkbox";

const PesquisarFiltros = ({
    checkedTodos, setCheckedTodos,
    checkedPizza, setCheckedPizza,
    checkedLinhas, setCheckedLinhas,
    checkedBarras, setCheckedBarras,
    checkedPlan, setCheckedPlan,
    qtd
}) => {

    const [controle, setControle] = useState(0)

    useEffect(() => {
        if (checkedPizza == true
            && checkedBarras == true
            && checkedLinhas == true
            && checkedPlan == true) {
            setCheckedTodos(true)
        } else {
            setCheckedTodos(false)
        }
    }, [controle])

    const checkTodos = (e) => {
        setCheckedPizza(e)
        setCheckedLinhas(e)
        setCheckedBarras(e)
        setCheckedPlan(e)
        setControle(controle + 1)
    }
    const uncheckTodos = (e) => {
        if (e == false) {
            setCheckedTodos(false)
        }
        setControle(controle + 1)
    }

    return (
        <div className="col-12">

            <div>Modelos Encontrados:<br/>{qtd}</div>
            <div className="mt-3 mb-3"><hr /></div>

            <div className="font-bold">Tipo de modelo</div>

            <div className="flex align-items-center mt-1">
                <Checkbox inputId="checkTodos"
                    onChange={e => checkTodos(e.checked)} checked={checkedTodos}>
                </Checkbox>
                <label htmlFor="checkTodos" className='ml-2'>Todos</label>
            </div>

            <div className='mt-2' style={{ fontSize: "14px" }}>Gráficos</div>
            <div className="flex align-items-center mt-1 ml-2">
                <Checkbox inputId="checkPizza"
                    onChange={e => {
                        setCheckedPizza(e.checked)
                        uncheckTodos(e.checked)
                    }} checked={checkedPizza}>
                </Checkbox>
                <label htmlFor="checkPizza" className='ml-2'>Gráfico de Pizza</label>
            </div>

            <div className="flex align-items-center mt-1 ml-2">
                <Checkbox inputId="checkLinhas"
                    onChange={e => {
                        setCheckedLinhas(e.checked)
                        uncheckTodos(e.checked)
                    }} checked={checkedLinhas}>
                </Checkbox>
                <label htmlFor="checkLinhas" className='ml-2'>Gráfico de Linhas</label>
            </div>

            <div className="flex align-items-center mt-1 ml-2">
                <Checkbox inputId="checkBarras"
                    onChange={e => {
                        setCheckedBarras(e.checked)
                        uncheckTodos(e.checked)
                    }} checked={checkedBarras}>
                </Checkbox>
                <label htmlFor="checkBarras" className='ml-2'>Gráfico de Barras</label>
            </div>

            <div className='mt-2' style={{ fontSize: "14px" }}>Outros</div>
            <div className="flex align-items-center mt-1 ml-2">
                <Checkbox inputId="checkPlan"
                    onChange={e => {
                        setCheckedPlan(e.checked)
                        uncheckTodos(e.checked)
                    }} checked={checkedPlan}>
                </Checkbox>
                <label htmlFor="checkPlan" className='ml-2'>Planilha</label>
            </div>

        </div>
    )
}

export default PesquisarFiltros