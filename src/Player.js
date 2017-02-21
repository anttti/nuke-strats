import _ from 'lodash';
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Player.css';

const doc = document.documentElement;

class Player extends Component {
  constructor() {
    super();
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag = _.throttle((e) => {
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    this.props.onMove(this.props.id, e.x + left - 10, e.y + top - 10);
  }, 50)

  render() {
    return (
      <Draggable
        position={this.props.position}
        zIndex={100}
        onStart={this.onStart}
        onDrag={this.onDrag}
        onStop={this.onDrag}>
        <div className="player" style={{ borderColor: this.props.color }}>
          {this.props.number}
        </div>
      </Draggable>
    );
  }
}

export default Player;
