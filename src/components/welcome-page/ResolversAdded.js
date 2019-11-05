import React,{Component} from 'react';
import Title from '../Title/Title';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import Center from 'react-center';
import JwPagination from 'jw-react-pagination';
import Moment from 'react-moment';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');

export default class ResolversAdded extends Component {

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
  this.setState({resolvers_added:[]});}

  snowSolidity.events.SnowflakeResolverAdded({filter:{ein:this.props.number},fromBlock:7728191, toBlock:'latest'})
  .on('data',(log)=>{

  let { returnValues: { ein,resolver,withdrawAllowance }, blockNumber } = log

  web3.eth.getBlock(blockNumber, (error, block) => {
  blockNumber = block.timestamp;
    
  let values = {ein,resolver,withdrawAllowance,blockNumber}
         
  if (this._isMounted){
  this.setState({resolvers_added:[...this.state.resolvers_added,values]})
  this.setState({loading:false});}

  var newest = this.state.resolvers_added;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({resolvers_added:newsort});}
    
   });   
          
  })
  } 
  else{
    const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
    if (this._isMounted){
    this.setState({snowSolidity});
    this.setState({resolvers_added:[]});}
  
    snowSolidity.events.SnowflakeResolverAdded({filter:{ein:this.props.number},fromBlock:0, toBlock:'latest'})
    .on('data',(log)=>{
  
    let { returnValues: { ein,resolver,withdrawAllowance }, blockNumber } = log
  
    web3.eth.getBlock(blockNumber, (error, block) => {
    blockNumber = block.timestamp;
      
    let values = {ein,resolver,withdrawAllowance,blockNumber}
           
    if (this._isMounted){
    this.setState({resolvers_added:[...this.state.resolvers_added,values]})
    this.setState({loading:false});}
  
    var newest = this.state.resolvers_added;
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
    if (this._isMounted){
    this.setState({resolvers_added:newsort});
    }
      
     });           
    })
  }
  
  }

  componentWillReceiveProps(nextProps){
    if (this._isMounted){
      this.setState({check_network:nextProps.mainnet});
     }
  }

  componentDidUpdate(prevProps){

    if(this.props.number !== prevProps.number)
    {
      this.setState({number:this.props.number})
      this.loadSnowflake();
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
        resolvers_added:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN:'',
        check_network:'',
        
    }
        this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }


  render(){
  return (
   <div>
      <Container>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
         
     
       <Title name="Added" title="Resolvers"/>
       
     
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
      
      <Row className ="row_underline2">
      <Col className ="col_border" md={2}><h3>Allowance</h3></Col>
      <Col className= "col_border" md={2}><h3>Date</h3></Col>
      <Col className= "col_border" md={6}><h3>Resolvers Added</h3></Col>
      <Col className= "col_no_border" md={2}><h3>Added By</h3></Col>
      
      
      </Row>
      {this.state.pageOfItems.map((ResolverAdded,index)=>(
      <Row className ="row_underline" key={index}>

      <Col className= "col_border" md={2} >
      <h4 className="banana">{numeral(ResolverAdded.withdrawAllowance/1E18).format('0,0.00')}</h4>Hydro ~ $ {numeral(ResolverAdded.withdrawAllowance/1E18 * this.props.marketUsd).format('0,0.00')}
      </Col>

      <Col className= "col_border" md={2} >
      <h6 className="time"><Moment unix format="LLLL">{ResolverAdded.blockNumber}</Moment></h6>
      </Col>
         
      <Col className= "col_border" md={6}>   
      <div>
      <h6 className="ethereumaccount"> {ResolverAdded.resolver}
      </h6><h6 className="contract">Contract</h6>
      </div>
      </Col>

      <Col className= "col_no_border" md={2}>
      <h4 className="banana">ID: {ResolverAdded.ein}</h4>EIN Account
      </Col>
         
       </Row>))}

       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.resolvers_added} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
  
   
     </Container>
       
   </div>
  );
}
}