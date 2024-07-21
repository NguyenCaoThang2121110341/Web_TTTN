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
  getAllProducts,
  deleteProductById,
  IMAGE_URL,
} from "../../api/apiService";

import { Link } from 'react-router-dom'


const Home = () => {
  const [products, setProducts] = useState([]);
  const [checkDeleteProduct, setCheckDeleteProduct] = useState(false);
  const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts("products").then((item) => setProducts(item.data));
  }, [navigate]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteProductByIdHandler = (id) => {
    deleteProductById("products", id).then((item) => {
      console.log(item);
      if (item.status === 204) {
        setCheckDeleteProduct(true);
        setProducts(products.filter((key) => key.id !== id));
      }
    });
  };


  return (

    <CRow>
      <CCol>
<CCardBody>
              <Link to="/backend/products">
                <button>Add Product</button>
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
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col"> <strong>Regular Price</strong></CTableHeaderCell>
                    <CTableHeaderCell scope="col"> <strong>Discount Price</strong></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tag</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Published</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(rowsPerPage > 0
                    ? products.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : products
                  ).map((row) => (
                    <>
                      <CTableRow key={row.id}>
                        <CTableHeaderCell>{row.productName}</CTableHeaderCell>
                        <CTableDataCell>
                          {row.galleries && row.galleries.length > 0 && (
                            <img src={IMAGE_URL + row.galleries[0].imagePath}
                              style={{ width: 100 }}
                              alt={row.galleries[0].productName}
                            />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>
                            {Number(row.regularPrice).toLocaleString("vi-VN")}
                          </strong></CTableDataCell>

                          <CTableDataCell>
                          <strong>
                            {Number(row.discountPrice).toLocaleString("vi-VN")}
                          </strong></CTableDataCell>

                        <CTableDataCell>{row.categories.map((category, index) => (
                          <span key={index}>
                            {category.categoryName}
                            {index !== row.categories.length - 1 ? ', ' : ''}
                          </span>
                        ))}</CTableDataCell>

                        <CTableDataCell> {row.tags.map((tag, index) => (
                          <span key={index}>
                            {tag.icon}
                            {index !== row.tags.length - 1 && ', '}
                          </span>
                        ))}
                        </CTableDataCell>

                        <CTableDataCell align="center">
                          {row.published ? "Published" : "Not Published"}
                        </CTableDataCell>

                        <CTableDataCell>
                          <Link
                            to={`/backend/home/edit/product/${row.id}`}
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
                          onClick={() => deleteProductByIdHandler(row.id)}
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
              count={products.length}
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

export default Home