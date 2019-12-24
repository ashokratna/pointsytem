import React, { Component } from 'react'
import Tabletop from "tabletop";
import * as lodash from 'lodash';
import '../Style/Common.css'
import Dashboard from './Dashboard'

export default class Detail extends Component {
    state = {
        emp_detail: []
    }

    componentDidMount(){
            Tabletop.init({ key: 'https://docs.google.com/spreadsheets/d/1LiWlQHawZaLkaN7S_YMTlvg-CEQfBQ-EaO4nVDHda3Y/edit#gid=0',
                              callback: data=>{
                                  if(localStorage.getItem('authData')) {
                                      const  particularEmployee = lodash.filter(data.Projects.elements, emp => emp['Dev1 Name'].toLowerCase() === JSON.parse(localStorage.getItem('authData')).name.toLowerCase());
                                      this.setState({
                                          emp_detail: particularEmployee
                                      })                                     
                                  }
                              },
                              simpleSheet: false } )
                        }

    render() {
               
        return (
            <div>
                <div className="detailpage">
                {/* {this.state.emp_detail.length > 0 ? <Dashboard style={{display :'none'}} emp_details={this.state.emp_detail}  /> : null}                 */}
                </div>
                <table className="user">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Allotted Points</th>
                            <th>Kickoff Points</th>
                            <th>Retention Points</th>
                            <th>Timely Delivery Points</th>
                            <th>Post Delivery Cycle Points</th>
                            <th>Total Eligible Points</th>
                            <th>Final Points</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                    !!this.state.emp_detail.length && this.state.emp_detail.map((person, index) => {
                        return (
                            <tr key={index}>
                                <td>{person['Project Name']}</td>
                                <td>{person['Dev1 Points']}</td>
                                <td>{person['Dev1 Kickoff']}</td>
                                <td>{person['Dev1 Retention']}</td>
                                <td>{person['Dev1 TImely Delivery']}</td>
                                <td>{person['Dev1 PDC Points']}</td>
                                <td>{person['Dev1 Eligible']}</td>
                                <td>{person['Dev1 Final']}</td>
                            </tr>
                        )
                    }) 
                }

                    </tbody>
                </table>
                
                {
                    !this.state.emp_detail.length &&  
                    <div className="d-flex justify-content-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>
                }

            </div>
        )
    }
}
