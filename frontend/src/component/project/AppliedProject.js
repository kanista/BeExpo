import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#001529',
    color: '#ffffff',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AppliedProject = () => {
  const classes = useStyles();
  const [applideProjectData, setapplideProjectData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getdata = async () => {
    const res = await fetch("http://localhost:5000/project/appliedproject", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization':localStorage.getItem("token")
      }
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {  // accessable data
      console.log("error ");

    } else {
      setapplideProjectData(data.reverse())
      console.log("get data");

    }
  }
  useEffect(() => {
    getdata();
  }, [])


  return (
    <StudentDefaultLayout>
      <div>
        <h1>Applied Project Information</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">

            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Applied On</StyledTableCell>
                <StyledTableCell align="right">Duration</StyledTableCell>
                {/* <StyledTableCell align="right">Applied Candidate</StyledTableCell> */}
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applideProjectData.map((applied, id) => {
                return (
                  <StyledTableRow key={applied._id}>

                    <StyledTableCell component="th" scope="row">
                      {applied.applyFor.title}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {applied.applyFor.categories}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {moment.utc(applied.appliedOn).local().format("MMM DD yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {applied.applyFor.duration} <p style={{fontWeight:"bold",display:"inline"}}>Months</p>
                    </StyledTableCell>

                    <StyledTableCell align="right">

                      <Link to={`/project/appliedproject/${applied._id}/view`}>
                          <RemoveRedEyeIcon style={{ color: "green", marginLeft: 6 }} />
                      </Link>

                    </StyledTableCell>

                  </StyledTableRow>
                );

              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={applideProjectData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </StudentDefaultLayout>

  );
};

export default AppliedProject;
