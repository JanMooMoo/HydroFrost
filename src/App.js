import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar'
import WelcomePage from './components/welcome-page/WelcomePage'
import ethereumExplorer from './components/Hydro_Ethereum_Explorer/ethereumExplorer'
import SnowflakeExplorerPage from './components/EIN_Explorer/SnowflakeExplorerPage'
import DetailsPage from './components/details-page/DetailsPage'
import DefaultPage from './components/default-page/DefaultPage'
import SideDrawer from './components/navbar/SideDrawer';
import Backdrop from './components/navbar/Backdrop';
import SnowflakeAccount from './components/welcome-page/SnowflakeAccount';




class App extends Component {

  constructor(props){
    super(props)
    this.state = {
        toggle: false,
        sideDrawerOpen:false,
        isOldestFirst:true,
        loading:true,

     }
} 

state = {
  sideDrawerOpen:false
};

drawerToggleClickHandler =()=>{
  this.setState((prevState)=>{
    return {sideDrawerOpen: !prevState.sideDrawerOpen};
  });
 };
   
 
 
 backdropClickHandler =()=>{
   this.setState({sideDrawerOpen:false});
   
  };

  


  render(){

    let backdrop;

    if(this.state.sideDrawerOpen){
      
      backdrop=<Backdrop click={this.backdropClickHandler}/>;
    }


  return (
    <React.Fragment>
      
        <Navbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
      <Switch>
        
        <Route exact path="/" component ={WelcomePage}/>
        <Route path="/Ethereum" component ={ethereumExplorer}/>
        <Route path="/Snowflake" component ={SnowflakeExplorerPage}/>
        <Route path="/Builders" component ={DetailsPage}/>
        <Route exact path="/Accounts/:id" component ={SnowflakeAccount}/>
        <Route component ={DefaultPage}/>
    
      </Switch>

    </React.Fragment>
    
  );
}
}
export default App;
