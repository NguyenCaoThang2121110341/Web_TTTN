import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import {     getCustomerById,
  editCustomer} from "../../../api/apiService";
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

const EditCustomer = () => {
  const classes = useStyles();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const { id: idCustomer } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordHash, setPasswordhash] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = await getCustomerById("Users", idCustomer);
        console.log(customer.data);
        setFirstName(customer.data.firstName);
        setLastName(customer.data.lastName);
        setPhone(customer.data.phone);
        setEmail(customer.data.email);
        setPasswordhash(customer.data.passwordHash);
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
  }, [idCustomer]);
  
    const handleEditTag = async (event) => {
      event.preventDefault();
  
      if ( firstName !== "" && lastName !== "" && phone !== "" && email !== "" && passwordHash !== "" ) {
        const user = {
          // id: categoryId,
          // parentId: selectedParentCategory,
         
          firstName,
          lastName,
          phone,
          email,
          passwordHash
          // icon,
          // image,
          // active,
        };
        console.log(user);

        try {
          const editedCustomer = await editCustomer(
            `Users/${idCustomer}`,
            user
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
        navigate("/backend/customerhome");
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
                  First Name
                </Typography>
                <TextField
                  id="title"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  name="title"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Last Name
                </Typography>
                <TextField
                  id="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  name="lastname"
                  className={classes.txtInput}
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Phone
                </Typography>
                <TextField
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  name="phone"
                  className={classes.txtInput}
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Email
                </Typography>
                <TextField
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  className={classes.txtInput}
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Password
                </Typography>
                <TextField
                  id="passwordhash"
                  onChange={(e) => setPasswordhash(e.target.value)}
                  value={passwordHash}
                  name="passwordhash"
                  className={classes.txtInput}
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>


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

export default EditCustomer;
