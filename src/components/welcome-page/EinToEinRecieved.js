import React,{Component} from 'react';
import Title from '../Title/Title';
import Center from 'react-center';
import {
    Container,
    Row,
    Col,

} from 'react-bootstrap';

import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import Moment from 'react-moment';
import JwPagination from 'jw-react-pagination';
import {Link} from 'react-router-dom';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');

export default class EinToEinRecieved extends Component {

  _isMounted = false;
  abortController = new AbortController()
  
  componentWillMount(){
      this._isMounted = true;
      if (this._isMounted){this.setState({check_network: this.props.mainnet});}
  
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
    
  this.setState({check_network:this.props.mainnet})

  if(this.state.check_network == true){
    const snowSolidity =  new web3.eth.Contract(main1484_ABI, main1484_Address);

  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({ein_transfer_in:[]});}

  snowSolidity.events.SnowflakeTransfer({filter:{einTo:this.props.number},fromBlock:7728191, toBlock:'latest'})
    .on('data',(log)=>{
  
  let { returnValues: { einFrom, einTo, amount }, blockNumber } = log

  //web3.eth.getBlock(blockNumber, (error, block) => {
 // blockNumber = block.timestamp;

  let values = {einFrom,einTo,amount,blockNumber}

  if (this._isMounted){
  this.setState({ein_transfer_in:[...this.state.ein_transfer_in,values]})}   
  
  var newest = this.state.ein_transfer_in;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
    this.setState({ein_transfer_in:newsort});
    this.setState({loading:false});}
    
   });   
 }

else{
  const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({ein_transfer_in:[]});}

  snowSolidity.events.SnowflakeTransfer({filter:{einTo:this.props.number},fromBlock:0, toBlock:'latest'})
    .on('data',(log)=>{
     
  let { returnValues: { einFrom, einTo, amount }, blockNumber } = log
 

  //web3.eth.getBlock(blockNumber, (error, block) => {
 // blockNumber = block.timestamp;

  let values = {einFrom,einTo,amount,blockNumber}
  
  if (this._isMounted){
  this.setState({ein_transfer_in:[...this.state.ein_transfer_in,values]})}   
  
  var newest = this.state.ein_transfer_in;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
    this.setState({ein_transfer_in:newsort});
    this.setState({loading:false});}
    
   });   
  }      
     
  }

  componentWillReceiveProps(nextProps){
    if (this._isMounted){
      this.setState({check_network:nextProps.mainnet});
     }
  }

  componentDidUpdate(prevProps){

    if(this.props.number !== prevProps.number){
      this.setState({number:this.props.number})
      this.loadSnowflake()
    }
    if(this.props.mainnet !== prevProps.mainnet){
      this.setState({mainnet:this.props.mainnet})
      this.loadSnowflake()
    }
  }

  componentWillUnmount(){
    this.abortController.abort()
    this._isMounted = false;}

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
        mainnet:'',
        EIN:'',
        check:'',
        
    }
    this.onChangePage = this.onChangePage.bind(this);
}

onChangePage(pageOfItems) {
  // update local state with new page of items
  this.setState({ pageOfItems });
}

reload(){
  window.location.reload()
}

/*<Col className= "col_border" md={2}>   
<h6 className="time"><Moment unix format="LLLL">{recieved.blockNumber}</Moment></h6>
</Col>*/

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
      <Col className= "col_border" md={2}><h3>Block</h3></Col>
      <Col className= "col_border" md={6}><h3>Recieved By</h3></Col>
      <Col className="col_no_border" md={2}><h3>From</h3></Col>
      
      
      </Row>
      {this.state.pageOfItems.map((recieved,index)=>(
       <Row className ="row_underline" key={index}>

        <Col className= "col_border" md={2}>   
        <h4 className="banana"> {numeral(recieved.amount/1E18).format('0,0.00')}</h4>Hydro ~ $ {numeral(recieved.amount/1E18 * this.props.marketUsd).format('0,0.00')}
        </Col>

        <Col className= "col_border" md={2}>   
        <h6 className="time">{numeral(recieved.blockNumber).format('0,0')}</h6>Mined
        </Col>

        <Col className= "col_border" md={6} onClick={this.reload}>   
        <div>
        <h4 className="banana">ID
        <Link to={{pathname:'/Accounts/'+recieved.einTo}} className="accountlink">
        : {recieved.einTo}
        </Link>
        </h4>EIN Account
        </div>
        </Col>

        <Col className="col_no_border"  md={2}>
        
        <h4 className="banana" onClick={this.reload}>ID
        <Link to={{pathname:'/Accounts/'+recieved.einFrom}} className="accountlink">
        : {recieved.einFrom}
        </Link>
        </h4>EIN Account
        </Col>
         
       </Row>))}

       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.ein_transfer_in} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
   
     </Container>
       
   </div>
  );
}
}