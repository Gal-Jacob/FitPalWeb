import { Typography, Container, Card, CardContent } from "@mui/material";

const SignUp = () => {
  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              SignUp
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
