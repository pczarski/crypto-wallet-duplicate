import React from 'react';
import Nav from '../components/Nav';

import '../styles/nav.scss';
import '../styles/App.scss';
import '../styles/bal.scss';
import '../styles/exchange.scss';
import {Link} from 'react-router-dom';


export default class Orders extends React.Component {
  render () {
    const Withdraw  = () => (

                   <div className="container">
                   <form id="form1"className="text-center  p-5" action="#!">
     <p className="h4 mb-4">Withdraw Currency</p>

     <div className="form-row mb-4 ">
         <div className="col">
         <label >Currency:</label>
         <select id="Crypto" className="form-control" name="cars" >

     <option value="BTC">Bitcoin</option>
     <option value="ETH">Etherium</option>
     <option value="LTC">Litecoin</option>
     <option value="USTC">Tether</option>
     <option value="Dash">Dash</option>
   </select>
         </div>
         <div className="col">
         <label >Available Balance:</label>
              <input type="text"  className="form-control" placeholder="0.00" />
         </div>


     </div>
 <div className="form-row mb-4">
 <label >Withdrawal Address:</label>
  <input type="text"  className="form-control" placeholder="Enter your Withdrawal address" />
 </div>
     <div className="form-row mb-4">

     <div className="col">
 <label >Enter Amount:</label>
     <input type="number" className="form-control mb-4" placeholder="0.00"/></div>
     </div>

 <div className="form-row mb-4">
 <div className="col">
     <button className="btn btn-info my-4 btn-block" type="submit">Continue</button>
     </div>
     <div className="col">
     <Link to= "Buy">
         <button className="btn btn-info my-4 btn-block" >Back</button></Link>
         </div>
         </div>
 </form>
                   </div>


    );
    const TopUp  = () => (
       <div className="container">
      <form id="form1"className="text-center  p-5" action="#!">
    <p className="h4 mb-4">Send Currency</p>

    <div className="form-row mb-4 ">
        <div className="col">
        <label >Currency:</label>
        <select id="Crypto" className="form-control" name="cars" >

    <option value="BTC">Bitcoin</option>
    <option value="ETH">Etherium</option>
    <option value="LTC">Litecoin</option>
    <option value="USTC">Tether</option>
    <option value="Dash">Dash</option>
  </select>
        </div>
        <div className="col">
        <label >To:</label>
             <input type="text"  className="form-control" placeholder="Enter your Public Key address" />
        </div>


    </div>

    <div className="form-row mb-4">

    <div className="col">
<label >Enter Amount:</label>
    <input type="number" className="form-control mb-4" placeholder="0.00"/></div><p id="arrow" onClick=""> <a id="test" href="#">&#8644;</a></p>
    <div className="col">
    <label >To:</label>
    <input  type="number"  className="form-control" placeholder="0.00" />
    </div></div>

    <div className="form-row mb-4">
    <div className="col">
        <button className="btn btn-info my-4 btn-block" type="submit">Continue</button>
        </div>
        <div className="col">
        <Link to= "Buy">
            <button className="btn btn-info my-4 btn-block" >Back</button></Link>
            </div>
            </div>
</form>
</div>
    );

    return (
      <div className="wrapper">
      <Nav />
        <div id="box"className="container">

            <TopUp />
            <Withdraw />
          </div>
        </div>

    );
  }
}
