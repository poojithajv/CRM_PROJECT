import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import toast from "react-hot-toast";
import "./index.css";
function WithHeaderExample({taskId}) {
  const [validated, setValidated] = useState(false);
  const initialFormState = {
    activeSalesActivity: "",
    activeOutCome: "",
    activeStatus: "",
    followUpDate: "",
    leadFeedBackDate: "",
    leadFeedback: "",
    taskFeedback: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let errors = [];
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (Object.values(formData).some((value) => value === "")) {
        // Check if any field is empty
        errors.push("Please Check All Fields!");
      } else {
        setFormData(initialFormState);
        setValidated(true);
        onclickEditTask(event);
      }
    }
    setFormErrors(errors);
  };
  const resetDropdown = (setState) => {
    setState(""); // Reset the selected option to the first option
  };
  const onclickEditTask = (e) => {
    e.preventDefault();
    const UpdateObject = {
      taskStatus: {
        statusValue: formData.activeStatus,
      },
      taskOutcome: {
        statusValue: formData.activeOutCome,
      },
      followUpDate: formData.followUpDate,
      taskFeedback: formData.taskFeedback,
      leadFeedback: formData.leadFeedback,
      feedbackDate: formData.leadFeedBackDate,
      salesActivity: {
        statusValue: formData.activeSalesActivity,
      },
    };
    console.log(UpdateObject);
    const apiUrl = `/task/updateTaskSub/${taskId}`;
    const authToken = localStorage.getItem("token");
    //
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
      body: JSON.stringify(UpdateObject),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Task Updated");
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  return (
    <div style={{ display: "flex", padding: "20px", justifyContent: "center" }}>
      <Card>
        <Card.Header> Task Form</Card.Header>
        <Card.Body>
          <Card.Title className="text-center">Edit Your Task</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {formErrors.length > 0 && (
              <div className="text-danger mb-3">
                {formErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Task Feedback"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={formData.taskFeedback}
                    onChange={(e) =>
                      setFormData({ ...formData, taskFeedback: e.target.value })
                    }
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Lead Feedback"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={formData.leadFeedback}
                    onChange={(e) =>
                      setFormData({ ...formData, leadFeedback: e.target.value })
                    }
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Followup Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Followup date"
                  value={formData.followUpDate}
                  onChange={(e) =>
                    setFormData({ ...formData, followUpDate: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Followup Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>ActiveStatus</Form.Label>
                <Form.Select
                  value={formData.activeStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, activeStatus: e.target.value })
                  }
                  required
                >
                  <option>Active Status</option>
                  <option>Open</option>
                  <option>OverDue</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Active Outcome</Form.Label>
                <Form.Select
                  value={formData.activeOutCome}
                  onChange={(e) =>
                    setFormData({ ...formData, activeOutCome: e.target.value })
                  }
                  required
                >
                  <option>Outcome</option>
                  <option>Interested</option>
                  <option>Left Message</option>
                  <option>Not Responding</option>
                  <option>Not Interested</option>
                  <option>Not able to reach</option>
                  <option>Postponed</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>Sales Activity</Form.Label>
                <Form.Select
                  value={formData.activeSalesActivity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activeSalesActivity: e.target.value,
                    })
                  }
                  required
                >
                  <option>Sales Activity</option>
                  <option>Mail</option>
                  <option>Chat</option>
                  <option>Sms</option>
                  <option>Demo</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom33">
                <Form.Label>Lead Feedback Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Lead feedback date"
                  value={formData.leadFeedBackDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      leadFeedBackDate: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Lead Feedback Date.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationCustom04"
              ></Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <br />
                <Button type="submit">Submit form</Button>
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default WithHeaderExample;