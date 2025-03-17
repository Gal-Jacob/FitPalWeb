import { Typography, Container, Card, CardContent } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
