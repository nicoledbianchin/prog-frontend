import React, { Component } from 'react';

class ListaAtividades extends Component {
    criaAtividade(atividade) {
        return <li key={atividade.key}>{atividade.text}</li>
    }

    render() {
        var atividadesEntrada = this.props.entradas;
        var listaAtividades = atividadesEntrada.map(this.criaAtividade);

        return (
            <ul className='theList'>
                {listaAtividades}
            </ul>
        )
    }
}

export default ListaAtividades;