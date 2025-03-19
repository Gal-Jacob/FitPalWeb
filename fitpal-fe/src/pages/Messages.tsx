import { Typography, Container, Card, CardContent } from "@mui/material";

const Messages = () => {
  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Messages
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Messages;
