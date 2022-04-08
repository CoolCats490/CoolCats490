import React, { useState } from "react";
//
import { InputGroup, Form, Container } from "react-bootstrap";
import Button from "./button";
//React Select
import CreatableSelect from "react-select/creatable";
//database connection to backend
import axios from "axios";
//validation
import { useFormik } from "formik";
import * as yup from "yup";

export default function RegisterPage2(props) {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  //Tag Select Options
  const optionsTags = [
    { value: "concert", label: "Concert" },
    { value: "cosplay", label: "Cosplay" },
    { value: "cooking", label: "Cooking" },
    { value: "gaming", label: "Gaming" },
    { value: "surfing", label: "Surfing" },
  ];

  //useState stuff
  const [enteredTag, setTag] = useState([]);
  const [dbError, setDbError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const tagHandler = (event) => {
    setTag(event);
  };

  //Validation function
  const formik = useFormik({
    initialValues: {
      userName: "",
      enteredAge: "",
    },
    validationSchema: yup.object().shape({
      userName: yup
        .string()
        .required()
        .trim()
        .min(1, "Too Short!")
        .required("Required"),
      enteredAge: yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      let tags = [];
      enteredTag.forEach((e) => tags.push(e.value.toLowerCase()));

      //database stuff
      let combinedData = {
        username: values.userName,
        age: values.enteredAge,
        interests: tags,
        password: props.firstPageData.password,
        email: props.firstPageData.email,
        firstname: props.firstPageData.fName,
        lastname: props.firstPageData.lName,
      };

      //send data to database
      axios
        .post(url + "/users/add", combinedData)
        .then((res) => {
          setDbError(false);

          //move to next page
          props.onSetActive(props.active + 1);
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
      <h3 className="text-center">Personal Information </h3>

      <Form.Group className="mt-3">
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            id="userName"
            name="userName"
            type="text"
            placeholder="User Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            isValid={formik.touched.userName && !formik.errors.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {formik.errors.userName}
            </Container>
          ) : null}
          {dbError && (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {errMsg}
            </Container>
          )}
        </InputGroup>
      </Form.Group>

      <Form.Label className="mt-3">Interest</Form.Label>
      <CreatableSelect
        className="text-capitalize text-black"
        placeholder="Select or Create Interest"
        //Select multiple tags
        isMulti
        //Search for tags
        isSearchable
        onChange={tagHandler}
        options={optionsTags}
        //Set value of tag
        value={enteredTag}
      />

      <Form.Group className="mt-3 mb-3">
        <Form.Label>Age</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            id="enteredAge"
            name="enteredAge"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.enteredAge}
            isValid={formik.touched.enteredAge && !formik.errors.enteredAge}
          />
          {formik.touched.enteredAge && formik.errors.enteredAge ? (
            <Container className="text-dark text-center bg-warning rounded mb-2 mt-2">
              {formik.errors.enteredAge}
            </Container>
          ) : null}
        </InputGroup>
      </Form.Group>

      {props.active !== 1 && (
        <Button onClick={() => props.onSetActive(props.active - 1)}>
          Previous
        </Button>
      )}
      {props.active !== 3 && (
        <Button type="submit" style={{ float: "right" }}>
          Continue
        </Button>
      )}
    </Form>
  );
}
