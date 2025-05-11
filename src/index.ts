import express from "express";
import * as admin from 'firebase-admin';
import postRoutes from "./modules/post/routes";
import { firebaseAdminConfig } from "./config/firebase";

const PORT = 8080;

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig as admin.ServiceAccount),
});

const app = express();
app.use(express.json());

app.use("/post", postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
