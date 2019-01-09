import React from 'react'
import { Route, HashRouter, Switch, Link } from 'react-router-dom'
import { render } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import ScalarXAxisTests from './scalar-x-axis.test'
import ScalarYAxisTests from './scalar-y-axis.test'
import ScalarXYGraphTests from './scalar-xy-graph.test'
import SparklineTests from './sparkline.test'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
  @import 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500';
  body {
    background-color: #e4e4e4;
    font-family: 'Roboto', Serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    -webkit-font-smoothing: antialiased;
    color: black;
  }
  h1, h2, h3 {
    font-family: 'Roboto', Serif;
    font-weight: 400;
  }
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 18px;
  }
  h3 {
    font-size: 16px;
  }
  a:visited {
    color: black;
  }
  th {
    font-weight: 400;
  }
`

const HSpace = styled.div`
  display: inline-block;
  width: 10px;
`

const NavBar = styled.div`
  margin: 20px;
`

const Nav = () => <NavBar>
  <Link to={'/scalar-x-axis'}>{'<ScalarXAxis />'}</Link>
  <HSpace />
  <Link to={'/scalar-y-axis'}>{'<ScalarYAxis />'}</Link>
  <HSpace />
  <Link to={'/scalar-xy-graph'}>{'<ScalarXYGraph />'}</Link>
  <HSpace />
  <Link to={'/sparkline'}>{'<Sparkline />'}</Link>
</NavBar>

render(<HashRouter>
  <div>
    <Nav />
    <Switch>
      <Route exact path='/scalar-x-axis' component={ScalarXAxisTests} />
      <Route exact path='/scalar-y-axis' component={ScalarYAxisTests} />
      <Route exact path='/scalar-xy-graph' component={ScalarXYGraphTests} />
      <Route exact path='/sparkline' component={SparklineTests} />
    </Switch>
    <GlobalStyle />
  </div>
</HashRouter>, document.getElementById('contents'))
