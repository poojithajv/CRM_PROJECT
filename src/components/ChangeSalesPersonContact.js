import { Autocomplete, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy";
import { Typography,TextField } from "@mui/material";
import toast from 'react-hot-toast'
import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";

function ChangeSalesPersonContact({dat,openSalesPersonContact}){
    const [activeSalesPerson,setActiveSalesPerson]=useState(null)
    const [openSalesPersonAndContact, setOpenSalesPersonAndContact] = useState(openSalesPersonContact)
    const [allSalesPersons,setAllSalesPersons]=useState([])
    const [allContacts,setAllContacts]=useState([])
    const [activeContact,setActiveContact]=useState(null)
    const [error,setError]=useState(null)


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
    const getAllSalesPersonByRole = async () => {
        const apiUrl = `/app/getAllSalesPerson`;
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
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log(data, "sppppppppppppppppppppppp");
          let salespersonss = data.map(
            (each) => `${each.user.userName}-${each.salespersonId.slice(-4)}`
          );
          setAllSalesPersons(salespersonss, "sppp");
          setError(null); // Clear any previous errors if the request succeeds
        } catch (error) {
          // Handle any error that occurred during the fetch request
          console.error("Error:", error);
          setError("Failed to fetch tasks. Please try again later.");
        }
      };

      useEffect(()=>{
        getAllSalesPersonByRole()
        getAllContacts()
      })
    const handleChangeSalesPersonAndContact = async () => {
        const apiUrl = `/task/updateTaskBySalesPersonAndContactId/${
          dat.taskId
        }/Sp_${activeSalesPerson.slice(-4)}/contact_${activeContact.slice(-5)}`;
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
          toast.success("Successfully Changes Made");
          console.log(response);
          setOpenSalesPersonAndContact(false)
          setError(null); // Clear any previous errors if the request succeeds
        } catch (error) {
          // Handle any error that occurred during the fetch request
          console.error("Error:", error);
          setError("Failed to fetch tasks. Please try again later.");
        }
      
    }
    return(
        <React.Fragment>
            <Modal
            open={openSalesPersonAndContact}
            onClose={() => setOpenSalesPersonAndContact(false)}
            >
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
            >
                <ModalClose onClick={() => setOpenSalesPersonAndContact(false)} />
                <Typography id="basic-modal-dialog-title" level="h2">
                Change Contact & SalesPerson
                </Typography>
                <Stack spacing={2}>
                <p>Sales Persons</p>
                <Autocomplete
                    //className="add-task-dropdown"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={allSalesPersons}
                    value={activeSalesPerson}
                    onChange={(event, newValue) =>
                    setActiveSalesPerson(newValue)
                    }
                    isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Sales Person" />
                    )}
                />
                <p>Contacts</p>
                <Autocomplete
                    //className="add-task-dropdown"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={allContacts}
                    value={activeContact}
                    onChange={(event, newValue) =>
                    setActiveContact(newValue)
                    }
                    isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Contacts" />
                    )}
                />
                <Button
                    onClick={() => {
                    //console.log(params.row);
                    handleChangeSalesPersonAndContact();
                    }}
                >
                    Submit
                </Button>
                </Stack>
            </ModalDialog>
            </Modal>
        </React.Fragment>
      )
}

export default ChangeSalesPersonContact