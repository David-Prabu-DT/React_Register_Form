import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import SignUp from './components/SignUp';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center align-items-center" style={{ height: '100vh' }}>
            <Col md={5}>
              <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App; 
