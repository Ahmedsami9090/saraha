import connection from "./db/connectionDb.js";
import msgsRouter from "./modules/msgs/msgs.controller.js";
import userRouter from "./modules/users/users.controller.js";
import cors from 'cors'
const bootstrap = async (app, express) => {
  app.use(cors())
  app.use(express.json());
  await connection();
  app.get('/', (req,res,next)=>{
    res.json({msg : "welcome to saraha app"})
  })
  app.use("/users", userRouter);
  app.use("/messages", msgsRouter);

  app.use("*", (req, res, next) => {
    next(new Error("invalid url", { cause: 404 }));
  });
  app.use((err, req, res, next) => {
    return res
      .status(err["cause"] || 500)
      .json({
        message: "internal server error",
        error: err.message,
        stack: err.stack,
      });
  });
};

export default bootstrap;
