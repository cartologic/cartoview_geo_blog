import React from 'react';
import {render, findDOMNode} from 'react-dom';
import GeoBlog from './GeoBlog.jsx';
class Viewer {
  constructor(domId, config) {
    this.domId = domId;
    this.appConfig = config;
  }

  set config(value) {
    this.appConfig = config;
  }

  view() {
    render(<GeoBlog config={this.appConfig}/>, document.getElementById(this.domId));
  }
}
module.exports = Viewer;
global.Viewer = Viewer;
