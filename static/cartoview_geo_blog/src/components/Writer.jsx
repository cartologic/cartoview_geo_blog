import React, {Component} from 'react';
import t from 'tcomb-form';
const postData = t.struct({
  title: t.String,
  content: t.maybe(t.String),
  enableComments: t.Boolean
});
const options = {
  fields: {
    content: {
      type: 'textarea',
      attrs: {
        id: 'post-editor'
      }
    }
  }
};
const Form = t.form.Form;
export default class Writer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultconf: this.props.instance
        ? {
          title: this.props.instance.post.title,
          content: this.props.instance.post.content,
          enableComments: this.props.instance.post.comments
        }
        : {}
    }
  }
  componentDidMount() {
    CKEDITOR.replace('post-editor');
  }
  save() {
    var post = this.refs.form.getValue();
    if (post) {
      let formValue = Object.assign({}, {
        title: post.title,
        comments: post.enableComments,
        content: CKEDITOR.instances['post-editor'].getData()
      })
      this.props.onComplete(formValue)
    }
  }
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <h2>Write Post</h2>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-primary pull-right" onClick={this.save.bind(this)}>Save</button>
          </div>

        </div>
        <Form ref="form" options={options} value={this.state.defaultconf} type={postData}/>
      </div>
    )
  }
}
