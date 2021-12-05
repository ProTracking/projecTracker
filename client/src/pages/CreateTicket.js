import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { NavBar } from "../components/NavBar";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

export const CreateTicket = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, email } = user;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [html, setHtml] = useState("");
  const [priority, setPriority] = useState('low');
  const history = useHistory();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `/api/user/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFirstName(response.data.data.rows[0].first_name);
      setLastName(response.data.data.rows[0].last_name);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  getUser();

  const saveChanges = async () => {
    try {
      const response = await axios.get(
        `/api/users/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };


  const handleFormSubmit = async (e) => {
    setSuccessMsg('')
    setErrorMsg('')
    e.preventDefault()
    const data = {
      subject,
      content,
      html,
      priority,
      user_id: id,
      project_id: 5,
      settings_id: 1,
      status: 'backlog'
    }

    try {
      const response = await axios.post(
          `/api/ticket`,
          {...data},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );

     setSuccessMsg(response.data.message)
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again later.');
    }
  }

  const resetValues = () => {
    // setFavoriteFood(info.favoriteFood);
    // setHairColor(info.hairColor);
    // setBio(info.bio);
  };

  return (
    <>
      <NavBar data={[firstName, lastName]} />
      <br />
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <Row className="mb-3">
            <Col></Col>
            <Col md={6} >
              {successMsg && <h1 style={{color: 'green'}}><center>{successMsg}</center></h1> }
              {errorMsg && <h1 style={{color: 'red'}}><center>{errorMsg}</center></h1> }

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter Subject" value={subject} name="subject" onChange={(e) => setSubject(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" placeholder="Enter content" value={content} name="content" onChange={(e) => setContent(e.target.value)} />
              </Form.Group>
              <br/>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                    as="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value) }
                >
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </Form.Control>

              </Form.Group>
              <br/>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>HTML</Form.Label>
                <Form.Control type="textarea" placeholder="Enter html" value={html} name="html" onChange={(e) => setHtml(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col></Col>
            </Row>

          </Form>
        </Container>
      
    </>
  );
};
