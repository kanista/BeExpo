import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyDefaultLayout from "../../layout/CompanyDefaultLayout";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import {TablePagination} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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

const PostedPro = () => {
  const classes = useStyles();
  const [getProjectdata, setProjectdata] = useState([]);
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
    const res = await fetch("http://localhost:5000/project/postedproject", {
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
      setProjectdata(data.reverse())
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:5000/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization':localStorage.getItem("token")
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
      message.error("Error")
    } else {
      console.log("project deleted");
      message.success("Project Deleted Successfully!...")
      getdata();
    }

  }

  return (
    <CompanyDefaultLayout>
      <div>
        <h1>Posted Project Information</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">

            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Due Date</StyledTableCell>
                <StyledTableCell align="right">Posted On</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getProjectdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project, id) => {
                return (
                  <StyledTableRow key={project._id}>

                    <StyledTableCell component="th" scope="row">
                      {project.title}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {project.categories}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {moment.utc(project.registerbeforedate).local().format("MMM DD yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {moment.utc(project.postedprojectdate).local().format("MMM DD yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="right">

                      <Link to={`view/${project._id}`}>
                        <RemoveRedEyeIcon style={{ color: "green", marginLeft: 6 }} />
                      </Link>

                      <Link to={`/postedproject/edit/${project._id}`}>
                        <EditIcon style={{ color: "blue", marginLeft: 6 }} />
                      </Link>

                      <Popconfirm
                        title="Do you really want to delete this Project?"
                        onConfirm={()=>deleteuser(project._id)}
                        okText="Yes"
                        cancelText="No"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        <DeleteIcon style={{ color: "red", marginLeft: 6 }}></DeleteIcon>
                      </Popconfirm>

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
          count={getProjectdata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </CompanyDefaultLayout>

  );
};

export default PostedPro;
