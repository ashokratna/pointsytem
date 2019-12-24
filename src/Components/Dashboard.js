import React, { Component } from 'react'
import Tabletop from "tabletop";
import * as lodash from 'lodash';

export default class Dashboard extends Component {
    state={ emp_data : [], Cuttoff :0}
    
    componentDidMount(){
        Tabletop.init({ key: 'https://docs.google.com/spreadsheets/d/1LiWlQHawZaLkaN7S_YMTlvg-CEQfBQ-EaO4nVDHda3Y/edit#gid=0',
                          callback: data=>{
                              if(localStorage.getItem('authData')) {
                                  const  particularEmployee = lodash.filter(data.Projects.elements, emp => emp['Dev1 Name'].toLowerCase() === JSON.parse(localStorage.getItem('authData')).name.toLowerCase());
                                //   const particularCuttoff = lodash.find(data.Cutoff.elements, cutoff => )
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
        var sumEligible = 0;
        var sumFinal = 0;
        var sumCuttoff = 5;
        var sumEscaltions = 0;
        var sumEdp = 0;
        var sumBooster =0;
        if(this.state.emp_data.length > 0){
            this.state.emp_data.map((person, index) => {
                sumAllted = sumAllted + parseFloat(person['Dev1 Points']);
                sumKickoff = sumKickoff + parseFloat(person['Dev1 Kickoff']);
                sumRetention = sumRetention + parseFloat(person['Dev1 Retention']);
                sumTdp = sumTdp + parseFloat(person['Dev1 TImely Delivery']);
                sumPdc = sumPdc + parseFloat(person['Dev1 PDC Points']);
                sumEligible = sumEligible + parseFloat(person['Dev1 Eligible']);
                sumFinal = sumFinal + parseFloat(person['Dev1 Final']);
                sumEdp = sumFinal*2*(5/100);
                
                if(person['Client Feedback'] == 'Escalation'){
                    sumEscaltions = sumEscaltions + 1 
                };

                if(sumAllted > (sumCuttoff*5)){
                    sumBooster = sumAllted*(20/100);
                }else{
                    sumBooster = 0
                }
            });
        }

        // var Edp = sumEligible*sumCuttoff*(5/100)

        console.log(this.state.emp_data)

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
                {
                  !!this.state.emp_data.length ? (
<table className="user dash">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{JSON.parse(localStorage.getItem('authData')).name}</td>
                    </tr>
                    <tr>
                        <th>Your Quarterly Cut-off</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Allotted Points</th>
                        <td>{sumAllted.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Kickoff Points</th>
                        <td>{sumKickoff}</td>
                    </tr>
                    <tr>
                        <th>Retention Points</th>
                        <td>{sumRetention}</td>
                    </tr>
                    <tr>
                        <th>Timely Delivery Points</th>
                        <td>{sumTdp}</td>
                    </tr>
                    <tr>
                        <th>Post Delivery Cycle Points</th>
                        <td>{sumPdc}</td>
                    </tr>
                    <tr>
                        <th>Total Eligible Points</th>
                        <td>{sumEligible.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Final Points</th>
                        <td>{sumFinal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Cuttoff</th>
                        <td>{sumCuttoff}</td>
                    </tr>
                    <tr>
                        <th>Number of Escalations</th>
                        <td>{sumEscaltions}</td>
                    </tr>
                    <tr>
                        <th>Escalation Deduction Points</th>
                        <td>{sumEdp.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Efficiency Booster</th>
                        <td>{sumBooster.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>) : (<div className="d-flex justify-content-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>)
            
                }
            </div>
        )
    }
}
