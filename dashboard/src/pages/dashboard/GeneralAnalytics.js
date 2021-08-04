// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../../components/Page";
import AllMessages from "./AllMessages";

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  return (
    <Page title="General: Analytics | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AllMessages />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
