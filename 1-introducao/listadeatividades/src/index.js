import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import ListaDeAtividades from './ListaDeAtividades';

var destination = document.querySelector('#container');

ReactDOM.render(
  <div>
    <ListaDeAtividades/>
  </div>,
  destination
)