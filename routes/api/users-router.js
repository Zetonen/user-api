import express from "express";
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.json({
    message: "Ok",
  });
});

usersRouter.post(
  "/register"
  //   isEmptyBody,
  //   validaterBody(userSignupSchema),
  //   usersController.signup
);

usersRouter.post(
  "/login"
  //   isEmptyBody,
  //   validaterBody(userSigninSchema),
  //   usersController.signin
);

// usersRouter.post("/logout", authenticate, usersController.logout);

// usersRouter.get("/current", authenticate, usersController.getCurrent);

export default usersRouter;
