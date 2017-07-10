import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import Img from 'react-image';
import Spinner from 'react-spinkit'

export default class ResourceViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      loading: true,
      showPagination: true,
      pageCount: 0,
      selected: this.props.instance
        ? this.props.instance.app
        : {}
    }
  }
  loadResources(off) {
    this.setState({loading: true})
    const limit = typeof(this.props.limit) === "undefined"
      ? 100
      : this.props.limit;
    const offset = typeof(off) === "undefined"
      ? 0
      : off;
    fetch(this.props.resourcesUrl + "?limit=" + limit + "&" + "offset=" + offset).then((response) => response.json()).then((data) => {
      this.setState({
        resources: data.objects,
        pageCount: Math.ceil(data.meta.total_count / limit),
        loading: false
      })
    }).catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    this.loadResources(0)
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    const offset = data.selected * this.props.limit;
    this.loadResources(offset)

  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <h4>{"Select App "}</h4>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            {(this.state.selected.id || (this.props.instance
              ? this.props.instance.app
              : false)) && <button className="btn btn-primary pull-right" onClick={() => this.props.onComplete(this.state.selected)}>Next</button>}
          </div>

        </div>
        {(!this.state.resources || this.state.loading) && <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 text-center"><Spinner name="line-scale-pulse-out" color="steelblue"/></div>
        </div>}
        {!this.state.loading && this.state.resources.map((app) => {
          return <div onClick={() => this.setState({selected: app})} key={app.id} className={(this.state.selected && this.state.selected.id == app.id) || (this.props.instance
            ? this.props.instance && this.props.instance.app.id == app.id
            : false)
            ? "row resource-box bg-success"
            : "row resource-box"}>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 resource-box-img-container"><Img className="resource-box-img img-responsive" src={[
            app.thumbnail_url, app.map
              ? app.map.thumbnail_url
              : "/static/" + app.app.name + "/logo.png",
            "/static/app_manager/img/no-image.jpg"
          ]} loader={<Spinner name="line-scale-pulse-out" color="steelblue"/>} /></div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 resource-box-text">
              <ul className="list-group">
                <li className="list-group-item">title: {app.title}</li>
                <li className="list-group-item">abstract: {app.abstract}</li>
                <li className="list-group-item">owner: {app.owner}</li>
                <li className="list-group-item">{'App: '}{app.app.title}</li>
              </ul>
            </div>
          </div>
        })}
        <ReactPaginate previousLabel={"previous"} nextLabel={"next"} breakLabel={< a href = "javascript:;" > ...</a>} breakClassName={"break-me"} pageCount={this.state.pageCount} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={this.handlePageClick} containerClassName={"pagination"} subContainerClassName={"pages pagination"} activeClassName={"active"}/>
      </div>
    )
  }
}
