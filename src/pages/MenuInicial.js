import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import SideMenu from '../components/Menu/SideMenu'
import './MenuInicial.css'
import TopMenu from '../components/Menu/TopMenu'
import SideConfig from '../components/Config/SideConfig'

export default class MenuInicial extends Component {

  state = {
    modo: this.props.modo,
    session: JSON.parse(localStorage.getItem('session')),
    visible: false,
    message: ""
  }
  footerContent = (
    <div>
      <Button label="Ok" onClick={() => this.setState({ visible: false })} autoFocus />
    </div>
  );
  headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      Aviso
    </div>
  );

  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
  }
  componentDidMount() {
    console.log(this.state.session)
  }
  exibeMensagem = (msg) => {
    this.setState({ message: msg, visible: true })
  }

  render() {
    return (
      <div className='grid'>
        <Dialog visible={this.state.visible} modal
          header={this.headerElement}
          footer={this.footerContent}
          style={{ width: '30%' }}
          onHide={() => { if (!this.state.visible) return; this.setState({ visible: false }); }}>
          <p className="m-0">{this.state.message}</p>
        </Dialog>

        <TopMenu
          alteraModo={this.alteraModo}
          nivel={this.state.session.nivelAcesso}
          exibeMensagem={this.exibeMensagem} />

        {this.state.modo == 1 ?
          <SideMenu
            alteraModo={this.alteraModo}
            nivel={this.state.session.nivelAcesso} />
          :
          <SideConfig
            modo={this.state.modo}
            alteraModo={this.alteraModo}
            nivel={this.state.session.nivelAcesso} />
        }

        <div className='col-10 flex justify-content-center' id="outlet" style={
          { backgroundColor: this.state.modo == 1 ? 'white' : '#ebedee' }}>

          <Outlet context={[this.state.session, this.alteraModo, this.exibeMensagem]} />
        </div>

      </div>
    )
  }
}
