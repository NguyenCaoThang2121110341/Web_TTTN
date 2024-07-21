import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { InputAdornment } from '@material-ui/core';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../../api/apiService";
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

export default function AddTag() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordHash, setPasswordhash] = useState("");

    //const [icon, setIcon] = useState("");
    const navigate = useNavigate();





    const handlecreateTag = (event) => {
        event.preventDefault();

        if (
            firstName !== "",
            lastName !== "",
            email !== "",
            phone !== "",
            passwordHash !== ""


        ) {
            const user = {

                firstName,
                lastName,
                email,
                phone,
                passwordHash,

                // published,

            };
            console.log(user);
            setCheckAdd(true); // Nếu upload thành công, setCheckAdd thành true

            addCustomer("Users", user).then((item) => {
                console.log("added", item);

            });
        } else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    };
    useEffect(() => {
        if (checkAdd) {
            const timeout = setTimeout(() => {
                navigate("/backend/customerhome");
            }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

            // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
            return () => clearTimeout(timeout);
        }
    }, [checkAdd, navigate]);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Tag
                        </Typography>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    First Name
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="firstname"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    // value={productDescription}
                                    name="firstname"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Last Name
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="lastname"
                                    onChange={(e) => setLastName(e.target.value)}
                                    // value={productDescription}
                                    name="lastname"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Phone
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    name="phone"
                                    className={classes.txtInput}
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            pattern: "[0-9]*", // Chỉ cho phép nhập số
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {/* Icon hoặc ký hiệu tương ứng với ô nhập liệu */}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                   Email
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    // value={productDescription}
                                    name="email"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                   Password
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="password"
                                    onChange={(e) => setPasswordhash(e.target.value)}
                                    // value={productDescription}
                                    name="password"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "30px" }}>
                                <Button
                                    type="button"
                                    onClick={handlecreateTag}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add Tag
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
