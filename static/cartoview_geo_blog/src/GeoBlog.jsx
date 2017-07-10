import React, {Component} from 'react';
import './css/app.css'
import Navigator from './components/Navigator.jsx';
import ResourceViewer from './components/ResourceSelector.jsx'
import Writer from './components/Writer.jsx'
import About from './components/About.jsx';
import EditService from './services/editService.jsx'
export default class GeoBlog extends Component {
  constructor(props) {
    super(props)
    this.editService = new EditService({baseUrl: '/'});
  }
  state = {
    step: 0,
    config: {}
  }
  goToStep(step) {
    this.setState({step});
  }
  render() {
    var {step} = this.state
    const steps = [
      {
        label: "About",
        component: About,
        props: {
          onComplete: () => {
            var {step} = this.state;
            this.goToStep(++step)
          }
        }
      }, {
        label: "Select App",
        component: ResourceViewer,
        props: {
          resourcesUrl: this.props.config.resources_url,
          instance: this.props.config.instance,
          limit: this.props.config.limit,
          onComplete: (app) => {
            var {step} = this.state;
            this.setState({
              config: Object.assign(this.state.config, {
                app: {
                  id: app.id,
                  title: app.title,
                  abstract: app.abstract
                }
              })
            })
            this.goToStep(++step)
          }
        }
      }, {
        label: "Write Post",
        component: Writer,
        props: {
          instance: this.props.config.instance,
          onComplete: (content) => {
            var {step} = this.state;
            this.setState({
              config: Object.assign(this.state.config, {post: content})
            })
            this.editService.save(this.state.config, this.props.config.instance ? this.props.config.instance.post.id: undefined).then((result) => window.location.replace(result.url))
          }
        }
      }
    ]
    return (
      <div className="wrapping">
        <Navigator steps={steps} step={step} onStepSelected={(step) => this.goToStep(step)}/>
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 right-panel">
          {steps.map((s, index) => index == step && <s.component key={index} {...s.props}/>)}
        </div>
      </div>
    )
  }
}
