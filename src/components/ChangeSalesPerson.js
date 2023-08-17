import {
    Button,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
    Typography,
  } from "@mui/joy";
  import { Autocomplete, TextField } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  const ChangeSalesPerson = ({taskId}) => {
    const [openSalesperson, setOpenSalesPerson] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [activeSalesPerson, setActiveSalesPerson] = useState("");
    const [error, setError] = useState(null); // State for storing error messages
    const [allSalesPersons, setAllSalespersons] = useState([]);
    const handleChangeSalespersons = async () => {
      const apiUrl = `/task/updateTaskBySalesPersonId/${taskId}/Sp_${activeSalesPerson.slice(
        -4
      )}`;
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
        toast.success("successfully changed SalesPerson");
        setOpen(false);
        console.log(response);
        setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
        setError("Failed to fetch tasks. Please try again later.");
      }
      //post method will be written
      //navigate("/update-task", { state: params.row });
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
        setAllSalespersons(salespersonss, "sppp");
        setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
        setError("Failed to fetch tasks. Please try again later.");
      }
    };
    useEffect(() => {
      getAllSalesPersonByRole();
    }, []);
    return (
      <div>
        <Stack spacing={2} width={100}>
          <React.Fragment>
            <Button
              style={{ marginBottom: "10px" }}
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              Change SalesPerson
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
              >
                <ModalClose onClick={() => setOpen(false)} />
                <Typography id="basic-modal-dialog-title" level="h2">
                  Change SalesPerson
                </Typography>
                <Stack spacing={2}>
                  <Autocomplete
                    //className="add-task-dropdown"
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={allSalesPersons}
                    value={activeSalesPerson}
                    onChange={(event, newValue) => setActiveSalesPerson(newValue)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sales Person" />
                    )}
                  />
                  <Button
                    onClick={() => {
                      //console.log(params.row);
                      handleChangeSalespersons();
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        </Stack>
      </div>
    );
  };
  export default ChangeSalesPerson;