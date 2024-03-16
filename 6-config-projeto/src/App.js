import logo from './logo1.png';
import './App.css';
import AreaTrabalho from './AreaTrabalho';

function Logo(props) {
  return (
    <header className="App-header">
      <img src={logo} width="200" alt="Logo Unisinos" />
      <h2 className="titulo">{props.titulo}</h2>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Logo titulo="Exemplo React App" />
      <AreaTrabalho></AreaTrabalho>
    </div>
  );
}

export default App;
