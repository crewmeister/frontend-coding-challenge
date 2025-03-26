export class Response {
  constructor(response) {
      this.type = response.type;
      this.message = response.message;
      this.content = response.content;
  }
}

export class ErrorResponse extends Response {
  constructor(response) {
    super(response);
    this.type = 'ERROR';
    this.errorCode = response.errorCode || DEFAULT_ERROR;
  }
}

export class SuccessResponse extends Response {
  constructor(response) {
    super(response);
    this.type = 'SUCCESS';
  }
}

// App error codes
export const DEFAULT_ERROR = 10000;
