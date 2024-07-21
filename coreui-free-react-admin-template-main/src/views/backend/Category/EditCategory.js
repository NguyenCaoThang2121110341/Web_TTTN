import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, editCategory } from "../../../api/apiService";
import { Image } from "react-bootstrap";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  txtInput: {
    width: "98%",
    margin: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditCategory = () => {
  const classes = useStyles();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const { id: idCategory } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setcategoryDescription] = useState("");
  // const [image, setImage] = useState([]);
  // const [images, setImages] = useState([]);

  // const [selectedImages, setSelectedImages] = useState([]);
  // const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  // const handleResetImages = () => {
  //   setSelectedImages("");
  //   setImageFiles("");
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryById("categories", idCategory);
        console.log(category.data);
        setCategoryName(category.data.categoryName);
        setcategoryDescription(category.data.categoryDescription);
        // setRegularPrice(category.data.regularPrice);
        // setQuantity(category.data.quantity);
        // setPublished(category.data.published);
        // setProductWeight(category.data.productWeight);
        // setProductNote(category.data.productNote);
        // setShortDescription(category.data.shortDescription);
        // setSku(category.data.sku);

        // setImage(category.data.image);
        // setImages(category.data.image);
        // setDiscountPrice(product.data.discountPrice);
        // setCategories(product.data.categories.map((category) => category.id));
        // setTags(product.data.tags.map((category) => category.id));
        // const categoryData = await getAllCategories("categories");
        // setCategoryAll(categoryData.data);
        // const tagData = await getAllCategories("tags");
        // setTagAll(tagData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCategory]);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/categories/${idCategory}`
  //       );
  //       setImages(response.data);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };
  
  //   fetchImages();
  // }, [idCategory]);
    //   const handleUploadImage = async (idCategory) => {
    //   const formData = new FormData();
    //   formData.append("file", imageFiles);
  
    //   try {
    //     const response = await axios.post(
    //       `http://localhost:8080/api/categories/uploadImage/${idCategory}`,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
  
    //     if (response.status === 200) {
    //       setCheckUpdate(true);
    //     } else {
    //       alert("Bạn chưa nhập đủ thông tin!");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     alert("Đã xảy ra lỗi khi upload ảnh!");
    //   }
    // };
  
    const handleEditCategory = async (event) => {
      event.preventDefault();
  
      if (categoryName !== "" && categoryDescription !== "") {
        const category = {
          // id: categoryId,
          // parentId: selectedParentCategory,
          categoryName,
          categoryDescription,
          // icon,
          // image,
          // active,
        };
        console.log(category);

        try {
          const editedCategory = await editCategory(
            `categories/${idCategory}`,
            category
          );
          if (editedCategory.status === 200) {
            if (imageFiles.length > 0) {
              // handleUploadImage(idCategory);
            } else {setCheckUpdate(true);
              
            }
          } else {
            alert("Bạn chưa nhập đủ thông tin!");
          }
        } catch (error) {
          console.error("Error editing category:", error);
        }
      }
    };
  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate("/backend/cathome");
      }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

      // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
      return () => clearTimeout(timeout);
    }
  }, [checkUpdate, navigate]);

  // const handleChangeCategories = (event) => {
  //   const selectedIds = event.target.value;
  //   console.log(selectedIds);
  //   setCategories(selectedIds);
  // };
  // const handleChangeTags = (event) => {
  //   const selectedIds = event.target.value;
  //   setTags(selectedIds);
  // };
  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   const imagesArray = [];
  //   const filesArray = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       imagesArray.push(reader.result);
  //       if (imagesArray.length === files.length) {
  //         setSelectedImages([...selectedImages, ...imagesArray]); // Cập nhật mảng hiển thị hình ảnh
  //         setImageFiles([...imageFiles, ...filesArray]); // Cập nhật mảng các file hình ảnh
  //       }
  //     };

  //     if (file) {
  //       reader.readAsDataURL(file);
  //       filesArray.push(file); // Thêm file vào mảng các file
  //     }
  //   }
  // };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Edit Category
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Category Name
                </Typography>
                <TextField
                  id="title"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={categoryName}
                  name="title"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Body
                </Typography>
                <TextField
                  id="categoryDescription"
                  onChange={(e) => setcategoryDescription(e.target.value)}
                  value={categoryDescription}
                  name="categoryDescription"
                  className={classes.txtInput}
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Regular Price
                </Typography>
                <TextField
                  id="regularPrice"
                  onChange={(e) => setRegularPrice(e.target.value)}
                  value={regularPrice}
                  name="regularPrice"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Sku
                </Typography>
                <TextField
                  id="sku"
                  onChange={(e) => setSku(e.target.value)}
                  value={sku}
                  name="sku"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Quantity
                </Typography>
                <TextField
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  name="quantity"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  ProductNote
                </Typography>
                <TextField
                  id="productNote"
                  onChange={(e) => setProductNote(e.target.value)}
                  value={productNote}
                  name="productNote"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Short Description
                </Typography>
                <TextField
                  id="shortdescription"
                  onChange={(e) => setShortDescription(e.target.value)}
                  value={shortDescription}
                  name="shortdescription"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}


              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  ProductWeight
                </Typography>
                <TextField
                  id="productWeight"
                  onChange={(e) => setProductWeight(e.target.value)}
                  value={productWeight}
                  name="productWeight"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid> */}


              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Published
                </Typography>
                <TextField
                  id="published"
                  select
                  value={published}
                  onChange={(e) => setPublished(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </Grid> */}



              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Discount Price
                </Typography>
                <TextField
                  id="discountPrice"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  value={discountPrice}
                  name="discountPrice"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Choose Categories
                </Typography>
                <TextField
                  id="categories"
                  name="categories"
                  select
                  value={categories}
                  onChange={handleChangeCategories}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => {
                      const selectedCategories = selected.map((id) => {
                        const category = categoryAll.find(
                          (category) => category.id === id
                        );
                        return category ? category.categoryName : "";
                      });
                      return selectedCategories.join(", ");
                    },
                  }}
                  variant="outlined"
                  className={classes.txtInput}
                >
                  {categoryAll.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
              {/* <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Choose Tags
                </Typography>
                <TextField
                  id="tags"
                  name="tags"
                  select
                  value={tags}
                  onChange={handleChangeTags}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => {
                      const selectedCategories = selected.map((id) => {
                        const category = tagAll.find(
                          (category) => category.id === id
                        );
                        return category ? category.name : "";
                      });
                      return selectedCategories.join(", ");
                    },
                  }}
                  variant="outlined"
                  className={classes.txtInput}
                >
                  {tagAll.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}

{/* <div
  style={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }}
>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={handleFileChange}
    style={{ display: "none" }}
    id="imageInput"
  />
  <label htmlFor="imageInput">
    <Button component="span">Choose Images</Button>
    <Button
      type="button"
      onClick={handleResetImages}
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
    >
      Reset Images
    </Button>
  </label>
  {Array.isArray(images) && images.length > 0 ? (
    <div>
      <Image
        src={IMAGE_URL + images[0].imagePath}
        alt={`Selected 0`}
        width={80}
      />
    </div>
  ) : null}
</div>  */}
              <Grid item xs={12} style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  onClick={handleEditCategory}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditCategory;
