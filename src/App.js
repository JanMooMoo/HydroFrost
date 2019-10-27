import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar'
import WelcomePage from './components/welcome-page/WelcomePage'
import DetailsPage from './components/details-page/DetailsPage'
import DefaultPage from './components/default-page/DefaultPage'
import ethereumExplorer from './components/Hydro_Ethereum_Explorer/ethereumExplorer'
import EinExplorer from './components/EIN_Explorer/EinExplorer'



class App extends Component {
  render(){
  return (
    <React.Fragment>
      <Navbar/>
      
      <Switch>
        
        <Route exact path="/" component ={WelcomePage}/>
        <Route path="/details" component ={DetailsPage}/>
        <Route path="/Ethereum" component ={ethereumExplorer}/>
        <Route path="/Snowflake" component ={EinExplorer}/>
        <Route component ={DefaultPage}/>
    
      </Switch>

    </React.Fragment>
    
  );
}
}
export default App;
