import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.service';

const Login = () => {

   const [loginInfo, setLoginInfo] = useState({
      email: "",
      password: ""
   });

   const [error, setError] = useState({
      email: "",
      password: ""
   });

   const [valid, setValid] = useState({
      email: '',
      password: ''
   });

   const handleSubmit = () => {
      let formValid = false;

      let regexMail = loginInfo.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*$/);

      if (loginInfo.email == '') {
         setError(error => {
            return { ...error, email: 'Email Cannot Be Empty' }
         })
         setValid(valid => {
            return { ...valid, email: false }
         })
         formValid = false;
      } else if (loginInfo.email != regexMail) {
         setError(error => {
            return { ...error, email: 'Invalid Email Format' }
         })
         setValid(valid => {
            return { ...valid, email: false }
         })
         formValid = false;
      } else {
         formValid = true;
      }

      if (loginInfo.password == '') {
         setError(error => {
            return { ...error, password: 'Password Cannot Be Empty' }
         })
         setValid(valid => {
            return { ...valid, password: false }
         })
         formValid = false;
      } else {
         formValid = true;
      }


      if (formValid) {
         let formdata = JSON.parse(localStorage.getItem('formdata'));

         formdata.map((data) => {
            if (data.email == loginInfo.email && data.password == loginInfo.password) {
               alert('Logined Successfully !!')
            } else {
               alert('No Users Found ! Create New Account')
            }

         })

      }


   }


   const handleChange = (e) => {
      const { name, value } = e.target;

      switch (name) {
         case 'email': {
            setLoginInfo({ ...loginInfo, email: value });
            if (loginInfo.email < 4) {
               setError({ ...error, email: 'Incorrect Email' });
               setValid({ ...valid, email: false })
            } else {
               setError({ ...error, email: "" });
               setValid({ ...valid, email: true })
            }
            break;
         }

         case 'password':
            setLoginInfo({ ...loginInfo, password: value });
            if (loginInfo.password.length < 6) {
               setError({ ...error, password: 'Password Must Be 6 Above' });
               setValid({ ...valid, password: false })
            } else {
               setError({ ...error, password: '' });
               setValid({ ...valid, password: true })
            }
            break;

         default:
            break;
      }

      // console.log(loginInfo);
   };


   return (
      <>
         <Card>
            <Card.Header className='text-center' as="h5">Login</Card.Header>
            <Card.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        type="email"
                        name='email'
                        value={loginInfo.email}
                        placeholder="Enter email"
                        onChange={(e) => handleChange(e)}
                        isValid={valid.email}
                        isInvalid={(valid.email === false) ? true : false}
                     />
                     <span className='text-danger'>{error.email}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        name='password'
                        value={loginInfo.password}
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}
                        isValid={valid.password}
                        isInvalid={(valid.password === false) ? true : false}
                     />
                     <span className='text-danger'>{error.password}</span>
                  </Form.Group>

                  <div className="d-grid gap-2">
                     <Button
                        variant="primary"
                        size="lg"
                        type='button'
                        onClick={handleSubmit}
                     >
                        Login
                     </Button>
                  </div>
                  <div className='mt-2 text-center'>
                     <Link to="/">Create New Account ?</Link>
                  </div>
               </Form>
            </Card.Body>
         </Card>
      </>
   )
}

export default Login