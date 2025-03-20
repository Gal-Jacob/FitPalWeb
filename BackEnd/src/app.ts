import { initApp } from "./server";
import fs from 'fs';
import https from 'https';
import http from 'http';

const PORT = process.env.PORT || 5000;

initApp().then((app) => {

    if (process.env.NODE_MODE === "production") {
        // Use HTTPS in production
        const options = {
            key: fs.readFileSync('./src/cert/key.pem'),
            cert: fs.readFileSync('./src/cert/cert.pem')
        };
    
        https.createServer(options, app).listen(443, () => {
            console.log(`Server running on port 443 (Production)`);
        });
    } else {
        // Use HTTP in development
        http.createServer(app).listen(PORT, () => {
            console.log(`Server running on port ${PORT} (Development)`);
        });
    }

    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});
