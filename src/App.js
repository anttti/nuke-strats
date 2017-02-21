import React, { Component } from 'react';
import Player from './Player';
import map from './map.jpg';
import './App.css';

const database = window.firebaseApp.database();

const initialState = {
  t1: { x: 117, y: 515 },
  t2: { x: 146, y: 526 },
  t3: { x: 179, y: 529 },
  t4: { x: 132, y: 550 },
  t5: { x: 105, y: 549 },
  ct1: { x: 852, y: 442 },
  ct2: { x: 902, y: 456 },
  ct3: { x: 878, y: 470 },
  ct4: { x: 850, y: 467 },
  ct5: { x: 877, y: 440 },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    Object.keys(initialState).forEach((key) => {
      database.ref(`players/${key}`).on('value', (snapshot) => {
        this.setState({ [key]: { x: snapshot.val().x, y: snapshot.val().y } });
      });
    });

    this.onMove = this.onMove.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onMove(id, x, y) {
    database.ref(`players/${id}`).set({ x, y });
  }

  onSave() {
    console.log(JSON.stringify(this.state, null, 2));
  }

  onReset() {
    Object.keys(initialState).forEach((key) => {
      database.ref(`players/${key}`).set(initialState[key]);
    });
  }

  render() {
    return (
      <div className="app">
        <img src={map} alt="Map" />

        <section className="buttons">
          <button className="button button--reset" onClick={this.onReset}>Reset</button>
        </section>

        <Player color="red" position={this.state.t1} number="1" id="t1" onMove={this.onMove} />
        <Player color="red" position={this.state.t2} number="2" id="t2" onMove={this.onMove} />
        <Player color="red" position={this.state.t3} number="3" id="t3" onMove={this.onMove} />
        <Player color="red" position={this.state.t4} number="4" id="t4" onMove={this.onMove} />
        <Player color="red" position={this.state.t5} number="5" id="t5" onMove={this.onMove} />

        <Player color="blue" position={this.state.ct1} number="1" id="ct1" onMove={this.onMove} />
        <Player color="blue" position={this.state.ct2} number="2" id="ct2" onMove={this.onMove} />
        <Player color="blue" position={this.state.ct3} number="3" id="ct3" onMove={this.onMove} />
        <Player color="blue" position={this.state.ct4} number="4" id="ct4" onMove={this.onMove} />
        <Player color="blue" position={this.state.ct5} number="5" id="ct5" onMove={this.onMove} />
      </div>
    );
  }
}

export default App;
