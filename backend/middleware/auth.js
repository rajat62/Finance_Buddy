import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining here
    console.log(token);
    if (token) {
      const decodedData = jwt.verify(token, secret);
    }
    next();
    console.log(req.userId)
  } catch (error) {
    console.log(error);
    next(error); 
  }
};

export default auth;
