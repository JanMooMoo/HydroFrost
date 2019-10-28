import React,{Component} from 'react';
import Title from '../Title/Title';
import Center from 'react-center';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Web3 from 'web3';
import {HydroToken_ABI, HydroToken_Address} from '../blockchain-data/hydrocontract';
import Moment from 'react-moment';
import JwPagination from 'jw-react-pagination';
import { RotateSpinner } from "react-spinners-kit";


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let numeral = require('numeral');
let polltry = [];

export default class ethereumExplorer extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentWillMount(){
      this._isMounted = true;
      this.loadBlockchain();
      this.loadSnowflake();

     }
     
     
  async loadBlockchain() { 
         
  let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
      
  const network = await web3.eth.net.getNetworkType();
  if (this._isMounted){
  this.setState({net:network});}
  if(this.state.net == "rinkeby" && this._isMounted){
    this.setState({networkmessage:true})
    
    }
 
  }

  async loadSnowflake(){

  const snowSolidity =  new web3.eth.Contract(HydroToken_ABI, HydroToken_Address);
  if (this._isMounted){
  this.setState({snowSolidity});}

  snowSolidity.events.Transfer({fromBlock: 8823000, toBlock:'latest'})
  .on('data', (log) => {
      
    let { returnValues: { _from, _to, _amount }, blockNumber } = log
    
    let values = {_from,_to,_amount,blockNumber}
    
    if (this._isMounted){
        this.setState({hydroTransfer:[...this.state.hydroTransfer,values]})}

        var newest = this.state.hydroTransfer;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
        if (this._isMounted){
        this.setState({hydroTransfer:newsort});
        this.setState({loading:false});}

  })
  
  }

  componentWillUnmount(){
    this.abortController.abort()
    this._isMounted = false;}


  constructor(props){
    super(props)
    
    this.state = {
        snowSolidity:[],
        account:'',
        balance:'',
        details:'',
        loading:true,
        pageOfItems: [],
        search:'',
        hydroTransfer:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN:'',
        
    }
        this.onChangePage = this.onChangePage.bind(this);
  }
  
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  render(){
  
  const{loading}=this.state

  return (
   <div>
      <Container>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         
     
       <Title name="Hydro Transactions" title="From Ethereum Accounts -Main Net-"/>
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h4>
        <Center><RotateSpinner
                size={60}
                color="rgb(241, 241, 241)"
                loading={loading}/>
        </Center>  
      </h4></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
      
      <Row className ="row_underline2">
      <Col className= "col_border2" md={2}><h3>Amount</h3></Col>
      <Col className= "col_border" md={2}><h3>Block</h3></Col>
      <Col className= "col_border" md={4}><h3>To</h3></Col>
      <Col className="col_border" md={4}><h3>From</h3></Col>
      
      
        </Row>
        {this.state.pageOfItems.map((transfer,index)=>(
        <Row className ="row_underline" key={index}>
        <Col className= "col_border2" md={2}>
        <h4 className="banana">{numeral(transfer._amount/1E18).format('0,0.00')} </h4>Hydro
        </Col>

        <Col className= "col_border" md={2}>
        <h6 className="time">
        {transfer.blockNumber}</h6>Mined
        </Col>

        <Col className= "col_border" md={4}>   
        <div>
        <h6 className="ethereumaccount">{transfer._to}
        </h6>To Ethereum Account
        </div>
        </Col>

        <Col className="col_border" md={4}>
        <h6 className="ethereumaccount">{transfer._from}</h6>From Ethereum Account
        </Col>
         
        </Row>))}
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.hydroTransfer} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Moring, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c Thank you! & Happy BUIDLING! </h6></Center></Col></Row>

     </Container>
       
   </div>
  );
}
}