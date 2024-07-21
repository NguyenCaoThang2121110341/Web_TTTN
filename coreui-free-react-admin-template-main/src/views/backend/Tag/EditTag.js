import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { getTagById, editTag } from "../../../api/apiService";
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
  const { id: idTag } = useParams();
  const [name, setTagName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tag = await getTagById("tags", idTag);
        console.log(tag.data);
        setTagName(tag.data.name);
        setIcon(tag.data.icon);
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
  }, [idTag]);
  
    const handleEditTag = async (event) => {
      event.preventDefault();
  
      if ( icon !== "" && name !== "" ) {
        const tag = {
          // id: categoryId,
          // parentId: selectedParentCategory,
         
          icon,
          name,
          // icon,
          // image,
          // active,
        };
        console.log(tag);

        try {
          const editedTag = await editTag(
            `tags/${idTag}`,
            tag
          );
          setCheckUpdate(true);
        } catch (error) {
          console.error("Error editing category:", error);
        }
      }
    };
  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate("/backend/taghome");
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
                  onChange={(e) => setTagName(e.target.value)}
                  value={name}
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
                  id="icon"
                  onChange={(e) => setIcon(e.target.value)}
                  value={icon}
                  name="icon"
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

               <Grid item xs={12} style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  onClick={handleEditTag}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update Tag
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
