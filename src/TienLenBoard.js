// src/TienLenBoard.js

import React, { Component } from "react";
import CardArea from "./components/CardArea";

export class TienLenBoard extends Component {
  render() {
    let playerArea = [];
    const playerID = this.props.playerID;
    if (playerID && !this.props.ctx.gameover) {
      playerArea.push(<h1>Player {playerID}</h1>);
      playerArea.push(
        <div className="centerContainer">
          <CardArea
            className="stagingArea"
            cards={this.props.G.players[playerID].stagingArea}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
      const currentPlayer = this.props.ctx.currentPlayer;
      let buttons = [];
      if (playerID === currentPlayer) {
        if (this.props.ctx.activePlayers[currentPlayer] === "tienLen") {
          buttons.push(<h3>Tien Len!</h3>);
          buttons.push(
            <button className="button" onClick={this.props.moves.tienLenPlay}>
              Play Cards
            </button>
          );
        } else {
          buttons.push(
            <button className="button" onClick={this.props.moves.playCards}>
              Play Cards
            </button>
          );
          buttons.push(
            <button className="button" onClick={this.props.moves.passTurn}>
              Pass Turn
            </button>
          );
        }
      }
      buttons.push(
        <button className="button" onClick={this.props.moves.clearStagingArea}>
          Clear Staging Area
        </button>
      );
      playerArea.push(<div className="centerContainer">{buttons}</div>);
      playerArea.push(
        <div className="centerContainer">
          <CardArea
            className="hand"
            cards={this.props.G.players[playerID].hand}
            setList={this.props.moves.relocateCards}
          />
        </div>
      );
    }

    let status = [];

    for (let i = 0; i < 4; i++) {
      let className = "";
      if (i.toString() === this.props.ctx.currentPlayer) {
        className += " currentPlayer";
      }
      if (i.toString() === playerID) {
        className += " playerID";
      }
      if (!this.props.G.turnOrder.includes(i)) {
        className += " passed";
      }
      if (this.props.G.winners.includes(i)) {
        className += " winner";
      }
      status.push(<text className={className}>{i}</text>);
    }

    let gameover = "";
    if (this.props.ctx.gameover) {
      gameover = <h2>Game Over!</h2>;
    }

    return (
      <div>
        <h2>Center (Round Type: {this.props.G.roundType})</h2>
        <div className="centerContainer">
          <CardArea
            className="center"
            cards={this.props.G.center}
            onClick={() => null}
            setList={() => null}
            disabled={true}
          />
        </div>
        <div className="player-area">{playerArea}</div>
        <div className="centerContainer">
          <div className="status">{status}</div>
        </div>
        {gameover}
      </div>
    );
  }
}
