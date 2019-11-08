import React,{Component} from 'react';
import Title from '../Title/Title';
import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import ReactGA from 'react-ga';
import { RotateSpinner } from "react-spinners-kit";
import Center from 'react-center';
import './togglebutton.css';
import './backtotop.css';
import {Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  } from 'react-bootstrap';

import {logo} from '../../logo.svg';
import {Hydrosmall} from '../../Images/Hydrosmall.png';
import EthereumToEin from './EthereumToEin';
import EinToEthereum from './EinToEthereum';
import EinToEinSent from './EinToEinSent';
import EinToEinRecieved from './EinToEinRecieved';
import ResolversAdded from './ResolversAdded';



let polltry = [];
let einTo = [];
let einFrom = [];
let numeral = require('numeral');


export default class WelcomePage extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
      this.loadBlockchain();
      this.loadmarket();
      this.initializeReactGA()
      //this.loadmarket();

     }
     
     
  async loadBlockchain() { 

  
  const{mainnet} = this.state

  if(this.state.mainnet == true){
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(main1484_ABI, main1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({number:this.state.value})}

  
  const get_ein = await snowSolidity.methods.deposits(this.state.value).call();
  if (this._isMounted){
  this.setState({EIN_balance:(get_ein)/1E18})
  this.setState({loading:false})
  }
}
else 
{
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({number:this.state.value})}
  
  const get_ein = await snowSolidity.methods.deposits(this.state.value).call();
  if (this._isMounted){
  this.setState({EIN_balance:(get_ein)/1E18})
  this.setState({loading:false})
  }
}


  /*const network = await web3.eth.net.getNetworkType();
  if (this._isMounted){
  this.setState({net:network});}
  if(this.state.net == "rinkeby" && this._isMounted){
    this.setState({networkmessage:true})
  
  }*/
  
}

async loadmarket(){

  fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
        .then(res => res.json())
        .then((data) => {
          if (this._isMounted){
          this.setState({ marketcap: data.hydro })}
          
        })
        .catch(console.log)
}

 initializeReactGA() {
  ReactGA.initialize('UA-151322976-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;}

  constructor(props){
    super(props)
    var exampleItems = Array.from(Array(150).keys()).map(i => ({ id: (i+1), name: 'item ' + (i+1) }));
    this.state = {
        snowSolidity:[],
        summaryModalShow: false,
        loading:true,
        exampleItems: exampleItems,
        pageOfItems: [],
        eth_deposit:[],
        eth_withdraw:[],
        ein_transfer:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN_balance:'',
        value:1,
        marketcap:[],
        mainnet:true,
        
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    
    this.setState({value: event.target.value},() => {
      console.log()});
  }

  handleSubmit(event) {
    this.setState({loading:true})
    this.loadBlockchain();
    this.GA_Submit();
    event.preventDefault();
  }

  toggleChange = () => {
    this.setState({mainnet: !this.state.mainnet},() => { this.loadBlockchain()
    this.setState({loading:true})
    this.GA_ChangeNetwork();
    });

  }

  GA_Submit(){
    ReactGA.event({
    category: "Search Ein",
    action: "Search Ein"
    });
  }

  GA_ChangeNetwork(){
    ReactGA.event({
    category: "Frost Change Network",
    action: "Change Network"
    });
  }


  render(){

  const {loading} = this.state
  

  return (
   <div>
    
      <Container>
      <a id="top"></a>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
       
       <Title name={ !this.state.mainnet ? "Rinkeby":"Main"} title="Network"/>
       
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
       <Row><Col><h4>
        <Center><RotateSpinner
                size={60}
                color={!this.state.mainnet? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
                loading={loading}/>
        </Center>  
      </h4></Col></Row>

      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      
      
     

       <Row>
       <Col md={8}></Col>
       <Col><label className="searchlabel">Search for EIN</label>
       </Col>
       </Row>
      
      <Row>
      <Col md={8}><input type="checkbox" checked={this.state.mainnet} onChange={this.toggleChange}></input></Col><Col><form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.value} onChange={this.handleChange} className="searchbar" /> 
      <input type="submit" value="Submit" className="submit-button"/>
      </form>
      </Col>
      </Row>
      

      <Row>
    
         <Col>
         <div className="account_box">
         
           <h4 className="banana3">
             EIN: {this.state.number} 
           </h4>
           <h4 className="banana3">
             Balance: {numeral(this.state.EIN_balance).format('0,0.00')} Hydro
           </h4>
           <h6 className="grass3">
            $ {numeral(this.state.EIN_balance * this.state.marketcap.usd).format('0,0.00000')}
           </h6>
           
         </div>
         </Col>
       
         <Col md={4} className="market"><img src={require('../../Images/Hydrosmall.png')} alt="snow" height={50} width={40} className="navbar-brand"/><h6 className="grass2">Hyrdo Marketcap</h6><h6 className="grass3"> $ {numeral(this.state.marketcap.usd_market_cap).format('0,0.00')}</h6><h6 className="grass2"> Hyrdo Price:</h6> <h6 className="grass3">$ {numeral(this.state.marketcap.usd).format('0,0.0000000000')} </h6></Col>
       </Row>
       
       

       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
  <Tabs defaultActiveKey="ein_sent" transition={false} id="noanim-tab-example" mountOnEnter>
  
  <Tab eventKey="resolver_added" title="Resolvers Added" className="tab">
   <ResolversAdded
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ethereum_deposit" title="Ethereum Deposits to EIN" className="tab" >
   <EthereumToEin
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ethereum_withdraw" title="EIN withdraw to Ethereum" className="tab">
   <EinToEthereum
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ein_recieved" title="Recieved" className="tab">
   <EinToEinRecieved
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ein_sent" title="Sent" className="tab">
   <EinToEinSent
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  
  
</Tabs>
<Row><Col><h1> </h1></Col></Row>
<Row><Col><h1> </h1></Col></Row>
<Row><Col><h1> </h1></Col></Row>

<Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Morning, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c ,If you found unpleasant bugs or have a suggestion, You can contact us at MyHydroFrost@gmail.com. Thank you! & Happy BUIDLING! </h6></Center></Col></Row>
</Container>
<button className="topButton"><a href="#top" className="accountlink">Top</a></button>
     
   </div>
  );
}
}