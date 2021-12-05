import {
  Navbar,
  Container,
  Nav,
  Button,
  Dropdown,
  SplitButton,
  ButtonGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const NavBar = (data) => {
  
  const history = useHistory();
  const firstName = data.data[0];
  const lastName = data.data[1];
  
  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ color: "white" }}>
            Project Tracker Board{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
        </Container>
        <Dropdown style={{ right: "1%", fontSize: "4px" }}>
          <SplitButton
            align={{ lg: "end" }}
            title="Settings"
            id="dropdown-autoclose-true"
            style={{ fontSize: "7px" }}
          >
            <Dropdown.Menu style={{ fontSize: "7px" }}>
              <Dropdown.Item href="#/action-1">Edit Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Your Projects</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                Signed in as{" "}
                <strong>
                  {" "}
                  {lastName}, {firstName}{" "}
                </strong>
              </Dropdown.Item>
            </Dropdown.Menu>
          </SplitButton>
        </Dropdown>
      </Navbar>

      <Navbar bg="light" expand="lg">
        <Container fluid>
          
          <Navbar.Collapse id="navbarScroll">
            <Nav variant="tabs" defaultActiveKey="/home">

              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>


              <Nav.Item>
                <Nav.Link href="/#">Projects</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/ticket">Create a Ticket</Nav.Link>
              </Nav.Item>

            </Nav>

          </Navbar.Collapse>
          
          <ButtonGroup
            size="md"
            style={{ right: "0px", float: "right" }}
          >
            <Button
              variant="outline-success"
              onClick={logOut}
            >
              Log out
            </Button>
          </ButtonGroup>
        </Container>
      </Navbar>
    </>
  );
};
