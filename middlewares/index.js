import JWT from "jsonwebtoken";


//Protected Routes token base
export const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // console.log(process.env.JWT_SECRET)
    // console.log(req.headers.authorization)
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

