import React, { Component } from 'react';
import './App.css';
import { PersonaService } from '../../service/PersonaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from '../../components/header';
import Footer from '../../components/footer';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      persona: {
        id: null,
        nome: null,
        orgao: null,
        cpf: null,
        telefone : null,
        status: '1'
      },
      selectedPersona : {

      }
    };
    this.items = [
      {
        label : 'Novo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.personaService.getAll().then(data => this.setState({personas: data}))
  }

  save() {
    this.personaService.save(this.state.persona).then(data => {
      this.setState({
        visible : false,
        persona: {
          id: null,
          nome: null,
          orgao: null,
          cpf: null,
          telefone : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atenção!', detail: 'Registro Salvo.'});
      this.personaService.getAll().then(data => this.setState({personas: data}))
    })
  }

  delete() {
    if(window.confirm("Realmente deseja deleta esse registro?")) {
      this.personaService.delete(this.state.selectedPersona.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atenção!', detail: 'registro eliminado.'});
        this.personaService.getAll().then(data => this.setState({personas: data}));
      });
    }
  }

  render(){
    

    const menuitems = [
      {
         label:'Home',
         icon:'pi pi-fw pi-home',
         command:() => this.props.history.push('/app')
      },
      {
         label:'Sobre',
         icon:'pi pi-fw pi-user',
         command:() => this.props.history.push('/sobre')
      },
      {
         label:'home  ',
         icon:'pi pi-fw pi-comment',
         command:() => this.props.history.push('/home')
      }
   ];

    return (
    
      <div className="App">
      <Menubar model={menuitems}/>
      <Header/>
      <div id="main">
            <main>
                <div className="content" id="content">
                    {this.props.children}
      

      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Paciente" style={{alignItems: 'center'}}>
            <DataTable value={this.state.personas} paginator={true} rows="10" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({selectedPersona: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="nome" header="nome"></Column>
              <Column field="orgao" header="orgao"></Column>
              <Column field="cpf" header="cpf"></Column>
              <Column field="telefone" header="telefone"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.persona.nome} style={{width : '100%'}} id="nome" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.nome = val;

                        return { persona };
                    })}
                  } />
                <label htmlFor="nome">Nome</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.orgao} style={{width : '100%'}} id="orgao" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.orgao = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="orgao">orgao</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.cpf} style={{width : '100%'}} id="cpf" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.cpf = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="cpf">cpf</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.telefone} style={{width : '100%'}} id="telefone" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.telefone = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="telefone">telefone</label>
              </span>
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
      <Footer/>
      </div>
      </main>
      </div>
    </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      persona : {
        nome: null,
        orgao: null,
        cpf: null,
        telefone : null,
        endereco: "CENTRO",
        status:"1"
      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      persona : {
        id: this.state.selectedPersona.id,
        nome: this.state.selectedPersona.nome,
        orgao: this.state.selectedPersona.orgao,
        cpf: this.state.selectedPersona.cpf,
        telefone : this.state.selectedPersona.telefone,
        endereco: "CENTRO",
        status:"1"
      }
    })
  }
}
