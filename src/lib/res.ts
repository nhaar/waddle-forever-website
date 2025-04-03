export class ErrorResponse extends Response {
  static create (status: number, message: string): ErrorResponse {
    return ErrorResponse.json({ 'error': message }, { status })
  }

  static invalidMediaName(): ErrorResponse {
    return ErrorResponse.create(400, 'Invalid media name');
  }

  static invalidVersion(): ErrorResponse {
    return ErrorResponse.create(400, 'Invalid version');
  }
}