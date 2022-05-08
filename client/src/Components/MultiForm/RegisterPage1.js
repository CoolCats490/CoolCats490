import React, { useState } from "react";
import Button from "./button";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputGroup, Col, Form, Row, Container } from "react-bootstrap";
//database connection to backend
import axios from "axios";



export default function RegisterPage1(props) {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const [dbError, setDbError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .required()
        .trim()
        .min(1, "Too Short!")
        .required("Required"),
      lastName: yup
        .string()
        .required()
        .trim()
        .min(1, "Too Short!")
        .required("Required"),
      emailAddress: yup.string().email("Invalid email").required("Required"),
      password: yup
        .string()
        .trim()
        .min(5, "Password must be 5 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("next page")
      //creating group data object
      const firstPageData = {
        fName: values.firstName,
        lName: values.lastName,
        email: values.emailAddress,
        password: values.password,
      };

      //send data to database
      axios.post(url + "/users/checkEmail", { email: values.emailAddress })
        .then(res => {
          console.log(res)
          setDbError(false);

          //move to next page
          props.onSetActive(props.active + 1);

          //lift state up
          props.onDataInput(firstPageData);
        })
        .catch((error) => {
          console.log(error.response);
          setErrMsg(error.response.data);
          setDbError(true);
        });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row className="">
        <Form.Group as={Col} md="6" className="mt-3">
          <Form.Label>First Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              className="pt-2 pb-2"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
                {formik.errors.firstName}
              </Container>
            ) : null}
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="6" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isValid={formik.touched.lastName && !formik.errors.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
                {formik.errors.lastName}
              </Container>
            ) : null}
          </InputGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3">
        <Form.Label>Email Address</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            id="emailAddress"
            name="emailAddress"
            type="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailAddress}
            isValid={formik.touched.emailAddress && !formik.errors.emailAddress}
          />
          {formik.touched.emailAddress && formik.errors.emailAddress ? (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {formik.errors.emailAddress}
            </Container>
          ) : null}
          {dbError && (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {errMsg}
            </Container>
          )}
        </InputGroup>
      </Form.Group>

      <Form.Group className="mt-3 mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isValid={formik.touched.password && !formik.errors.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {formik.errors.password}
            </Container>
          ) : null}
        </InputGroup>
      </Form.Group>

      <Button type="submit" style={{ float: "right" }}>
        Continue
      </Button>
    </Form>
  );
}
