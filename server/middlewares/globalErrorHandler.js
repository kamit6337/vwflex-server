import { environment } from "../utils/environment.js";

const PRODUCTION = "production";

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || "Error";

  if (err.name === "MulterError" && err.code === "LIMIT_UNEXPECTED_FILE") {
    err.statusCode = 404;
    err.status = "Multer Error";
    err.message =
      "Please check your file once again. There is some issue in it.";
  }

  if (err.name === "TypeError") {
    console.log("Type Error", err);

    err.statusCode = 404;
    err.status = "Server Error";
    err.message = "Server is down. Please login again after sometime!";
  }

  if (err.name === "TokenError") {
    err.statusCode = 400;
    err.status = "unAuthorized";
    err.message = "Sorry, your OAuth session has expired";
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.status = "unAuthorized";
    err.message = "Sorry, your session has expired";
  }

  if (err.name === "ValidationError") {
    err.statusCode = 401;
    err.status = "Error";
    err.message = `Validation Error : ${err.message}`;
  }

  if (err.code === 11000) {
    err.statusCode = 400;
    err.status = "Duplicate Error";

    err.message = "";

    Object.keys(err.keyValue).forEach((key) => {
      err.message += key + ", ";
    });

    err.message = err.message.split(",").slice(0, -1).join(",");

    err.message = err.message + " - this should be Unique. Try Different....";
  }

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 404;
    err.status = "Forbidden";
    err.message = "Please login again..";
  }

  if (err.message.includes("ETIMEDOUT")) {
    err.statusCode = 404;
    err.status = "Connection Error";
    err.message = "Please check your connection. This is a network issues.";
  }

  if (err.name === "AxiosError") {
    err.statusCode = 404;
    err.status = "Axios Error";
    err.message = "Please check your URL or you API key or Bearer Token.";
  }

  if (err.name === "InternalOAuthError") {
    res.redirect(environment.CLIENT_CHECKLOGIN_URL);
    return;
  }

  if (err.code === "ERR_OSSL_WRONG_FINAL_BLOCK_LENGTH") {
    err.statusCode = 403;
    err.status = "OTP Verification Error";
    err.message = "There is issue in OTP Verification. Please try later";
  }

  const errorResponse = {
    status: err.status,
    message: err.message, // Include the message property
  };

  if (environment.NODE_ENV !== PRODUCTION) {
    errorResponse.err = err;
    errorResponse.errStack = err.stack;
  }

  res.status(err.statusCode).json(errorResponse);
};

export default globalErrorHandler;
