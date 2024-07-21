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
    getAllCategories,
    deleteCategoryById,
    IMAGE_URL,
  } from "../../api/apiService";
  
  import { Link } from 'react-router-dom'
  const CategoryHome = () => {
    const [categories, setCategories] = useState([]);
    const [checkDeleteCategory, setCheckDeleteCategory] = useState(false);
    const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
    const navigate = useNavigate();
    useEffect(() => {
        getAllCategories("categories").then((item) => setCategories(item.data));
      }, [navigate]);
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      const deleteCategoryByIdHandler = (id) => {
        try {
          deleteCategoryById("categories", id)
            .then((item) => {
              console.log(item);
              if (item.status === 204) {
                setCheckDeleteCategory(true);
                setCategories(categories.filter((key) => key.id !== id));
              }
            })
        } catch (error) {
          console.error(error);
          alert("Lỗi b!");
        }
      };
      return (
<CRow>
      <CCol>
            <CCardBody>
              <Link to="/backend/categories">
                <button>Add Category</button>
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
                    <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Image</CTableHeaderCell> */}
                    {/* <CTableHeaderCell scope="col"> <strong>Regular Price</strong></CTableHeaderCell>
                    <CTableHeaderCell scope="col"> <strong>Discount Price</strong></CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Category Description</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Tag</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Published</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(rowsPerPage > 0
                    ? categories.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : categories
                  ).map((row) => (
                    <>
                      <CTableRow key={row.id}>
                      <CTableHeaderCell>{row.categoryName}</CTableHeaderCell>
                      {/* <CTableDataCell>
                          
                      {row.image && (
          <img
            src={IMAGE_URL +row.image}
            style={{ width: 100 }}
            alt={row.image}
          />
        )}
                              
                        </CTableDataCell> */}
                      <CTableHeaderCell>{row.categoryDescription}</CTableHeaderCell>
                      <CTableDataCell>
                          <Link
                            to={`/backend/cathome/edit/category/${row.id}`}
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
                          onClick={() => deleteCategoryByIdHandler(row.id)}
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
              count={categories.length}
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

export default CategoryHome;    
