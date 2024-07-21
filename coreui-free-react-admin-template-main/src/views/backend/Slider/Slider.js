import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { addSlide } from "../../../api/apiService";
import MenuItem from "@mui/material/MenuItem";
import { Image } from "react-bootstrap";
import { convertLength } from "@mui/material/styles/cssUtils";
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

export default function AddSlide() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [descriptionUrl, setDescriptionUrl] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [active, setActive] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate();


    const handleResetImages = () => {
        setSelectedImages([]);
        setImageFiles([]);
    };



    const handleUploadImages = async (id) => {
        const formData = new FormData();
        imageFiles.forEach((image) => {
            formData.append("files", image);
        });
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const response = await axios.post(
                `http://localhost:8080/api/slideshows/uploadImages/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt header Content-Type là multipart/form-data
                    },
                }
            );

            console.log("added", response);
            if (response.status === 200) {
                setCheckAdd(true); // Nếu upload thành công, setCheckAdd thành true
            } else {
                alert("Bạn chưa nhập đủ thông tin!"); // Nếu có lỗi, hiển thị thông báo
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi khi upload ảnh!"); // Xử lý khi có lỗi xảy ra trong quá trình upload
        }
    };




      const handleAddSlide = (event) => {
        event.preventDefault();

        if (descriptionUrl !== "") {
          const slide = {
            descriptionUrl,
            imageUrl,
            active,
          };

          console.log(slide);
          console.log("images", selectedImages);

          addSlide("slideshows", slide)
            .then((response) => {
              console.log("added", response);
              if (response.status === 201 && response.data) {
                handleUploadImages(response.data.id);
                setCheckAdd(true);
              } else {
                alert("Lỗi khi thêm danh mục mới!");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Lỗi khi gọi API!");
            });
        } else {
          alert("Bạn chưa nhập đủ thông tin!");
        }
      };

    useEffect(() => {
        if (checkAdd) {
            const timeout = setTimeout(() => {
                navigate("/backend/sliderhome");
            }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

            // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
            return () => clearTimeout(timeout);
        }
    }, [checkAdd, navigate]);


    const handleFileChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];
        const filesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setSelectedImages([...selectedImages, ...imagesArray]); // Cập nhật mảng hiển thị hình ảnh
                    setImageFiles([...imageFiles, ...filesArray]); // Cập nhật mảng các file hình ảnh

                    // Sắp xếp lại mảng selectedImages để đảm bảo thứ tự đún
                }
            };

            if (file) {
                reader.readAsDataURL(file);
                filesArray.push(file); // Thêm file vào mảng các file
            }
        }
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Slide
                        </Typography>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Slide Description
                                </Typography>
                                <TextField
                                    placeholder="Slide Description"
                                    id="descriptionUrl"
                                    onChange={(e) => setDescriptionUrl(e.target.value)}
                                    // value={productName}
                                    name="descriptionUrl"
                                    variant="outlined"
                                    className={classes.txtInput}
                                    size="small"
                                />
                            </Grid>



                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Active
                                </Typography>
                                <TextField
                                    id="active"
                                    select
                                    value={active}
                                    onChange={(e) => setActive(e.target.value)}
                                    variant="outlined"
                                    className={classes.txtInput}
                                    size="small"
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            </Grid>






                            <div
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
                                        color="success"
                                        className={classes.submit}
                                    >
                                        Reset Images
                                    </Button>
                                </label>

                                {selectedImages.map((image, index) => (
                                    <div key={index}>
                                        <Image src={image} alt={`Selected ${index}`} width={80} />
                                    </div>
                                ))}
                            </div>
                            <Grid item xs={12} style={{ marginTop: "30px" }}>
                                <Button
                                    type="button"
                                    onClick={handleAddSlide}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add Slide
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}