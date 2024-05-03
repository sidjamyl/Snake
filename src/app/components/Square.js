import React from 'react'
import "../globals.css"
import styles from './Square.module.css'

function Square({isSerpent,isApple}) {
  return (
    <div className={
        isSerpent ? styles.Serpent :
        styles.Square &&
        isApple ? styles.Apple : 
        styles.Square
    }></div>
  )
}

export default Square