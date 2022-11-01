import React, { useRef,useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  }
}));

const initialVehDetails = {
  vehicleModel: '',
  vehicleName: '',
  vehicleNumber: '',
  ownerName: '',
  ownerMobNo :'',
  ownerEmail: '',
  ownerAddress:'',
  vehicleOnboardDate :dayjs().format("MM/DD/YYYY"),
  vehicleDeliveryDate:dayjs().format("MM/DD/YYYY"),
  vehicleDetailingInfo:'',
  enableAutoService:true,
  
};

const VehicleDetailsForm = () => {

  const [vehDetForm, setvehDetForm] = useState(initialVehDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const valueRef = useRef('');
  const [veOnboardDate, setVeOnboardDate] = React.useState(dayjs().format("MM/DD/YYYY"));
  const [veDeliveryDate, setVeDeliveryDate] = React.useState(dayjs().format("MM/DD/YYYY"));
  const [open, setOpen] = React.useState(false);
  const [respMessage, setRespMessage] = useState();

  const onChange = e => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

  //   setvehDetForm((prevState) => ({
  //     ...prevState,
  //     vehDetails: {
  //       ...prevState.vehDetails,
  //       [name]: value,
  // }}))
  setvehDetForm((prevState) => ({
    ...prevState,    
    [name]: value
  }))
  };

  const handleSubmit = e => {
    setOpen(true);
    axios.post("/onBoard", vehDetForm ).then(
      res => {
        console.log(res);
        setRespMessage("Data Saved Successfully")
        if(res.status == 200){
          setRespMessage("Data Saved Successfully")
          //location.refresh
        }
      }
    );
  }

  const handleSendSelection = (event) => {
    const { name, value } = event.target;
    setvehDetForm((prevState) => ({
      ...prevState,    
      [name]: event.target.checked
    }))
  }

   const handleChange = (newValue) => {
    const { name, value } = newValue;
    setvehDetForm((prevState) => ({
      ...prevState,    
      [name]: value.format("MM/DD/YYYY")
    }))
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  return (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
      >  
      <div>
      <Root>
      <Divider sx={{
      "&::before, &::after": {
        borderColor: "secondary.light",
      },
    }}>Vehicle Information</Divider>
      <div>
          <TextField id="vehicleModel" label="Vehicle Model" variant="outlined" name ="vehicleModel"
            onChange={onChange}/>
          <TextField id="vehicleName" label="Vehicle Company" variant="outlined" name ="vehicleName" onChange={onChange}/>
      </div>
      <div>
        <TextField id="vehicleNumber" label="Vehicle Number" variant="outlined" name ="vehicleNumber" onChange={onChange}/>
        <TextField id="ownerName" label="Owner Name" variant="outlined" name ="ownerName" onChange={onChange}/>
        </div>
        <Divider sx={{
      "&::before, &::after": {
        borderColor: "secondary.light",
      },
    }}>Owner Details</Divider>
        <div>
        <TextField id="ownerMobNo" label="Owner MobileNumber" variant="outlined" name ="ownerMobNo" onChange={onChange}/>
        <TextField id="ownerEmail" label="Owner Email" variant="outlined" name ="ownerEmail" onChange={onChange}/>
        </div>
        <div>
        <TextField id="ownerAddress" label="Owner Address" variant="outlined" name ="ownerAddress" onChange={onChange}/>
        </div>
        <Divider sx={{
      "&::before, &::after": {
        borderColor: "secondary.light",
      },
    }}>Detailing Information</Divider>
        <div>
          
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Vehicle Onboard Date"
            inputFormat="MM/DD/YYYY"
            onChange={(date) => handleChange({ name: "vehicleOnboardDate", value: date })}
            value ={vehDetForm.vehicleOnboardDate} 
            renderInput={(params) => <TextField   {...params} />}
          />
           <DesktopDatePicker
            label="Vehicle Deliver Date"
            inputFormat="MM/DD/YYYY"
            onChange={(date) => handleChange({ name: "vehicleDeliveryDate", value: date })}
            value ={vehDetForm.vehicleDeliveryDate}
            renderInput={(params) => <TextField {...params} />}
          />

         </LocalizationProvider>
         <TextField id="vehicleDetailingInfo" label="Vehicle Detailing Info" variant="outlined" name ="vehicleDetailingInfo" onChange={onChange}/>
        </div>
        <div>
        <FormGroup>
          <FormControlLabel style={{  flexDirection: 'row', justifyContent: 'center' }}
          control={<Checkbox defaultChecked name ="enableAutoService" onClick={(event) => handleSendSelection(event)} /> } label="Enable Auto Service Reminder" />
        </FormGroup>   
        </div>

        <Divider sx={{
      "&::before, &::after": {
        borderColor: "secondary.light",
      },
    }}></Divider>

        <Stack spacing={2} direction="row">
      
      <Typography type="title" color="inherit" style={{ flex: 1 }} >
      <Button textAlign="right" variant="outlined" >Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button  variant="contained" disableElevation onClick={() => { handleSubmit() }}>
          Submit
      </Button>
      {/* <Snackbar
        open={respMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message={respMessage}
        //action={action}
      /> */}
      </Typography>
        </Stack>
      </Root>
      
      
      </div>
      </Box>
  );
}

export default VehicleDetailsForm;