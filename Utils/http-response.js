const appPackage = require('../package.json');

function sendResponse(res, statusCode, success, message, data = {}, additionalHeaders = {}) {
  const response = {
    success,
    message,
    data,
    version: appPackage.version,
    ...additionalHeaders,
  };

  res.status(statusCode).json(response);
}

function httpSuccess(res, data = {}, message = 'Success') {
  sendResponse(res, 200, true, message, data);
}

function httpCreated(res, data = {}, message = 'Resource created') {
  sendResponse(res, 201, true, message, data);
}

function httpUpdated(res, data = {}, message = 'Resource updated') {
  sendResponse(res, 200, true, message, data);
}

function httpBadRequest(res, data = {}, message = 'Bad request') {
  sendResponse(res, 400, false, message, data);
}

function httpUnauthorized(res, message = 'Unauthorized') {
  sendResponse(res, 401, false, message);
}

function httpForbidden(res, message = 'Forbidden') {
  sendResponse(res, 403, false, message);
}

function httpNotFound(res, data = {}, message = 'Resource not found') {
  sendResponse(res, 404, false, message, data);
}

function httpConflict(res, data = {}, message = 'Conflict') {
  sendResponse(res, 409, false, message, data);
}

function httpUnprocessableEntity(res, data = {}, message = 'Unprocessable Entity') {
  sendResponse(res, 422, false, message, data);
}

function httpInternalServerError(res, error, message = 'Internal Server Error') {
  sendResponse(res, 500, false, message, error);
}

module.exports = {
  sendResponse,
  httpSuccess,
  httpCreated,
  httpUpdated,
  httpBadRequest,
  httpUnauthorized,
  httpForbidden,
  httpNotFound,
  httpConflict,
  httpUnprocessableEntity,
  httpInternalServerError,
};
