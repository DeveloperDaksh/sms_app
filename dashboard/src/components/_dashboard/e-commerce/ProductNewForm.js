import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { LoadingButton } from "@material-ui/lab";
import {
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
// utils
import fakeRequest from "../../../utils/fakeRequest";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import { QuillEditor } from "../../editor";
import { UploadMultiFile } from "../../upload";

import { Button } from "@material-ui/core";
import CSVReader from "react-csv-reader";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// ----------------------------------------------------------------------

const GENDER_OPTION = ["Men", "Women", "Kids"];

const CATEGORY_OPTION = [
  { group: "Clothing", classify: ["Shirts", "T-shirts", "Jeans", "Leather"] },
  {
    group: "Tailored",
    classify: ["Suits", "Blazers", "Trousers", "Waistcoats"],
  },
  {
    group: "Accessories",
    classify: ["Shoes", "Backpacks and bags", "Bracelets", "Face masks"],
  },
];

const TAGS_OPTION = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "Images is required"),
    price: Yup.number().required("Price is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      images: currentProduct?.images || [],
      code: currentProduct?.code || "",
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || "",
      priceSale: currentProduct?.priceSale || "",
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: Boolean(currentProduct?.inventoryType !== "out_of_stock"),
      taxes: true,
      gender: currentProduct?.gender || GENDER_OPTION[2],
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? "Create success" : "Update success", {
          variant: "success",
        });
        navigate(PATH_DASHBOARD.eCommerce.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("2021-08-09");
  const [format, setFormat] = useState("");
  const [scheduledTime, setScheduledTime] = useState("12:00");

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      setFieldValue(
        "images",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue("images", []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue("images", filteredItems);
  };

  const handleForce = (data, fileInfo) => {
    setData(data);
    setMessage("CSV Uploaded");
    handleClickSnack();
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  function handleClick(msg, mob) {
    console.log(msg);
    let call = `http://smspanel.sainfotechnologies.in/rest/services/sendSMS/sendGroupSms?AUTH_KEY=16de534cf94e560a76121a780f42e39&message=${msg}&senderId=HOMEBS&routeId=1&mobileNos=${mob}&smsContentType=english`;
    axios
      .get(call)
      .then((res) => {
        setText("");
        setMessage("Message Sent");
        handleClickSnack();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sendSMS = () => {
    if (data.length > 0)
      data.map(async (d) => {
        var message = text
          .replace("%COL2%", d.phonenumber)
          .replace("%COL1%", d.name);
        handleClick(message, d.phonenumber);
        try {
          await axios
            .post("http://localhost:5000/message/save", {
              message: message,
              phoneNumber: d.phonenumber,
              name: d.name,
              status: "Sent",
            })
            .then((res) => {
              console.log(res);
              setMessage("");
              setText("");
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      });
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  async function scheduleSMS(msg, mob) {
    let call = `http://smspanel.sainfotechnologies.in/rest/services/sendSMS/sendGroupSms?AUTH_KEY=16de534cf94e560a76121a780f42e39&message=${msg}&senderId=HOMEBS&routeId=1&mobileNos=${mob}&smsContentType=english&scheduleddate=${format} ${scheduledTime}`;

    try {
      await axios
        .get(call)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const formatDateFunc = (e) => {
    setScheduledDate(e.target.value);
    const formatedDate = e.target.value.split("-");
    setFormat(`${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`);
  };

  const sendScheduledSMS = () => {
    if (data.length > 0)
      data.map(async (d) => {
        var message = text
          .replace("%COL2%", d.phonenumber)
          .replace("%COL1%", d.name);
        scheduleSMS(message, d.phonenumber);
        try {
          await axios
            .post("http://localhost:5000/message/save", {
              message: message,
              phoneNumber: d.phonenumber,
              name: d.name,
              createdAt: `${scheduledDate}T${scheduledTime}`,
              status: "Scheduled",
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      });
  };

  return (
    <FormikProvider value={formik}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {data.length > 0 && (
              <Card
                sx={{ p: 3 }}
                style={{
                  maxHeight: "300px",
                  display: "scroll",
                  overflowY: "scroll",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => setText(`${text}` + "%COL1%")}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => setText(`${text}` + "%COL2%")}
                      >
                        Phone Number
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((d) => (
                      <TableRow key={data.indexOf(d)}>
                        <TableCell component="th" scope="row">
                          {d.name}
                        </TableCell>
                        <TableCell>{d.phonenumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>Description</LabelStyle>
                  {/* <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue("description", val)}
                    error={Boolean(touched.description && errors.description)}
                  /> */}
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue="Enter message ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                  {/* {values?.description?.split(">")[1] === "<br"
                    ? ""
                    : values?.description?.split(">")[1]?.split("<")[0]} */}
                </div>
                <div>
                  <LabelStyle>Upload CSV</LabelStyle>
                  {/* <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept=".csv"
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  /> */}
                  <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV  "
                    onFileLoaded={handleForce}
                    parserOptions={papaparseOptions}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={text === ""}
                  onClick={sendSMS}
                >
                  Submit
                </Button>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={scheduledDate}
                    onChange={formatDateFunc}
                  />
                  <TextField
                    id="time"
                    label="Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    style={{ marginLeft: "15px" }}
                  />
                </div>
                <Button
                  disabled={text === ""}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={sendScheduledSMS}
                >
                  Schedule
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('inStock')} checked={values.inStock} />}
                  label="In stock"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField fullWidth label="Product Code" {...getFieldProps('code')} />
                  <TextField fullWidth label="Product SKU" {...getFieldProps('sku')} />

                  <div>
                    <LabelStyle>Gender</LabelStyle>
                    <RadioGroup {...getFieldProps('gender')} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...getFieldProps('category')} value={values.category}>
                      {CATEGORY_OPTION.map((category) => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Tags" {...params} />}
                  />
                </Stack>
              </Card> */}

              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Regular Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Sale Price"
                    {...getFieldProps('priceSale')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card> */}

              {/* <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton> */}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
