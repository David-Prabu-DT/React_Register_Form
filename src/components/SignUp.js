import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.service'

const SignUp = () => {

  const [userInfo, setUserInfo] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: ""
  });

  const [valid, setValid] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: ""
  });

  const handleSubmit = () => {

    let formValid = false;

    if (userInfo.username == '') {
      setError(error => {
        return { ...error, username: 'Name Cannot Be Empty' }
      })
      setValid(valid => {
        return { ...valid, username: false }
      })
      formValid = false;
    } else {
      formValid = true;
    }

    if (userInfo.phonenumber == '') {
      setError(error => {
        return { ...error, phonenumber: 'Phonenumber Cannot Be Empty' }
      })
      setValid(valid => {
        return { ...valid, phonenumber: false }
      })
      formValid = false;
    } else {
      formValid = true;
    }

    let regexMail = userInfo.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*$/);

    if (userInfo.email == '') {
      setError(error => {
        return { ...error, email: 'Email Cannot Be Empty' }
      })
      setValid(valid => {
        return { ...valid, email: false }
      })
      formValid = false;
    } else if (userInfo.email != regexMail) {
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

    if (userInfo.password == '') {
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

      // for (const key in userInfo) {
      //   localStorage.setItem(`${key}`, userInfo[key]);
      // }

      // alert('User Registerd Successfully!');
      // window.location = "/login";

      let formdata = localStorage.getItem('formdata');

      if (formdata == null) {
        formdata = []
        formdata.push(userInfo)
        localStorage.setItem('formdata', JSON.stringify(formdata));
        console.log(formdata);
        alert('User Registered Successfully!')
        window.location = "/login";
      } else {
        let formArr = JSON.parse(formdata)

        formArr.map((data) => {
          if (userInfo.email == data.email) {
            alert('User already Registered!')
            return
          }
        })

        formArr.push(userInfo)
        localStorage.setItem("formdata", JSON.stringify(formArr))
        console.log(formArr)
        alert('User Registered Successfully!')
        window.location = "/login";
      }

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username': {
        let regex = value.match(/^[a-zA-Z]+$/i);;

        if (regex == value) {
          setUserInfo({ ...userInfo, username: value });
          setValid({ ...valid, username: true })
          setError({ ...error, username: "" });
        } else {
          setError({ ...error, username: 'Letters Only Allowed' });
          setValid({ ...valid, username: false })
        }
        break;
      }

      case 'phonenumber': {
        setUserInfo({ ...userInfo, phonenumber: value });
        let regex = value.match(/^[0-9]*$/);
        if (userInfo.phonenumber.length < 9) {
          setError({ ...error, phonenumber: 'Phone Number Must Be 10' });
          setValid({ ...valid, phonenumber: false })
        } else if (value != regex) {
          setError({ ...error, phonenumber: 'Numbers Only Allowed' });
          setValid({ ...valid, phonenumber: false })
        } else {
          setError({ ...error, phonenumber: "" });
          setValid({ ...valid, phonenumber: true })
        }

        break;
      }

      case 'email': {
        setUserInfo({ ...userInfo, email: value });
        if (userInfo.email < 4) {
          setError({ ...error, email: 'Incorrect Email' });
          setValid({ ...valid, email: false })
        } else {
          setError({ ...error, email: "" });
          setValid({ ...valid, email: true })
        }
        break;
      }

      case 'password':
        setUserInfo({ ...userInfo, password: value });
        if (userInfo.password.length < 6) {
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

    // console.log(userInfo);
  };


  return (
    <>
      <Card>
        <Card.Header className='text-center' as="h5">Sign Up</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name='username'
                value={userInfo.username}
                placeholder="Enter Name"
                onChange={(e) => handleChange(e)}
                isValid={valid.username}
                isInvalid={(valid.username === false) ? true : false}
              />
              <span className='text-danger'>{error.username}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name='phonenumber'
                value={userInfo.phonenumber}
                maxLength={10}
                placeholder="Enter Phone"
                onChange={(e) => handleChange(e)}
                isValid={valid.phonenumber}
                isInvalid={(valid.phonenumber === false) ? true : false}
              />
              <span className='text-danger'>{error.phonenumber}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name='email'
                value={userInfo.email}
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
                value={userInfo.password}
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
                Sign Up
              </Button>
            </div>

            <div className='mt-2 text-center'>
              <Link to="/login">All Ready Have An Account ? </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default SignUp