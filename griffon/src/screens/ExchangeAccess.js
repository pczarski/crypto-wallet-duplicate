import React, {Component} from 'react';

import Logos from "../components/walletComponents/Logos";

import { getCurr } from '../lib/backendHandler';
import { roundTo2 } from '../lib/helper';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { Button, Nav } from 'reactstrap';
import SideBar from '../components/Nav.js';

export default class ExchangeAccess extends Component
{
    //creating array of coins
    constructor(props){
        super(props)
                this.state = {
                coins: [
                {
                    
                    logo:<img src = {Logos[0].logo} alt = {"bitcoin"}></img>,
                    name:"Bitcoin",
                    price:"placeholder",
                    
                },
                {
                    
                    logo:<img src = {Logos[1].logo} alt = {"bitcoin"}></img>,
                    name:"Ethereum",
                    price:"placeholder",
                },
                {
                    
                    logo:<img src = {Logos[2].logo} alt = {"bitcoin"}></img>,
                    name:"Litecoin",
                    price:"placeholder",
                },
                {
                    
                    logo:<img src = {Logos[3].logo} alt = {"dash"}></img>,
                    name:"Dash",
                    price:"placeholder",
                },
                {
                    
                    logo:<img src = {Logos[4].logo} alt = {"dash"}></img>,
                    name:"Tether",
                    price:"placeholder",
                }
                
                ]
                }

            }
            renderTableHeader(){
                let header = Object.keys(this.state.coins[0])
                return header.map((key,index)=> {
                return <th scope= "col" key={index}>{key.toUpperCase()}</th>
                })
            }
            renderTableData(){
                return this.state.coins.map((coins, index) =>{
                    const {logo,name,price} = coins
                    return (
                        
                    <tr key = {name}>
                            <th scope ="row">{logo}</th>
                            <td>{name}</td>
                            <td>{price}</td>
                            
                        </tr>
                       
                    )
                })
            }
            render(){
                return (
                    <div className="wrapper">
                        
                        <SideBar></SideBar>
                        <div className="container">
                        <table className= "table table-striped table-hover table-dark">
                        
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        
                        </table>
                        
                        <Link to="./exchange">

                        <Button className = "button">Exchange a Currency</Button>
                        </Link>
                        </div>
                    </div>
                )
            }



}