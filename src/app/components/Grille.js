"use client"
import React, { useState, useEffect } from 'react';
import Square from './Square';
import styles from "./Grille.module.css";
import Score from './Score';

function Grille() {
    const columns = [];
    const [snake, setSnake] = useState([0, 15, 30]);
    const [apple,setApple] = useState(25)
    const [score,setScore] = useState(0)
    const [direction, setDirection] = useState('right'); // Initialiser la direction par défaut

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                setDirection(event.key.replace('Arrow', '').toLowerCase());
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Nettoyage de l'écouteur d'événements lors du démontage du composant
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

    useEffect(() => {
        // Déplacer le serpent à intervalles réguliers
        const moveSnake = () => {
            console.log('la position du serpent est : ',snake[0])
            // Calculer la nouvelle position du serpent en fonction de la direction
            let newSnake = [];
            const head = snake[0];
            let newHead = 0;

            switch (direction) {
                case 'right':
                    newHead = head + 15;
                    break;
                case 'left':
                    newHead = head - 15;
                    break;
                case 'up':
                    newHead = head - 1;
                    break;
                case 'down':
                    newHead = head + 1;
                    break;
                default:
                    break;
            }

            newSnake = [newHead, ...snake.slice(0, -1)]; // Mettre à jour la position de la tête du serpent

            setSnake(newSnake);
        };

        const interval = setInterval(moveSnake, 100); // Appeler moveSnake toutes les secondes (1000 millisecondes)

        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
    }, [direction, snake]); // Exécuter l'effet à chaque changement de direction ou de position du serpent


    useEffect(() => {
        var newScore = 0; // Initialisez newScore à 0
        if (snake[0] === apple) {
            const newApplePosition = Math.floor(Math.random() * (224 + 1))
            setApple(newApplePosition)
            newScore += score + 1;
            setScore(newScore)
        }
    }, [score, snake, apple])
    
    useEffect(() =>
    {
        const handleCollision = () =>
        {
            var bordersUp = []
            var bordersDown = []
            for (let i =0;i <=15;i++)
            {
                bordersUp.push(i*15)
                bordersDown.push(14+15*i)
            }

          
            if((snake[0] <0 || snake[0]>15*15) 
            || (bordersUp.includes(snake[1]) && direction == 'up') 
            || ((bordersDown.includes(snake[1]) && direction =='down')))
            {
                alert("vous avez perdu votre score est : ",score)
                setSnake([0, 15, 30])
                setDirection('right')
                setApple(25)
                setScore(0)
            } 
           
        }
        handleCollision();
    },[snake,direction,score])
    for (let i = 0; i < 15; i++) {
        columns.push([]);

        for (let j = 0; j < 15; j++) {
            const squareKey = i * 15 + j;
            columns[i].push(<Square key={squareKey} isSerpent={snake.includes(squareKey)} isApple={squareKey== apple} />);
        }
    }

    return (
        <div className={styles.Grille_and_Score}>
            <Score Score={score}/>
        <div className={styles.Grille}>
            {columns.map((row, rowIndex) => (
                <div key={rowIndex}>{row}</div>
            ))}
        </div>
        
        </div>
    );
}

export default Grille;
