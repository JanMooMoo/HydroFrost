import React,{Component} from 'react';
import Title from '../Title/Title';
import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import { RotateSpinner } from "react-spinners-kit";
import Center from 'react-center';
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
import EthereumToEin from './EthereumToEin';
import EinToEthereum from './EinToEthereum';
import EinToEinSent from './EinToEinSent';
import EinToEinRecieved from './EinToEinRecieved';
import ResolversAdded from './ResolversAdded';

let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let polltry = [];
let einTo = [];
let einFrom = [];
let numeral = require('numeral');


export default class WelcomePage extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentWillMount(){
      this._isMounted = true;
      this.loadBlockchain();
      //this.loadmarket();

     }
     
     
  async loadBlockchain() { 
         
  let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

  const network = await web3.eth.net.getNetworkType();
  if (this._isMounted){
  this.setState({net:network});}
  if(this.state.net == "rinkeby" && this._isMounted){
    this.setState({networkmessage:true})
  
  }
 
  const snowSolidity =  new web3.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({number:this.state.value})}
  
  const get_ein = await snowSolidity.methods.deposits(this.state.number).call();
  if (this._isMounted){
  this.setState({EIN_balance:(get_ein)/1E18})
  this.setState({loading:false})
  }
  
}

/*async loadmarket(){

  fetch('https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xebbdf302c940c6bfd49c6b165f457fdb324649bc5&apikey=ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
          console.log("hydro",this.state.contacts)
        })
        .catch(console.log)
}*/

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
        contacts:[]

        
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({loading:true})
    this.loadBlockchain();
    event.preventDefault();
  }


  render(){

  const {loading} = this.state

  return (
   <div>
      <Container>
         <Row><Col></Col></Row>
         <Row><Col></Col></Row>
         
     
       <Title name="Rinkeby" title="Network"/>
       
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>

       <Row><Col><h4>
        <Center><RotateSpinner
                size={60}
                color="rgb(241, 241, 241)"
                loading={loading}/>
        </Center>  
      </h4></Col></Row>

       <Row>
       <Col md={8}></Col>
       <Col><label className="searchlabel">Search for EIN</label>
       </Col>
       </Row>


      
      <Row>
      <Col md={8}></Col><Col><form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.value} onChange={this.handleChange} className="searchbar" /> 
      <input type="submit" value="Submit" className="submit-button"/>
      </form>
      </Col>
      </Row>

      <Row>

         <Col>
         <div className="account_box">
         
           <h2>
             EIN: {this.state.number} 
           </h2>
           <h2>
             Balance: {numeral(this.state.EIN_balance).format('0,0')} Hydro
           </h2>
           
         </div>
         </Col>
       </Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
  <Tabs defaultActiveKey="ethereum_deposit" transition={false} id="noanim-tab-example" >
  
  <Tab eventKey="ethereum_deposit" title="Ethereum Deposits to EIN" className="tab" >
   <EthereumToEin
   number={this.state.number}/>
  </Tab>

  <Tab eventKey="ethereum_withdraw" title="EIN withdraw to Ethereum" className="tab">
   <EinToEthereum
   number={this.state.number}/>
  </Tab>

  <Tab eventKey="ein_sent" title="Sent" className="tab">
   <EinToEinSent
   number={this.state.number}/>
  </Tab>

  <Tab eventKey="ein_recieved" title="Recieved" className="tab">
   <EinToEinRecieved
   number={this.state.number}/>
  </Tab>

  <Tab eventKey="resolver_added" title="Resolver Added" className="tab">
   <ResolversAdded
   number={this.state.number}/>
  </Tab>
  
</Tabs>
     </Container>
       
   </div>
  );
}
}