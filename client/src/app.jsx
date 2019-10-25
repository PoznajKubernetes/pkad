import React from 'react';
import Env from './env';
import Mem from './mem';
import Probe from './probe';
import Dns from './dns';
import KeyGen from './keygen';
import Request from './request';
import HighlightLink from './highlightlink'
import Disconnected from './disconnected'
import MemQ from './memq'
import { Location, Locations } from 'react-router-component';

function createElement(Component, props) {
  console.log(props)
  return <Component {...props}/>
}

export default class App extends React.Component {
  getChildContext() {
    return {
      reportConnError: () => {
        if (this.disconnected) {
          this.disconnected.reportConnError()
        }
      }
    }
  }

  handleNavigation() {
    this.forceUpdate()
  }

  reportConnError() {
      this.disconnected.
      this.timer = setInterval(this.loadState.bind(this), 1000);
  }

  render () {
    let addrs = [];
    for (let a of this.props.page.addrs) {
      addrs.push(<span key={a}>{a}</span>, " ")
    }

    let base = this.props.page.urlBase;

    return (
      <div className="top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-poznajKubernetes">
          <a className="navbar-brand" href="/">
            <img src="/static/img/logo.png" height="30" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarNav" aria-controls="navbarNav"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item nav-link active">
                <HighlightLink href={base+"/"} className="nav-item">Request Details</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/env"} className="nav-item">Server Env</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/mem"} className="nav-item">Memory</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/liveness"} className="nav-item">Liveness Probe</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/readiness"} className="nav-item">Readiness Probe</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/dns"} className="nav-item">DNS Query</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/keygen"} className="nav-item">KeyGen Workload</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <HighlightLink href={base+"/-/memq"} className="nav-item">MemQ Server</HighlightLink>
              </li>
              <li className="nav-item nav-link">
                <a className="nav-item" href={base+"/fs/"}>File system browser</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="title">
          <div className="alert alert-danger" role="alert">
            <svg className="icon icon-notification"><use xlinkHref="#icon-notification"></use></svg> { " " }
            <b>WARNING:</b> This server may expose sensitive and secret information. Be careful.
          </div>
          <Disconnected ref={el => this.disconnected = el}/>
          <h2><samp>{this.props.page.hostname}</samp></h2>
          <div>Demo application version <i>{this.props.page.version}</i></div>
          <div>Serving on {addrs}</div>
        </div>

        <div className="nav-container">
          <div className="content">
            <Locations onNavigation={this.handleNavigation.bind(this)}>
              <Location path={base+"/"} handler={Request} page={this.props.page}/>
              <Location path={base+"/-/env"} apiPath={base+"/env/api"} handler={Env}/>
              <Location path={base+"/-/mem"} apiPath={base+"/mem/api"} handler={Mem}/>
              <Location path={base+"/-/liveness"} serverPath={base+"/healthy"} handler={Probe}/>
              <Location path={base+"/-/readiness"} serverPath={base+"/ready"} handler={Probe}/>
              <Location path={base+"/-/dns"} serverPath={base+"/dns"} handler={Dns}/>
              <Location path={base+"/-/keygen"} serverPath={base+"/keygen"} handler={KeyGen}/>
              <Location path={base+"/-/memq"} serverPath={base+"/memq"} handler={MemQ}/>
            </Locations>
          </div>
        </div>
      </div>
    )
  }
}

App.childContextTypes = {
  reportConnError: React.PropTypes.func
}

