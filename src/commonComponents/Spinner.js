import React, { Component } from 'react'
import spin from "./spin1.gif"

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={spin} alt='loading'/>
      </div>
    )
  }
}

export default Spinner