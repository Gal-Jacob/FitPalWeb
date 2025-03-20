import { initApp } from "./server";

const PORT = process.env.PORT || 5000;

initApp().then((app) => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
