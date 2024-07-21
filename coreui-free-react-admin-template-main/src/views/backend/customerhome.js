import React from 'react'
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import { DocsExample } from 'src/components'
  
  import { useState, useEffect } from 'react'
  import { useNavigate } from 'react-router-dom'
  import {
    getAllCustomer,
    deleteCustomerById,
    IMAGE_URL,
  } from "../../api/apiService";
  
  import { Link } from 'react-router-dom'
  const CustomerHome = () => {
    const [users, setUsers] = useState([]);
    const [checkDeleteUsers, setCheckDeleteUser] = useState(false);
    const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
    const navigate = useNavigate();
    useEffect(() => {
        getAllCustomer("Users").then((item) => setUsers(item.data));
    }, [navigate]);
   
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const deleteUserByIdHandler = (id) => {
        deleteCustomerById("Users", id).then((item) => {
        console.log(item);
        if (item.status === 204) {
            setCheckDeleteUser(true);
            setUsers(users.filter((key) => key.id !== id));
        }
      });
    };
  
  
    return (
  
      <CRow>
        <CCol>
              <CCardBody>
                <Link to="/backend/customer/add">
                  <button>Add Customer</button>
                </Link>
                {/* Existing table code */}
              </CCardBody>
              </CCol>
        <CCol xs={12}>
        
          <CCard className="mb-4">
          
            <CCardHeader>
              <strong>React Table</strong> <small></small>
  
              
              
            </CCardHeader>
            <CCardBody>
  
              <DocsExample href="">
                <CTable color="dark" striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tag Icon</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Password</CTableHeaderCell>

                      <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {(rowsPerPage > 0
                      ? users.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : users
                    ).map((row) => (
                      <>
                        <CTableRow key={row.id}>
                          <CTableHeaderCell>{row.firstName}</CTableHeaderCell>
  
                          <CTableHeaderCell>{row.lastName}</CTableHeaderCell>

                          <CTableHeaderCell>{row.phone}</CTableHeaderCell>

                          <CTableHeaderCell>{row.email}</CTableHeaderCell>

                          <CTableHeaderCell>{row.passwordHash}</CTableHeaderCell>


                          <CTableDataCell>
                            <Link
                              to={`/backend/home/edit/customer/${row.id}`}
                            >
                              <button
                                size="small"
                                variant="contained"
                                color="primary"
                              >
                                Edit
                              </button>
                            </Link>
                          </CTableDataCell>
                          <CTableDataCell> <button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => deleteUserByIdHandler(row.id)}
                          >
                            Remove
                          </button>
                          </CTableDataCell>
                        </CTableRow>
  
                      </>
  
                    ))}
                  </CTableBody>
                </CTable>
              </DocsExample>
  
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="white-text"
              />
  
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  
  export default CustomerHome;