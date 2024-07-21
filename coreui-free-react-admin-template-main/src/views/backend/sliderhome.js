import React from 'react'
import Button from "@mui/material/Button";
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
    getAllSlideShow,
    deleteSlideById,
    IMAGE_URL
} from "../../api/apiService";

import { Link } from 'react-router-dom';
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
const SliderHome = () => {
    const [slideshows, setSlideShows] = useState([]);
    const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
    const [checkDeleteSlide, setCheckDeleteSlide] = useState(false);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteSlideShowByIdHandler = (id) => {
      deleteSlideById("slideshows", id).then((item) => {
          console.log(item);
          if (item.status === 204) {
            setCheckDeleteSlide(true);
            setSlideShows(slideshows.filter((key) => key.id !== id));
          }
        });
      };

    useEffect(() => {
        getAllSlideShow("slideshows").then((item) => setSlideShows(item.data));
    }, [navigate]);

    return (
        <div>
    <CRow>
      <CCol>
<CCardBody>
              <Link to="/backend/addslider">
                <button>Add Slider</button>
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
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Miêu tả link</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {(rowsPerPage > 0
                                        ? slideshows.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : slideshows
                                    ).map((row) => (
                                        <>
                                            <CTableRow key={row.id}>
                                                
                                                <CTableDataCell>
                          {row.imageUrl && (
                            <img
                              src={IMAGE_URL + row.imageUrl}
                              style={{ width: 100 }}
                              alt={row.imageUrl}
                            />
                          )}
                        </CTableDataCell>
                                                <CTableDataCell align="center">
                                                    {row.descriptionUrl}


                                                </CTableDataCell>

                                                <CTableDataCell>
                                                    {/* <Link to={`/edit-product/${row.id}`}>Edit</Link> */}
                                                    <Link to={`/base/slideshows/edit/${row.id}`}>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Edit
                                                        </Button>

                                                    </Link>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => deleteSlideShowByIdHandler(row.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </CTableDataCell>

                                            </CTableRow>

                                        </>

                                    ))}

</CTableBody>
              </CTable>
            </DocsExample>

                                <TablePagination
                                    // rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={slideshows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    style={{ color: 'white' }}
                                />
                           </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        </div>
    )
}

export default SliderHome;