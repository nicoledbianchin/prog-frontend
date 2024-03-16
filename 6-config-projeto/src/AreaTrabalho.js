import React, { Component } from "react";

const NotaContext = React.createContext();

function Menu(props) {
    return (
        <nav id="Menu" style={{ padding: 10, width: '100vw', textAlign: 'center' }}>
            <button id="carregar" onClick={props.carregarDados}>Carregar Dados</button>
            <button id="nova" onClick={props.novaNota}>Nova Nota</button>
            <button id="enviar" onClick={props.enviar}>Enviar Dados</button>
        </nav>
    );
}   


class Editor extends Component {
    constructor(props) {
        super(props);
        const nota = { id: -1, titulo: '', texto: '', categoria: '' }
        this.state = {
            id: nota.id,
            titulo: nota.titulo,
            texto: nota.texto,
            categoria: nota.categoria,
            lista: props.items
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleTitleChange(event) {
        this.setState({ titulo: event.target.value });
    }

    handleTextChange(event) {
        this.setState({ texto: event.target.value });
    }

    handleCategoryChange(event) {
        this.setState({ categoria: event.target.value });
    }

    handleSubmit(event) {
        this.props.salvar({
            id: this.state.id >= 0 ?
                this.state.id :
                this.state.lista.length,
            titulo: this.state.titulo,
            texto: this.state.texto,
            categoria: this.state.categoria
        })
        this.setState(state => (
            { id: -1, titulo: '', texto: '', categoria: '' }
        ))

        event.preventDefault();
    }

    render() {
        const id = this.context;
        const nota = id >= 0 ? this.state.lista[id] : this.state;
        return (
            <form onSubmit={this.handleSubmit} id="Form" style={{ marginLeft: 10 }}>
                <h2>Editor</h2>
                <label htmlFor="ttl">Título da Nota:</label>
                <br />
                <input name="ttl" type="text" value={nota.titulo} size="30"
                    onChange={this.handleTitleChange} />
                <br />
                <br />
                <label htmlFor="txt">Text:</label>
                <br />
                <textarea name="txt" value={nota.texto} rows="4" cols="30"
                    onChange={this.handleTextChange} />
                <br />
                <br />
                <label htmlFor="ctgr">Category:</label>
                <br />
                <select name="ctgr" value={nota.categoria}
                    onChange={this.handleCategoryChange}>
                    <option value="">Selecione uma categoria</option>
                    <option value="Backlog">Backlog</option>
                    <option value="ToDo">ToDo</option>
                    <option value="Done">Feito</option>
                    <option value="Canceled">Cancelada</option>
                </select>
                <br />
                <br />
                <button type="submit" value="Submit">Salvar</button>
            </form>
        );
    }
}
Editor.contextType = NotaContext;

class AreaTrabalho extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selecionada: {
                id: -1,
                titulo: '',
                texto: '',
                categoria: ''
            },
            lista: []
        }

        this.selecionaNota = this.selecionaNota.bind(this);
        this.salvar = this.salvar.bind(this);
        this.carregarDados = this.carregarDados.bind(this);
        this.enviar = this.enviar.bind(this);
    }

    carregarDados() {
        fetch('http://localhost:3003/task')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // this.setState(state => ({
                //     lista: responseJson.list
                // }));
                for (let index = 0; index < responseJson.list.length; index++) {
                    const element = responseJson.list[index];
                    this.state.lista.push(element);
                }
            });
    }

    selecionaNota(e) {
        let nota;
        if (e.target.id === 'nova') {
            nota = {
                id: -1,
                titulo: '',
                texto: '',
                categoria: ''
            }
        } else {
            const id = parseInt(e.target.id);
            nota = this.state.lista[id];
        }
        this.setState(state => ({
            selecionada: nota
        }));
    }

    enviar(event) {
        event.preventDefault();
        fetch('http://localhost:3003/task', {
            method: 'POST',  // POST - para atualizar dados!!!
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list: this.state.lista
            }),
        }).then((response) => response.text())
            .then((responseText) => {
                alert('Resposta back-end: ' + responseText);
            });
    }

    salvar(nota) {
        const selecionada = this.state.selecionada;
        selecionada.titulo = nota.titulo;
        selecionada.texto = nota.texto;
        selecionada.categoria = nota.categoria;
        if (selecionada.id < 0) {
            selecionada.id = nota.id;
            // const lista = this.state.lista;
            this.state.lista.push(nota);
        }
        this.setState(state => ({
            selecionada: selecionada
        }));
    }

    render() {
        let listItems = [];
        const lista = this.state.lista;
        if (lista) {
            listItems = lista.map((it) =>
                <li key={it.id} id={it.id} 
                    className={it.categoria} 
                    onClick={(e) => this.selecionaNota(e)}
                    style={{padding: 4, marginRight: 10, borderBottom: '0.75pt solid lightgray'}}>
                    {it.titulo}
                </li>
            );
        }
        return (
            <div>
                <Menu
                    novaNota={this.selecionaNota}
                    carregarDados={this.carregarDados}
                    enviar={this.enviar}>
                </Menu>
                <div id="App-Editor" style={{ padding: 10 }}>
                    <div id="lista" style={{ width: '20%' }}>
                        <h2>Lista de Notas</h2>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                    <NotaContext.Provider value={this.state.selecionada.id}>
                        <Editor items={this.state.lista} salvar={this.salvar}></Editor>
                    </NotaContext.Provider>
                </div>
            </div>
        );
    }

}

export default AreaTrabalho;