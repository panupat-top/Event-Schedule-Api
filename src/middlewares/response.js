const httpStatus = require('http-status');

const httpResponse = (res, code, data = null | undefined, message = null | undefined) => {
  const HTTP_STATUS = (type) => httpStatus[`${code}_${type}`];
  const STATUS = HTTP_STATUS('CLASS') === '2xx';

  try {
    if (!STATUS) {
      throw { status: code, message: undefined };
    }

    const response = {
      result: true,
      status: httpStatus[HTTP_STATUS('NAME')],
      message: message || httpStatus[code],
      message_description: HTTP_STATUS('MESSAGE'),
    };

    if (data) {
      response.data = data;
    }

    return res.status(200).json({ ...response });
  } catch (error) {
    return handleError(res, error.status);
  }
};

const handleError = (res, code, message = null) => {
  const HTTP_STATUS = (type) => httpStatus[`${code}_${type}`];
  const STATUS = HTTP_STATUS('CLASS') === '4xx' ? 400 : 500;

  return res.status(STATUS).json({
    result: false,
    status: httpStatus[HTTP_STATUS('NAME')],
    message: message || httpStatus[code],
    message_description: HTTP_STATUS('MESSAGE'),
  });
};

module.exports = { httpStatus, httpResponse, handleError };

// :: ---------------------------------- :: 100
// 100 => CONTINUE
// 101 => SWITCHING_PROTOCOLS
// 102 => PROCESSING
// 103 => EARLY_HINTS
// :: ---------------------------------- :: 200
// 200 => OK
// 201 => CREATED
// 202 => ACCEPTED
// 203 => NON_AUTHORITATIVE_INFORMATION
// 204 => NO_CONTENT
// 205 => RESET_CONTENT
// 206 => PARTIAL_CONTENT
// 207 => MULTI_STATUS
// 208 => ALREADY_REPORTED
// 226 => IM_USED
// :: ---------------------------------- :: 300
// 300 => MULTIPLE_CHOICES
// 301 => MOVED_PERMANENTLY
// 302 => FOUND
// 303 => SEE_OTHER
// 304 => NOT_MODIFIED
// 305 => USE_PROXY
// 306 => SWITCH_PROXY
// 307 => TEMPORARY_REDIRECT
// 308 => PERMANENT_REDIRECT
// :: ---------------------------------- :: 400
// 400 => BAD_REQUEST
// 401 => UNAUTHORIZED
// 402 => PAYMENT_REQUIRED
// 403 => FORBIDDEN
// 404 => NOT_FOUND
// 405 => METHOD_NOT_ALLOWED
// 406 => NOT_ACCEPTABLE
// 407 => PROXY_AUTHENTICATION_REQUIRED
// 408 => REQUEST_TIMEOUT
// 409 => CONFLICT
// 410 => GONE
// 411 => LENGTH_REQUIRED
// 412 => PRECONDITION_FAILED
// 413 => REQUEST_ENTITY_TOO_LARGE
// 414 => REQUEST_URI_TOO_LONG
// 415 => UNSUPPORTED_MEDIA_TYPE
// 416 => REQUESTED_RANGE_NOT_SATISFIABLE
// 417 => EXPECTATION_FAILED
// 418 => IM_A_TEAPOT
// 421 => MISDIRECTED_REQUEST
// 422 => UNPROCESSABLE_ENTITY
// 423 => LOCKED
// 424 => FAILED_DEPENDENCY
// 426 => UPGRADE_REQUIRED
// 428 => PRECONDITION_REQUIRED
// 429 => TOO_MANY_REQUESTS
// 431 => REQUEST_HEADER_FIELDS_TOO_LARGE
// 451 => UNAVAILABLE_FOR_LEGAL_REASONS
// :: ---------------------------------- :: 500
// 500 => INTERNAL_SERVER_ERROR
// 501 => NOT_IMPLEMENTED
// 502 => BAD_GATEWAY
// 503 => SERVICE_UNAVAILABLE
// 504 => GATEWAY_TIMEOUT
// 505 => HTTP_VERSION_NOT_SUPPORTED
// 506 => VARIANT_ALSO_NEGOTIATES
// 507 => INSUFFICIENT_STORAGE
// 508 => LOOP_DETECTED
// 510 => NOT_EXTENDED
// 511 => NETWORK_AUTHENTICATION_REQUIRED
