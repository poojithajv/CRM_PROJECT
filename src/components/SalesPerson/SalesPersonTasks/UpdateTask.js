import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
function UpdateTask(props) {
  const [validated, setValidated] = useState(false);
  const { selectedItem, AllStatus } = props;
  console.log(AllStatus);
  const initialFormState = {
    activeSalesActivity: AllStatus.salesActivity?.statusValue || "",
    activeOutCome: AllStatus.taskOutcome?.statusValue || "",
    activeStatus: AllStatus.taskStatus?.statusValue || "",
    followUpDate: "",
    leadFeedBackDate: "",
    leadFeedback: AllStatus?.leadFeedback || "",
    taskFeedback: AllStatus?.taskFeedback || "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);
  const [allOutCome, setAllOutCome] = useState([]);
  const [allActiveStatus, setAllActiveStatus] = useState([]);
  const [allSalesActivity, setAllSalesActivity] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let errors = [];
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true); // Update the validated state
    } else {
      if (Object.values(formData).some((value) => value === "")) {
        errors.push("Please Check All Fields!");
      } else {
        setFormData(initialFormState);
        setValidated(false); // Reset the validated state
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
    const apiUrl = `/task/updateTaskSub/${selectedItem.taskId}`;
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
        window.location.reload()
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        toast.error(error.message);
        console.error("Error:", error);
      });
  };
  const getAllOutComes = async () => {
    const apiUrl = `/app/statuses/Task_Outcome/Task`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        //setIsStatusLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data, "tasks");
      // console.log(data, "outcomes");
      setAllOutCome(data);
      //setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      //setError("Failed to fetch tasks. Please try again later.");
    }
  };
  const getAllActiveStatus = async () => {
    const apiUrl = `/app/statuses/Task_Status/Task`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        //setIsStatusLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //console.log(data, "Statussssssssssss");
      setAllActiveStatus(data);
      //setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      //console.error("Error:", error);
      //setError("Failed to fetch tasks. Please try again later.");
    }
  };
  const getAllSalesActivity = async () => {
    const apiUrl = `/app/statuses/Sales_ActivityStatus/Salesperson`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        //setIsStatusLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data, "Salesssssssssssssssssssss");
      setAllSalesActivity(data);
      //setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      //setError("Failed to fetch tasks. Please try again later.");
    }
  };
  useEffect(() => {
    getAllOutComes();
    getAllActiveStatus();
    getAllSalesActivity();
  }, []);
return (
    <div style={{ }}>
      {/* <p>
        <b>Task Description :</b>
        {AllStatus.taskOutcome.statusDescription}
      </p>
      <p>
        <b>Task Status :</b>
        {AllStatus.taskStatus.statusDescription}
      </p>
      <p>
        <b>Sales Activity :</b>
        {AllStatus.salesActivity.statusDescription}
      </p> */}
      <div
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <Card>
          <Card.Header> Edit Task</Card.Header>
          <Card.Body>
            {/* <Card.Title className="text-center">Edit Your Task</Card.Title> */}
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
                      style={{ height: "75px" }}
                      value={formData.taskFeedback}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taskFeedback: e.target.value,
                        })
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
                      style={{ height: "75px" }}
                      value={formData.leadFeedback}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          leadFeedback: e.target.value,
                        })
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
                    <option value="">Active Status</option>
                    {allActiveStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>Active Outcome</Form.Label>
                  <Form.Select
                    value={formData.activeOutCome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activeOutCome: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Active OutCome</option>
                    {allOutCome.map((outcome, index) => (
                      <option key={index} value={outcome}>
                        {outcome}
                      </option>
                    ))}
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
                    <option value="">Sales Activity</option>
                    {allSalesActivity.map((activity, index) => (
                      <option key={index} value={activity}>
                        {activity}
                      </option>
                    ))}
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
                  <Button type="submit">Update Task</Button>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default UpdateTask;