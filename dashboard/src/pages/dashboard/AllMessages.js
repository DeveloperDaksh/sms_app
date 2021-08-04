import faker from "faker";
import PropTypes from "prop-types";
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

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    postedAt: faker.date.soon(),
  };
});

// ----------------------------------------------------------------------

export default function AllMessages() {
  return (
    <Card>
      <CardHeader title="All Messages" />

      <Table aria-label="simple table" style={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell align="right">Sent Time</TableCell>
            <TableCell align="right">Route</TableCell>
            <TableCell align="right">SMS status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell scope="row" style={{ maxWidth: "500px" }}>
              <strong>Message</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sit amet semper ex, et efficitur mauris. Maecenas
              venenatis condimentum odio, eget dictum erat consequat sed. Donec
              a tincidunt lectus.
            </TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Route</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row" style={{ maxWidth: "500px" }}>
              <strong>Message</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sit amet semper ex, et efficitur mauris. Maecenas
              venenatis condimentum odio, eget dictum erat consequat sed. Donec
              a tincidunt lectus.
            </TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Route</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
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
