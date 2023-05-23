import React, { useState } from 'react';
import './Test12.css';
import Light from './Light.js'

function Test12(){
const colors = ["red", "yellow", "green"];
const [lit,setLit] = useState("red");

    return (
        <div className='App'>
            {colors.map((color) => {
                return <Light color = {color} lit = {lit} setLit={setLit}></Light>
            }
            )}
        </div>
    );

       }

export default Test12;