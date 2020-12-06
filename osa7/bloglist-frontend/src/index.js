import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import App from './App'
import { Container, Row, Col } from 'react-bootstrap'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container>
        <Row>
          <Col>
            <App />
          </Col>
        </Row>
      </Container>
    </Router>
  </Provider>,
  document.getElementById('root')
)
