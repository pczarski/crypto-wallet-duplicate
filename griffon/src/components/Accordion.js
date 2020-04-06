import React from "react";
import { Collapse, Button, CardBody, Card, CardTitle } from 'reactstrap';
import "../styles/Accordion.css";

//-----coin Logos-------
import ethLogo from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
//------------------
export default class Accordion extends React.Component {

    constructor(props) {
        super(props);    
        
        this.state = {
            rSelected:null,
            
        }
      }
    
    toggle =(id)=>{
        
        this.setState({
            rSelected:id,
           

        })
        console.log(id)
    }
    //handles which button is selected
    isSelected=(id)=>{
        if(id == this.state.rSelected){
            return true;

        }
        else{
            return false
        }
    }

    render(){
        
        return(
            <div className = "container">
                
                
                            <div className= "BitCoin">
                                <Button color="primary" onClick={() => this.toggle(1)} block><img src={bitcoinLogo} alt= "Bitcoin"></img>BitCoin</Button>
                                <Collapse isOpen={this.isSelected(1)}>
                                    <Card>
                                    <CardBody>
                                    Anim pariatur cliche reprehenderit,
                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                    nesciunt sapiente ea proident.
                                    </CardBody>
                                    </Card>
                                </Collapse>
                            </div>

                            <div className= "Ethereum">
                                <Button color="primary" onClick={() => this.toggle(2)} block><img src={ethLogo} alt= "Ethereum" ></img>Ethereum</Button>
                                <Collapse isOpen={this.isSelected(2)}>
                                    <Card>
                                    <CardBody>
                                    Anim pariatur cliche reprehenderit,
                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                    nesciunt sapiente ea proident.
                                    </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div className= "LiteCoin">
                                <Button color="primary" onClick={() => this.toggle(3)} block><img src={liteLogo} alt= "LiteCoin" ></img>LiteCoin</Button>
                                <Collapse isOpen={this.isSelected(3)}>
                                    <Card>
                                    <CardBody>
                                    Anim pariatur cliche reprehenderit,
                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                    nesciunt sapiente ea proident.
                                    </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div className= "Dash">
                                <Button color="primary" onClick={() => this.toggle(4)} block><img src={dashLogo} alt= "Dash" ></img>Dash</Button>
                                <Collapse isOpen={this.isSelected(4)}>
                                    <Card>
                                    <CardBody>
                                    Anim pariatur cliche reprehenderit,
                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                    nesciunt sapiente ea proident.
                                    </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                
            </div>
                
        );


    }


}
