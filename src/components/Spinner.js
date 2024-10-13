import React, { Component } from 'react'
import Loader from './Loader.gif'
export class Spinner extends Component {
  render() {
    return (
      <div style={{display:'flex', justifyContent:'center', margin:'30px'}}>
        <img src={Loader} alt="failed"/>
      </div>
    )
  }
}

export default Spinner
