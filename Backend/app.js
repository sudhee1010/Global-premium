import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

export default app;