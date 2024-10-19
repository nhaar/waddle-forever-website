export class ErrorResponse extends Response {
  static create (status: number, message: string): ErrorResponse {
    return ErrorResponse.json({ 'error': message }, { status })
  }
}