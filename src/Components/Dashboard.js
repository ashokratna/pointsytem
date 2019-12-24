import React, { Component } from 'react'
import Tabletop from "tabletop";
import * as lodash from 'lodash';

export default class Dashboard extends Component {
    state={ emp_data : []}
    
    componentDidMount(){
        Tabletop.init({ key: 'https://docs.google.com/spreadsheets/d/1LiWlQHawZaLkaN7S_YMTlvg-CEQfBQ-EaO4nVDHda3Y/edit#gid=0',
                          callback: data=>{
                              if(localStorage.getItem('authData')) {
                                  const  particularEmployee = lodash.filter(data.Projects.elements, emp => emp['Dev1 Name'].toLowerCase() === JSON.parse(localStorage.getItem('authData')).name.toLowerCase());
                                  this.setState({
                                    emp_data: particularEmployee
                                  })                                     
                              }
                          },
                          simpleSheet: false } )
                    }

    render() {
        var sumAllted = 0;
        var sumKickoff =0;
        var sumRetention =0;
        var sumTdp =0;
        var sumPdc =  0;
        if(this.state.emp_data.length > 0){
            this.state.emp_data.map((person, index) => {
                sumAllted = sumAllted + parseFloat(person['Dev1 Points'])
                sumKickoff = sumKickoff + parseFloat(person['Dev1 Kickoff'])
                sumRetention = sumRetention + parseFloat(person['Dev1 Retention'])
                sumTdp = sumTdp + parseFloat(person['Dev1 TImely Delivery'])
                sumPdc = sumPdc + parseFloat(person['Dev1 PDC Points'])
            })
        }

        return (
            <div>
                <table className="user">
                    <thead>
                        <tr>
                            <th>Allotted Points</th>
                            <th>Kickoff Points</th>
                            <th>Retention Points</th>
                            <th>Timely Delivery Points</th>
                            <th>Post Delivery Cycle Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{sumAllted.toFixed(2)}</td>
                            <td>{sumKickoff}</td>
                            <td>{sumRetention}</td>
                            <td>{sumTdp}</td>
                            <td>{sumPdc}</td>
                        </tr>
                    </tbody>
                </table>
                
                {
                    !this.state.emp_data.length &&  
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
