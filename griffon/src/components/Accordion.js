import React from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';


export default class Accordion extends React.Component {

    constructor(props) {
        super(props);    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false



        }
    
      }
    toggle(e) {
        this.setState(
            {
                isOpen: !this.state.isOpen
            }
        )


    }

    render(){
        return(
            <div>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
                <Collapse isOpen={this.state.isOpen}>
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

        );


    }


}
