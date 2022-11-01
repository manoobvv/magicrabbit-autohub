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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const VehicleHistory = () => {

  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const getVehicleHistory = async () => {
        let response = await axios.get("/fetchAll").then((response) => {
          setVehicleHistory(response.data);
          console.log(response.data);
      })
      .catch((error) => {
        setError(response.error);
          console.log(error);
      })
    };

    getVehicleHistory();
    setLoading(false);
},[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Model</StyledTableCell>
            <StyledTableCell >Number</StyledTableCell>
            <StyledTableCell >Owner Name</StyledTableCell>
            <StyledTableCell >Owner MobNo</StyledTableCell>
            <StyledTableCell >Onboard Date</StyledTableCell>
            <StyledTableCell>Deliver Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleHistory.map((row) => (
            <StyledTableRow key={row.onBoardId}>
              <StyledTableCell component="th" scope="row">
                {row.vehicleName}
              </StyledTableCell>
              <StyledTableCell >{row.vehicleNumber}</StyledTableCell>
              <StyledTableCell >{row.ownerName}</StyledTableCell>
              <StyledTableCell >{row.ownerMobNo}</StyledTableCell>
              <StyledTableCell >{row.vehicleOnboardDate}</StyledTableCell>
              <StyledTableCell >{row.vehicleDeliveryDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
         
    
      </Table>
    </TableContainer>
  );
}
export default VehicleHistory;

