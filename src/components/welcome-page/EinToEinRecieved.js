import React,{Component} from 'react';
import Title from '../Title/Title';
import {
    Container,
    Row,
    Col,

} from 'react-bootstrap';

import Web3 from 'web3';

import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import Moment from 'react-moment';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let numeral = require('numeral');

export default class EinToEinRecieved extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentWillMount(){
      this._isMounted = true;
      this.loadBlockchain();

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

  async loadSnowflake(){
    
  const snowSolidity =  new web3.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});}
  this.setState({ein_transfer_in:[]});

  snowSolidity.events.SnowflakeTransfer({filter:{einTo:this.props.number},fromBlock:0, toBlock:'latest'})
    .on('data',(log)=>{
  
  let { returnValues: { einFrom, einTo, amount }, blockNumber } = log

  web3.eth.getBlock(blockNumber, (error, block) => {
  blockNumber = block.timestamp;

  let values = {einFrom,einTo,amount,blockNumber}

  if (this._isMounted){
  this.setState({ein_transfer_in:[...this.state.ein_transfer_in,values]})}   
  
  var newest = this.state.ein_transfer_in;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
    this.setState({ein_transfer_in:newsort});
    this.setState({loading:false});}
    
   });   
          
     });
    }

  componentDidUpdate(prevProps){

    if(this.props.number !== prevProps.number){
      this.setState({number:this.props.number})
      this.loadSnowflake()
    }
  }

  constructor(props){
    super(props)
    var exampleItems = Array.from(Array(150).keys()).map(i => ({ id: (i+1), name: 'item ' + (i+1) }));
    this.state = {
        snowSolidity:[],
        account:'',
        balance:'',
        details:'',
        loading:true,
        exampleItems: exampleItems,
        pageOfItems: [],
        search:'',
        ein_transfer_in:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN:'',
        
    }}


  render(){
  return (
   <div>
      <Container>
        <Row><Col><h1> </h1></Col></Row>
        <Row><Col><h1> </h1></Col></Row>
         
     
       <Title name="Recieved" title="From EIN"/>
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
      
      <Row className ="row_underline2">
      <Col className= "col_border" md={2}><h3>Amount</h3></Col>
      <Col className= "col_border" md={2}><h3>Date</h3></Col>
      <Col className= "col_border" md={6}><h3>Recieved By</h3></Col>
      <Col className="col_no_border" md={2}><h3>From</h3></Col>
      
      
      </Row>
      {this.state.ein_transfer_in.map((recieved,index)=>(
       <Row className ="row_underline" key={index}>

        <Col className= "col_border" md={2}>   
        <h4 className="banana"> {numeral(recieved.amount/1E18).format('0,0')}</h4>Hydro
        </Col>

        <Col className= "col_border" md={2}>   
        <h6 className="time"><Moment unix>{recieved.blockNumber}</Moment></h6>
        </Col>

        <Col className= "col_border" md={6}>   
        <div>
        <h4 className="banana">ID: {recieved.einTo}
        </h4>EIN Account
        </div>
        </Col>

        <Col className="col_no_border"  md={2}>
        <h4 className="banana" >ID: {recieved.einFrom}</h4>EIN Account
        </Col>
         
       </Row>))}

       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
   
     </Container>
       
   </div>
  );
}
}