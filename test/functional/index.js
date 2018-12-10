import React from 'react'
import { Route, HashRouter, Switch, Link } from 'react-router-dom'
import { render } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import ScalarXAxisTests from './scalar-x-axis.test'
import ScalarYAxisTests from './scalar-y-axis.test'
import ScalarXYTests from './scalar-xy.test'
import Variations from './variations.test'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
  @import 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500';
  body {
    background-color: #e4e4e4;
    font-family: 'Roboto', Serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
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
  <Link to={'/scalar-x-axis'}>scalar x axis</Link>
  <HSpace />
  <Link to={'/scalar-y-axis'}>scalar y axis</Link>
  <HSpace />
  <Link to={'/scalar-xy'}>scalar XY</Link>
  <HSpace />
  <Link to={'/variations'}>variations</Link>
</NavBar>

render(<HashRouter>
  <div>
    <Nav />
    <Switch>
      <Route exact path='/scalar-x-axis' component={ScalarXAxisTests} />
      <Route exact path='/scalar-y-axis' component={ScalarYAxisTests} />
      <Route exact path='/scalar-xy' component={ScalarXYTests} />
      <Route exact path='/variations' component={Variations} />
    </Switch>
    <GlobalStyle />
  </div>
</HashRouter>, document.getElementById('contents'))
