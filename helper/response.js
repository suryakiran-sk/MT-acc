exports.goodResponse = (response, message, meta='') => {
    return (returnData = {
      data: {
        data: response,
        meta: meta,
      },
      success: true,
      message: message,
      statusCode: 200,
    });
}

exports.failedResponse = (response, message, meta='') => {
  if(message.includes('Bad input string') || message.includes('The "data" argument must be one of type string, Buffer, TypedArray, or DataView. Received type number')) message = 'invalid id provided';
  return (returnData = {
    data: {
      data: response,
      meta: meta,
    },
    success: false,
    message: message,
    statusCode: 401,
  });
}
