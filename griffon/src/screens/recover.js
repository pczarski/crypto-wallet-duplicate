import React from 'react';
import '../styles/App.scss';
import '../styles/recover.scss';
import {Link} from 'react-router-dom';

function Recover() {
  return (
    <div className="wrapper">
    <div className="col-md-3 offset-md-5">
        <h1>This is the recover Wallet</h1>
        <form className="needs-validation">
            <textarea className="form-control" placeholder="Enter your 12 word seed phrase"></textarea>
            <div className="btn-area">
            <button type="submit"  className="btn btn-primary bt1 margin-left">Submit</button>
            <Link to="/">
                <button type="button" className="btn btn-secondary bt2">Go back</button>
            </Link>
            </div>
        </form>

    </div>
    </div>
  );
}

export default Recover;
