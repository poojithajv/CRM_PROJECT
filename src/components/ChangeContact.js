import { Autocomplete, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy";
import { Typography,TextField } from "@mui/material";
import toast from 'react-hot-toast'
import React,{useEffect, useState} from "react";
import { Button } from "react-bootstrap";


const ChangeContact = (props) => {
    const {dat,openContact}=props
  const [opencontact, setOpenContact] = useState(openContact);
  const [allContacts,setAllContacts]=useState([])
  const [error,setError]=useState(null)
  const [activeContact,setActiveContact]=useState('')


  const getAllContacts = () => {
    const apiUrl = "/ContactController/get_all_contact";
    const authToken = localStorage.getItem("token");
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        const contactNames = data.map(
          (each) => `${each.firstName}-${each.contactId.slice(-5)}`
        );
        console.log(data);
        setAllContacts(contactNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };

  useEffect(()=>{
    getAllContacts()
  })
  
  const handleChangeContact = async () => {
    console.log(activeContact, dat.contactId.contactId);
    const apiUrl = `/task/updateTaskByContactId/${
      dat.taskId
    }/contact_${activeContact.slice(-5)}`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      toast.success("Successfully changed Contact");
      setOpenContact(false)
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
  return (
    <div>
      <React.Fragment>
        <Modal open={opencontact} onClose={() => setOpenContact(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <ModalClose onClick={() => setOpenContact(false)} />
            <Typography id="basic-modal-dialog-title" level="h2">
              Change Contact
            </Typography>
            <Stack spacing={2}>
              <Autocomplete
                //className="add-task-dropdown"
                size="small"
                disablePortal
                id="combo-box-demo"
                options={allContacts}
                value={activeContact}
                onChange={(event, newValue) => setActiveContact(newValue)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sales Person" />
                )}
              />
              <Button
                onClick={() => {
                  //console.log(params.row);
                  handleChangeContact(dat);
                }}
              >
                Submit
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
};
export default ChangeContact;