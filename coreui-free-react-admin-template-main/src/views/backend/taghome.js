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
    getAllTags,
    deleteTagById,
    IMAGE_URL,
} from "../../api/apiService";

import { Link } from 'react-router-dom'


const TagHome = () => {
  const [tags, setTags] = useState([]);
  const [checkDeleteTags, setCheckDeleteTags] = useState(false);
  const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate();
  useEffect(() => {
    getAllTags("tags").then((item) => setTags(item.data));
  }, [navigate]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteTagByIdHandler = (id) => {
    try {
      deleteTagById("tags", id)
        .then((item) => {
          console.log(item);
          if (item.status === 204) {
            setCheckDeleteTags(true);
            setTags(tags.filter((key) => key.id !== id));
          }
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi trong trường hợp xóa không thành công
          alert("Category đang được sử dụng ở product, vui lòng xóa sản phẩm sử dụng category này và thử lại!");

        });
    } catch (error) {
      console.error(error);
      // Xử lý lỗi trong trường hợp gọi hàm deleteTagById bị lỗi
      alert("Lỗi!");

    }
  };


  return (

    <CRow>
      <CCol>
            <CCardBody>
              <Link to="/backend/tags">
                <button>Add Tag</button>
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
                    <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(rowsPerPage > 0
                    ? tags.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : tags
                  ).map((row) => (
                    <>
                      <CTableRow key={row.id}>
                        <CTableHeaderCell>{row.name}</CTableHeaderCell>

                        <CTableHeaderCell>{row.icon}</CTableHeaderCell>
                        <CTableDataCell>
                          <Link
                            to={`/backend/home/edit/tag/${row.id}`}
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
                          onClick={() => deleteTagByIdHandler(row.id)}
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
              count={tags.length}
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

export default TagHome;