import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { formatDistance } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
// material
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
// utils
//
import Scrollbar from "./Scrollbar";
import axios from "axios";

// ----------------------------------------------------------------------

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/message/getall")
        .then((data) => {
          setMessages(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card>
      <CardHeader title="All Messages" />

      <Table aria-label="simple table" style={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell align="right">Sent On</TableCell>
            <TableCell align="right">Sent Time</TableCell>
            <TableCell align="right">SMS status</TableCell>
            <TableCell align="right">Sent To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages?.map((mess) => (
            <TableRow key={mess._id}>
              <TableCell scope="row" style={{ maxWidth: "500px" }}>
                <strong>Message</strong>
                <br />
                {mess.message}
              </TableCell>
              <TableCell align="right">
                {mess.createdAt.split(".")[0].split("T")[0]}
              </TableCell>
              <TableCell align="right">
                {mess.createdAt.split(".")[0].split("T")[1]}
              </TableCell>
              <TableCell align="right">Sent</TableCell>
              <TableCell align="right">{mess.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
