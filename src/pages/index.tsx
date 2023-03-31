import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import SampleList1 from "./list/SampleList1";
import SampleList2 from "./list/SampleList2";
import SampleList3 from "./list/SampleList3";
import SampleList4 from "./list/SampleList4";
import SampleList5 from "./list/SampleList5";

export default function Home() {
  return (
    <Container sx={{ mt: 2, mb: 2 }} maxWidth={false}>
      <Grid container spacing={2}>
        {/* <SampleList1 />
        <SampleList2 />
        <SampleList3 />
        <SampleList4 />
        <SampleList5 /> */}
      </Grid>
    </Container>
  );
}
