import React, { Component } from 'react'
import {GoogleLogin} from 'react-google-login';
import { withRouter} from 'react-router-dom';
import logo from '../img/download.png'

 class Login extends Component {

    state = {
        Authenticate: false,
        name: ''
    }

    componentDidMount = ()=>{
        if(localStorage.getItem('authData')){
            this.setState({Authenticate: true, name: JSON.parse(localStorage.getItem('authData')).name})   
        }
    }

    responseGoogle = (response) => {
        if(response.isSignedIn){
            localStorage.setItem('authData', JSON.stringify({token: response.tokenId, name: response.profileObj.name}));
            this.setState({ Authenticate: true, name: response.profileObj.name })
            this.props.history.push('dashboard');
        }
    }

    render() {
        return (
            <div>

            {/* <form onSubmit={this.handleSubmit}>
                
                <label htmlFor="username">Enter the UserName</label>
                <input 
                    type="text" 
                    name="username" 
                    onChange={this.handleChange} 
                    value={this.state.username} 
                />
                
                <label htmlFor="password">Enter the Password</label>
                <input 
                    type="text" 
                    name="password" 
                    onChange={this.handleChange} 
                    value={this.state.password}
                />
                
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
                <button type="button" onClick={this.handleLogout}>Logout</button>
            </form> */}


                {!this.state.Authenticate
                ? (<div className="loginbtn">
                    
                    <h2><img className='logoimg' src={logo} alt='logo'/> Uplers</h2>
                    <GoogleLogin
                    {...this.props}
                    clientId="112044915268-oos0v8drjffvg3hqgnko5vg6ourqr6nt.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                </div>
                ): null}

            </div>          
        )
    }
}


export default  withRouter(Login)