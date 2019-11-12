import React,{Component} from 'react';
import Title from '../Title/Title';
import ReactGA from 'react-ga';
import Center from 'react-center';
import {Link} from 'react-router-dom';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Web3 from 'web3';
import {status_rinkeby_ABI,status_rinkeby_Address} from '../blockchain-data/Status';
import Moment from 'react-moment';
import { ImpulseSpinner } from "react-spinners-kit";
import JwPagination from 'jw-react-pagination';
import {StatusComments} from './StatusComments_modal';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');

export default class Status extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

componentDidMount(){
      this._isMounted = true;
     // if (this._isMounted){ this.setState({check_network: this.props.mainnet},()=>this.loadStatus());}
    
     }

     async loadStatus(){

        if (this._isMounted){
        this.setState({my_past_status:[]});}

        const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
        const statusContract =  new web3.eth.Contract(status_rinkeby_ABI, status_rinkeby_Address);
        if (this._isMounted){
        this.setState({statusContract});}
      
        const blockNumber = await web3.eth.getBlockNumber();
        if (this._isMounted){
        this.setState({blocks:blockNumber});}
        
  
        if (this._isMounted){
       
        /*statusContract.getPastEvents("StatusUpdated",{filter:{ein:970},fromBlock:0, toBlock:'latest'})
        .then(events=>{
              
        var newest = events;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
        if (this._isMounted){
        this.setState({status_feed:newsort});}
        //console.log("check",this.state.status_feed)
      
        if(this.state.status_feed.length > 0){
        this.setState({status_update:true})
        // console.log("checkupdate",this.state.status_feed.length)
        // console.log("checkupdate",this.state.status_update)
        }
      
        })
        
        .catch((err)=>console.error(err))*/
        
        statusContract.events.StatusUpdated({fromBlock:'0', toBlock:'latest'})
        .on('data',(log)=>{

        //console.log("check",log)

        if( this._isMounted && log.returnValues !==null && log.returnValues.ein == this.props.number){

        let { returnValues: { ein,status,}, blockNumber,transactionHash } = log
        web3.eth.getBlock(blockNumber, (error, block) => {
        blockNumber = block.timestamp;
        let values = {ein,status,blockNumber,transactionHash}
        
        this.setState({my_past_status:[...this.state.my_past_status,values]})
        
        var newest = this.state.my_past_status;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
        if (this._isMounted){
        this.setState({my_past_status:newsort});
        this.setState({loading:false})
        }
          
        }); }
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
      this.setState({loading:true})
      this.loadStatus();
    }

    if(this.props.mainnet !== prevProps.mainnet){
      this.setState({mainnet:this.props.mainnet})
      this.setState({loading:true})
      this.loadStatus()
    }
  }


  componentWillUnmount(){
    this.abortController.abort()
    this._isMounted = false;}


  constructor(props){
    super(props)
    
    this.state = {
        loading:true,
        pageOfItems: [],
        contract:'',
        blocks:'',
        latestblock:'',
        contractaccount:'',
        summaryModalShow: false,
        number:'',
        EIN:'',
        check_network:'',
        my_past_status:[],
        activeStatus:[],
        
        
        
    }
        this.onChangePage = this.onChangePage.bind(this);
      
  }
  
  
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });

  this.handleShow = (myStatus)=>{
      this.setState({summaryModalShow:true})
      this.setState({activeStatus:myStatus})  
    }
  }

  

  render(){

    let summaryModalClose =() =>this.setState({summaryModalShow:false}); 
    const {loading}=this.state
  
  return (
    <div>
      <Container>
         <Row><Col><h1> </h1></Col></Row>
         <Row><Col><h1> </h1></Col></Row>
         
     
         <Center><img src={require('../../Images/statuslogo.png')} alt="snow" height={120} width={110} /></Center>

       
        <Center>
        <ImpulseSpinner
        size={60}
        color={!this.state.check_network? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
        loading={loading}/>
        </Center>  
     
        <Row><Col><h1> </h1></Col></Row>
      
        <Row className ="row_underline2">
        <Col className= "col_border" md={2}><h3>Time</h3></Col>
        <Col className= "col_border" md={7}><h3>Status Update</h3></Col>
        <Col className="col_no_border" md={3}><h3>Comments</h3></Col>
      
      
        </Row>
        {this.state.pageOfItems.map((myStatus,index)=>(
        <Row className ="row_underline" key={index}>
        <Col className= "col_border" md={2}>
        <h6 className="statustime"><Moment unix fromNow>{myStatus.blockNumber}</Moment></h6>
        </Col>

        <Col className= "col_border" md={7}>
        <p className="banana">Updated the Status To: </p><h5 className="banana3">{myStatus.status}</h5>
        </Col>

        <Col className="col_no_border" md={3}>
        <p></p><Center><button className="commentbutton" onClick={() => this.handleShow(myStatus)}><p className="faucet">Comments</p></button></Center>
        
        {this.state.summaryModalShow && 
        <StatusComments
        status_info = {this.state.activeStatus}
        show={this.state.summaryModalShow}
        onHide={summaryModalClose}
        />}
        </Col>

       
        
        </Row>))}
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row ><Col ><Center><JwPagination items={this.state.my_past_status} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
   
     </Container>
       
   </div>
  );
}
}