import React, {Component} from 'react';
export default class About extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <h2>Cartoview GeoBlog</h2>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-primary pull-right" onClick={() => this.props.onComplete()}>Next</button>
          </div>

        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 about-text">
          <p>Create a blog page with apps, publish your app(s) as a blog entry, allowing users to follow and comment on your apps.</p>
        </div>
      </div>
    )
  }
}
