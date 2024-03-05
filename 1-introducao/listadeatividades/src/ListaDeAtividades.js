import React, { Component } from 'react';
import ListaAtividades from './ListaAtividades';

class ListaDeAtividades extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            atividades: []
        };
        this.adicionaAtividade = this.adicionaAtividade.bind(this);
    };

    adicionaAtividade(e) {
        if(this._inputElement.value !== '') {
            var novaAtividade = {
                text: this._inputElement.value,
                key: Date.now()
            }
            
            this.setState((prevState) => {
                return {
                    atividades: prevState.atividades.concat(novaAtividade)
                };
            });

            this._inputElement.value = '';
        };

        console.log(this.state.atividades); 

        e.preventDefault();
    }

    render() {
        return (
            <div className='ListaDeAtividadesMain'>
                <div className='test'>
                    <form onSubmit={this.adicionaAtividade}>
                        <input ref={(a) => this._inputElement = a} placeholder="Entre com sua atividade">
                        </input>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
                <ListaAtividades entradas={this.state.atividades}/>
            </div>
        );
    }
}

export default ListaDeAtividades