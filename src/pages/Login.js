import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import waves from '../assets/login.jpg'
import './Login.css'

export default class Login extends Component {

  state = {
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

  exibeMensagem = (msg) => {
    this.setState({ message: msg, visible: true })
  }

  render() {
    return (
      <div className='grid justify-content-center' id='background'>
        <Dialog visible={this.state.visible} modal
          header={this.headerElement}
          footer={this.footerContent}
          style={{ width: '30%' }}
          onHide={() => { if (!this.state.visible) return; this.setState({ visible: false }); }}>
          <p className="m-0">
            {this.state.message}
          </p>
        </Dialog>

        <div className='grid nested-grid mt-6' id="panel">

          <Outlet context={[this.exibeMensagem]} />

          <div className='col-6 p-0 h-full'>
            <img id="waves" src={waves} />
          </div>

        </div >
      </div >
    )
  }
}