import React from 'react'
import { Route, HashRouter, Switch, Link } from 'react-router-dom'
import { render } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import ScalarXAxisTest from './scalar-x-axis.test'
import TimeXAxisTest from './time-x-axis.test'
import ScalarYAxisTest from './scalar-y-axis.test'
import ContinuousBarValuesTest from './continuous-bar-values.test'
import ScalarXScalarYGraphTest from './scalar-x-scalar-y-graph.test'
import TimeXScalarYGraphTest from './time-x-scalar-y-graph.test'
import TimeXAggregateYGraphTest from './time-x-aggregate-y-graph.test'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  @import 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500';
  body {
    font-family: 'Roboto Mono', Serif;
    font-weight: 400;
    background-color: #e4e4e4;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    color: black;
  }
  h1, h2, h3 {
    font-family: 'Roboto Mono', Serif;
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

const Margin = styled.div`
  margin: 20px;
`

const Nav = () => (
  <Margin>
    <div><Link to='/scalar-x-axis'>{'<ScalarXAxis />'}</Link></div>
    <div><Link to='/time-x-axis'>{'<TimeXAxis />'}</Link></div>
    <div><Link to='/scalar-y-axis'>{'<ScalarYAxis />'}</Link></div>
    <div><Link to='/continuous-bar-values'>{'<ContinuousBarValuesTest />'}</Link></div>
    <div><Link to='/scalar-x-scalar-y-graph'>{'<ScalarXScalarYGraph />'}</Link></div>
    <div><Link to='/time-x-scalar-y-graph'>{'<TimeXScalarYGraph />'}</Link></div>
    <div><Link to='/time-x-aggregate-y-graph'>{'<TimeXAggregateYGraph />'}</Link></div>
  </Margin>
)

render(
  <HashRouter>
    <div>
      <Nav />
      <Switch>
        <Route exact path='/scalar-x-axis' component={ScalarXAxisTest} />
        <Route exact path='/time-x-axis' component={TimeXAxisTest} />
        <Route exact path='/scalar-y-axis' component={ScalarYAxisTest} />
        <Route
          exact
          path='/continuous-bar-values'
          component={ContinuousBarValuesTest}
        />
        <Route
          exact
          path='/scalar-x-scalar-y-graph'
          component={ScalarXScalarYGraphTest}
        />
        <Route
          exact
          path='/time-x-scalar-y-graph'
          component={TimeXScalarYGraphTest}
        />
        <Route
          exact
          path='/time-x-aggregate-y-graph'
          component={TimeXAggregateYGraphTest}
        />
      </Switch>
      <GlobalStyle />
    </div>
  </HashRouter>,
  document.getElementById('contents')
)
