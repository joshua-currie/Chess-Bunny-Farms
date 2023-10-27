import React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/gamepage.css';

import darkRookImage from "../assets/chesspieces/dark-rook.png";
import darkKnightImage from "../assets/chesspieces/dark-knight.png";
import darkBishopImage from "../assets/chesspieces/dark-bishop.png";
import darkQueenImage from "../assets/chesspieces/dark-queen.png";
import darkKingImage from "../assets/chesspieces/dark-king.png";
import darkPawnImage from "../assets/chesspieces/dark-pawn.png";
import lightRookImage from "../assets/chesspieces/light-rook.png";
import lightKnightImage from "../assets/chesspieces/light-knight.png";
import lightBishopImage from "../assets/chesspieces/light-bishop.png";
import lightQueenImage from "../assets/chesspieces/light-queen.png";
import lightKingImage from "../assets/chesspieces/light-king.png";
import lightPawnImage from "../assets/chesspieces/light-pawn.png";
import blankPlaceholder from "../assets/chesspieces/blankplaceholder.png";


const GamePage = () => {
    let potentialMoveComplete = false;
    let potentialMoveCompleteVal1 = "";
    const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); // Set the initial FEN value here
    const [potentialMove, setPotentialMove] = useState('');
    const [moveResult, setMoveResult] = useState('');

    const checkMove = () => {
        axios
        .post('http://localhost:5000/check-move', { fen_position: fenPosition, potential_move: potentialMove })
        .then((response) => {
            // console.log("TESTING:  " + response.data.valid)
            if (response.data.valid == "true") {
            setMoveResult('The move is valid.');
            } else {
            setMoveResult('The move is not valid.');
            }
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    };

    const getBestMove = () => {
        axios
        .post('http://localhost:5000/get-best-move', {
            fen_position: fenPosition,
            stockfish_path: 'stockfish/stockfish-windows-x86-64-avx2.exe',
            time_limit: 2.0,
        })
        .then((response) => {
            setMoveResult('The best move is: ' + response.data.best_move);
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    };

    const getPotentialMove = (coord) => {
        if (!potentialMoveComplete)
        {
            potentialMoveCompleteVal1 = coord;
            potentialMoveComplete = true;
        }

        else if (potentialMoveComplete)
        {
            setPotentialMove(potentialMoveCompleteVal1 + coord);
            potentialMoveComplete = false;
            potentialMoveCompleteVal1 = "";
        }
    };

    useEffect(() => {
        console.log('Updated potentialMove:', potentialMove);
        checkMove();
    }, [potentialMove]);

    useEffect(() => {
        console.log("Move Result State:", moveResult);
    }, [moveResult]);

    return ( 
        <div>
            <div>Game page</div>

            <div id="chessboard">
                <div id="a8" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a8")}>
                        <img src={darkRookImage} />
                    </button>
                </div>
                <div id="b8" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b8")}>
                        <img src={darkKnightImage} />
                    </button>
                </div>
                <div id="c8" className="board-coordinate dark-square">
                    <img src={darkBishopImage} />
                </div>
                <div id="d8" className="board-coordinate light-square">
                    <img src={darkQueenImage} />
                </div>
                <div id="e8" className="board-coordinate dark-square">
                    <img src={darkKingImage} />
                </div>
                <div id="f8" className="board-coordinate light-square">
                    <img src={darkBishopImage} />
                </div>
                <div id="g8" className="board-coordinate dark-square">
                    <img src={darkKnightImage} />
                </div>
                <div id="h8" className="board-coordinate light-square">
                    <img src={darkRookImage} />
                </div>
                <div id="a7" className="board-coordinate light-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="b7" className="board-coordinate dark-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="c7" className="board-coordinate light-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="d7" className="board-coordinate dark-square">
                    <img src={darkKnightImage} />
                </div>
                <div id="e7" className="board-coordinate light-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="f7" className="board-coordinate dark-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="g7" className="board-coordinate light-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="h7" className="board-coordinate dark-square">
                    <img src={darkPawnImage} />
                </div>
                <div id="a6" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="b6" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="c6" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="d6" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="e6" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="f6" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="g6" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="h6" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="a5" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="b5" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="c5" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="d5" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="e5" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="f5" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="g5" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="h5" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="a4" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="b4" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="c4" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="d4" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="e4" className="board-coordinate dark-square">
                <button className="chess-square-button" onClick={() => getPotentialMove("e4")}>
                        <img src={blankPlaceholder} />
                    </button>
                </div>
                <div id="f4" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="g4" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="h4" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="a3" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="b3" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="c3" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="d3" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="e3" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="f3" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="g3" className="board-coordinate light-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="h3" className="board-coordinate dark-square">
                    <img src={blankPlaceholder} />
                </div>
                <div id="a2" className="board-coordinate dark-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="b2" className="board-coordinate light-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="c2" className="board-coordinate dark-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="d2" className="board-coordinate light-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="e2" className="board-coordinate dark-square">
                <button className="chess-square-button" onClick={() => getPotentialMove("e2")}>
                        <img src={lightPawnImage} />
                    </button>
                </div>
                <div id="f2" className="board-coordinate light-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="g2" className="board-coordinate dark-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="h2" className="board-coordinate light-square">
                    <img src={lightPawnImage} />
                </div>
                <div id="a1" className="board-coordinate light-square">
                    <img src={lightRookImage} />
                </div>
                <div id="b1" className="board-coordinate dark-square">
                    <img src={lightKnightImage} />
                </div>
                <div id="c1" className="board-coordinate light-square">
                    <img src={lightBishopImage} />
                </div>
                <div id="d1" className="board-coordinate dark-square">
                    <img src={lightQueenImage} />
                </div>
                <div id="e1" className="board-coordinate light-square">
                    <img src={lightKingImage} />
                </div>
                <div id="f1" className="board-coordinate dark-square">
                    <img src={lightBishopImage} />
                </div>
                <div id="g1" className="board-coordinate light-square">
                    <img src={lightKingImage} />
                </div>
                <div id="h1" className="board-coordinate dark-square">
                    <img src={lightRookImage} />
                </div>
            </div>
        </div>
     );
}
 
export default GamePage;