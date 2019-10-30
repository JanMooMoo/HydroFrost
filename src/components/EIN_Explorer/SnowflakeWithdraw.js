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
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import { RotateSpinner } from "react-spinners-kit";
import JwPagination from 'jw-react-pagination';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');
let polltry = [];

export default class SnowflakeWithdraw extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
     
    if (this._isMounted){ this.setState({check_network:this.props.mainnet},()=>this.loadSnowflake());}
      
     }
     


 async loadSnowflake(){
    if (this._isMounted){
    this.setState({check_network:this.props.mainnet})}

    if(this.state.check_network == true){
    const snowSolidity =   new web3.eth.Contract(main1484_ABI, main1484_Address);
    if (this._isMounted){
    this.setState({snowSolidity});

    const blockNumber = await web3.eth.getBlockNumber();
    if (this._isMounted){
    this.setState({blocks:blockNumber - 800000});}

    this.setState({hydroWithdraw:[]});}

  snowSolidity.events.SnowflakeWithdraw({fromBlock:8338504, toBlock:'latest'})
  //snowSolidity.events.SnowflakeDeposit({fromBlock:7728191, toBlock:'latest'})
  .on('data', (log) => {
  
    let { returnValues: { einFrom, to, amount }, blockNumber } = log

    let values = {einFrom,to, amount,blockNumber}
    
    
    if (this._isMounted){
        this.setState({hydroWithdraw:[...this.state.hydroWithdraw,values]})}

        var newest = this.state.hydroWithdraw;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
        if (this._isMounted){
        this.setState({hydroWithdraw:newsort});
        this.setState({loading:false});}

  })
} else{

  const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);

  if (this._isMounted){
    this.setState({snowSolidity});

    const blockNumber = await web2.eth.getBlockNumber();
    if (this._isMounted){
    this.setState({blocks:blockNumber - 800000});}
    
    this.setState({hydroWithdraw:[]});}

    snowSolidity.events.SnowflakeWithdraw({fromBlock:5000000, toBlock:'latest'})
  .on('data', (log) => {
   
    let { returnValues: { einFrom, to, amount }, blockNumber } = log
    
    let values = {einFrom,to, amount,blockNumber}
   
    
    if (this._isMounted){
        this.setState({hydroWithdraw:[...this.state.hydroWithdraw,values]})}

        var newest = this.state.hydroWithdraw;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
        if (this._isMounted){
        this.setState({hydroWithdraw:newsort});
        this.setState({loading:false});}
        })
}
  }

  componentWillReceiveProps(nextProps){
    if (this._isMounted){
      this.setState({check_network:nextProps.mainnet});
     }
  }

  componentDidUpdate(prevProps){

    if(this.props.mainnet !== prevProps.mainnet){
      this.setState({mainnet:this.props.mainnet})
      this.setState({loading:true})
      this.loadSnowflake()
    }
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
        hydroWithdraw:[],
        contract:'',
        contractaccount:'',
        number:'',
        blocks:'',
        EIN:'',
        check_network:'',
        
        
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
         
     
       <Title name="EIN" title="Withdraw"/>

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
      <Col className= "col_border2" md={2}><h3>Block</h3></Col>
      <Col className= "col_border2" md={6}><h3>To</h3></Col>
      <Col className="col_no_border" md={2}><h3>From</h3></Col>
      
      
        </Row>
        {this.state.pageOfItems.map((transfer,index)=>(
        <Row className ="row_underline" key={index}>
        <Col className= "col_border2" md={2}>
        <h4 className="ethereumaccount">{numeral(transfer.amount/1E18).format('0,0.00')} </h4>Hydro
        </Col>

        <Col className= "col_border2" md={2}>
        <h4 className="time">
        {transfer.blockNumber}</h4>Mined
        </Col>

        <Col className= "col_border2" md={6}>  
        <h4 className="ethereumaccount">{transfer.to}
        </h4>To Ethereum Account
        </Col>

        <Col className="col_no_border" md={2}>
        <h4 className="ethereumaccount">ID: {transfer.einFrom}</h4>From Snowflake Account
        </Col>
         
        </Row>))}
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.hydroWithdraw} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
   
     </Container>
       
   </div>
  );
}
}