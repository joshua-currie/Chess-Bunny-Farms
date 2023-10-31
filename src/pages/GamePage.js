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

// to do
// check for game end state
// check for castling
// check for pawn to queen


const GamePage = () => {
    let playerTurn = true;
    let potentialMoveComplete = false;
    let potentialMoveCompleteVal1 = "";
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let potentialMove = "";
    let moveResult = "";
    let CPmove = "";

    const checkMove = () => {
        axios
        .post('http://localhost:5000/check-move', { fen_position: fen, potential_move: potentialMove })
        .then((response) => {
            if (response.data.valid == "true") 
            {
                moveResult = 'The move is valid.';
                fen = response.data.new_fen;
                playerTurn = false;
                getBestMove();
            } 
            
            else 
            {
                moveResult = 'The move is not valid.';
            }

            console.log("Move Result State:", moveResult);

            if (moveResult == "The move is valid.")
            {
                updateBoard(potentialMove);
            }
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    };

    const getBestMove = () => {
        axios
        .post('http://localhost:5000/get-best-move', {
            fen_position: fen,
            stockfish_path: 'stockfish/stockfish-windows-x86-64-avx2.exe',
            time_limit: 2.0, // hard coded
        })
        .then((response) => {
            CPmove = response.data.best_move; ////////
            fen = response.data.new_fen;
            updateBoard(CPmove);
            playerTurn = true;
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    };

    const getPotentialMove = (coord) => {
        if (!playerTurn)
        {
            console.log("not player turn"); // debug
            return;
        }

        if (!potentialMoveComplete)
        {
            potentialMoveCompleteVal1 = coord;
            potentialMoveComplete = true;
        }

        else if (potentialMoveComplete)
        {
            potentialMove = (potentialMoveCompleteVal1 + coord);
            checkMove();
            potentialMoveComplete = false;
            potentialMoveCompleteVal1 = "";
        }
    };

    function updateBoard(move)
    {
        let initialPosition = move.substring(0,2);
        let newPosition = move.substring(2,4);

        console.log("TEST: " + initialPosition + " " + newPosition);

        let initialPositionImage = document.getElementById(initialPosition + "-img");
        let newPositionImage = document.getElementById(newPosition + "-img");

        newPositionImage.src = initialPositionImage.src;
        initialPositionImage.src = blankPlaceholder;

        console.log("new fen: " + fen); /// debug
    }

    return ( 
        <div>
            <div>Game page</div>

            <div id="chessboard">
                <div id="a8" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a8")}>
                        <img id="a8-img" src={darkRookImage} />
                    </button>
                </div>
                <div id="b8" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b8")}>
                        <img id="b8-img" src={darkKnightImage} />
                    </button>
                </div>
                <div id="c8" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c8")}>
                        <img id="c8-img" src={darkBishopImage} />
                    </button>
                </div>
                <div id="d8" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d8")}>
                        <img id="d8-img" src={darkQueenImage} />
                    </button>
                </div>
                <div id="e8" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e8")}>
                        <img id="e8-img" src={darkKingImage} />
                    </button>
                </div>
                <div id="f8" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f8")}>
                        <img id="f8-img" src={darkBishopImage} />
                    </button>
                </div>
                <div id="g8" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g8")}>
                        <img id="g8-img" src={darkKnightImage} />
                    </button>
                </div>
                <div id="h8" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h8")}>
                        <img id="h8-img" src={darkRookImage} />
                    </button>
                </div>
                <div id="a7" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a7")}>
                        <img id="a7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="b7" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b7")}>
                        <img id="b7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="c7" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c7")}>
                        <img id="c7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="d7" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d7")}>
                        <img id="d7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="e7" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e7")}>
                        <img id="e7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="f7" className="board-coordinate light-square">
                <   button className="chess-square-button" onClick={() => getPotentialMove("f7")}>
                        <img id="f7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="g7" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g7")}>
                        <img id="g7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="h7" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h7")}>
                        <img id="h7-img" src={darkPawnImage} />
                    </button>
                </div>
                <div id="a6" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a6")}>
                        <img id="a6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="b6" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b6")}>
                        <img id="b6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="c6" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c6")}>
                        <img id="c6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="d6" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d6")}>
                        <img id="d6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="e6" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e6")}>
                        <img id="e6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="f6" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f6")}>
                        <img id="f6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="g6" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g6")}>
                        <img id="g6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="h6" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h6")}>
                        <img id="h6-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="a5" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a5")}>
                        <img id="a5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="b5" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b5")}>
                        <img id="b5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="c5" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c5")}>
                        <img id="c5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="d5" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d5")}>
                        <img id="d5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="e5" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e5")}>
                        <img id="e5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="f5" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f5")}>
                        <img id="f5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="g5" className="board-coordinate dark-square">
                <   button className="chess-square-button" onClick={() => getPotentialMove("g5")}>
                        <img id="g5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="h5" className="board-coordinate light-square">
                <   button className="chess-square-button" onClick={() => getPotentialMove("h5")}>
                        <img id="h5-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="a4" className="board-coordinate light-square">
                <   button className="chess-square-button" onClick={() => getPotentialMove("a4")}>
                        <img id="a4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="b4" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b4")}>
                        <img id="b4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="c4" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c4")}>
                        <img id="c4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="d4" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d4")}>
                        <img id="d4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="e4" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e4")}>
                        <img id="e4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="f4" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f4")}>
                        <img id="f4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="g4" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g4")}>
                        <img id="g4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="h4" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h4")}>
                        <img id="h4-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="a3" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a3")}>
                        <img id="a3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="b3" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b3")}>
                        <img id="b3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="c3" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c3")}>
                        <img id="c3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="d3" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d3")}>
                        <img id="d3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="e3" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e3")}>
                        <img id="e3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="f3" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f3")}>
                        <img id="f3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="g3" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g3")}>
                        <img id="g3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="h3" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h3")}>
                        <img id="h3-img" src={blankPlaceholder} />
                    </button>
                </div>
                <div id="a2" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a2")}>
                        <img id="a2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="b2" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b2")}>
                        <img id="b2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="c2" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c2")}>
                        <img id="c2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="d2" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d2")}>
                        <img id="d2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="e2" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e2")}>
                        <img id="e2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="f2" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f2")}>
                        <img id="f2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="g2" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g2")}>
                        <img id="g2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="h2" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h2")}>
                        <img id="h2-img" src={lightPawnImage} />
                    </button>
                </div>
                <div id="a1" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("a1")}>
                        <img id="a1-img" src={lightRookImage} />
                    </button>
                </div>
                <div id="b1" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("b1")}>
                        <img id="b1-img" src={lightKnightImage} />
                    </button>
                </div>
                <div id="c1" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("c1")}>
                        <img id="c1-img" src={lightBishopImage} />
                    </button>
                </div>
                <div id="d1" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("d1")}>
                        <img id="d1-img" src={lightQueenImage} />
                    </button>
                </div>
                <div id="e1" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("e1")}>
                        <img id="e1-img" src={lightKingImage} />
                    </button>
                </div>
                <div id="f1" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("f1")}>
                        <img id="f1-img" src={lightBishopImage} />
                    </button>
                </div>
                <div id="g1" className="board-coordinate dark-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("g1")}>
                        <img id="g1-img" src={lightKnightImage} />
                    </button>
                </div>
                <div id="h1" className="board-coordinate light-square">
                    <button className="chess-square-button" onClick={() => getPotentialMove("h1")}>
                        <img id="h1-img" src={lightRookImage} />
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default GamePage;