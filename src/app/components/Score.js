import React from 'react'
import styles from './Score.module.css'

function Score({Score}) {
  return (
    <div className={styles.Score_Grille}>
        <p>Votre score est : </p>
        <div>{Score}</div>
    </div>
  )
}

export default Score