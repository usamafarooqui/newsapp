import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class APP extends Component {
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        height={4}
        color='#7EC8E3'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path='/general' element={ <News setProgress={this.setProgress} key="general" pageSize={5} category="general" />} />
        <Route exact path='/business' element={ <News setProgress={this.setProgress} key="business" pageSize={5} category="business" />} />
        <Route exact path='/entertainment' element={ <News setProgress={this.setProgress} key="entertainment" pageSize={5} category="entertainment" />} />
        <Route exact path='/health' element={ <News setProgress={this.setProgress} key="health" pageSize={5} category="health" />} />
        <Route exact path='/science' element={ <News setProgress={this.setProgress} key="science" pageSize={5} category="science" />} />
        <Route exact path='/sports' element={ <News setProgress={this.setProgress} key="sports" pageSize={5} category="sports" />} />
        <Route exact path='/technology' element={ <News setProgress={this.setProgress} key="technology " pageSize={5} category="technology" />} />
        </Routes>
        </Router>
      </div>
    )
  }
}

