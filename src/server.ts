import express, { Request, Response } from 'express';
import formRouter from './routers/formRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(formRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
