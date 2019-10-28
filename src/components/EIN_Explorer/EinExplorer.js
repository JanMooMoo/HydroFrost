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
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import Moment from 'react-moment';
import { RotateSpinner } from "react-spinners-kit";
import JwPagination from 'jw-react-pagination';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let numeral = require('numeral');
let polltry = [];

export default class EinExplorer extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentWillMount(){
      this._isMounted = true;
      this.loadBlockchain();
      this.loadSnowflake();

     }
     
     
  async loadBlockchain() { 
         
  let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
      
  const network = await web3.eth.net.getNetworkType();
  if (this._isMounted){
  this.setState({net:network});}
  if(this.state.net == "rinkeby" && this._isMounted){
    this.setState({networkmessage:true})
    
    }
 
  }

 loadSnowflake(){

  const snowSolidity =  new web3.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});}

  snowSolidity.events.SnowflakeTransfer({fromBlock:5038504, toBlock:'latest'})
  .on('data', (log) => {
      
    let { returnValues: { einFrom,einTo, amount }, blockNumber } = log
    
    let values = {einFrom,einTo, amount,blockNumber}
    
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
    
  const {loading}=this.state
  
  return (
   <div>
      <Container>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         
     
       <Title name="Hydro Transactions" title="From Snowflake Accounts -Rinkeby-"/>
       
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
        <h4 className="ethereumaccount">{numeral(transfer.amount/1E18).format('0,0.00')} </h4>Hydro
        </Col>

        <Col className= "col_border" md={2}>
        <h4 className="time">
        {transfer.blockNumber}</h4>Mined
        </Col>

        <Col className= "col_border" md={4}>   
        <div>
        <h4 className="ethereumaccount">{transfer.einTo}
        </h4>To Snowflake
        </div>
        </Col>

        <Col className="col_border" md={4}>
        <h4 className="ethereumaccount">{transfer.einFrom}</h4>From Snowflake Account
        </Col>
         
        </Row>))}
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.hydroTransfer} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
   
     </Container>
       
   </div>
  );
}
}