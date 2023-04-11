import OneToOneComp from "@/components/dashBoard/OneToOneQuestion/OneToOneComp";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 2, mb: 2 }} maxWidth={false}>
      <Grid container spacing={2}>
        메인입니다.
        {/* <OneToOneComp /> */}
      </Grid>
    </Container>
  );
}
