import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from '@mui/icons-material/MoreVert'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const ScheduledService = () => {

  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelected] = useState(0);
  const [error, setError] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
    setRowSelected(id);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleSchedule = () => {
    console.log(rowSelected);
    axios.post(`/scheduleEmail/${rowSelected}`).then(
      res => {
        console.log(res);
        console.log(res.data);
      }
    );
    setAnchorEl(null);
}

  useEffect(() => {
    setLoading(true);
    const getVehicleHistory = async () => {
        let response = await axios.get("/fetchAll").then((response) => {
          setVehicleHistory(response.data);
          console.log(response.data);
          setLoading(false);
      })
      .catch((error) => {
        setError(response.error);
          console.log(error);
          setLoading(false);
      })
    };

    getVehicleHistory();
    //setLoading(false);
},[]);

  return (
    <div>
    {loading ? (<CircularProgress />):(
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell >Number</StyledTableCell>
              <StyledTableCell >Owner Name</StyledTableCell>
              <StyledTableCell >MobNo</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Onboard Date</StyledTableCell>
              <StyledTableCell>Deliver Date</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleHistory.map((row) => (
              <StyledTableRow key={row.onBoardId} >
                <StyledTableCell component="th" scope="row">
                  {row.vehicleName}
                </StyledTableCell>
                <StyledTableCell >{row.vehicleNumber}</StyledTableCell>
                <StyledTableCell >{row.ownerName}</StyledTableCell>
                <StyledTableCell >{row.ownerMobNo}</StyledTableCell>
                <StyledTableCell >{row.ownerEmail}</StyledTableCell>
                <StyledTableCell >{row.vehicleOnboardDate}</StyledTableCell>
                <StyledTableCell >{row.vehicleDeliveryDate}</StyledTableCell>
                <StyledTableCell >
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {handleClick(e,row.onBoardId)}}
                  >
                     <MoreVertIcon />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={()=>{handleClose(row.onBoardId)}}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => {handleClose(row.onBoardId)}}>Edit</MenuItem>
                    <MenuItem onClick={handleSchedule}>Reschedule</MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}      
          </TableBody>
          
        </Table>
      </TableContainer>
    )}
      
    </div> 
  );
}
export default ScheduledService;

