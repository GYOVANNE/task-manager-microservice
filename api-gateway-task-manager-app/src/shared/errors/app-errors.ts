export class AppError extends Error {
  private readonly statusCode: number;

  constructor(message: any, statusCode?: number) {
    super(message ?? 'Erro de conexão');
    if (statusCode && typeof statusCode !== 'number') {
      statusCode = 500;
    }
    this.statusCode = statusCode ?? 500;
  }

  public getResponse() {
    const message =
      this.statusCode == 422 ? JSON.parse(this.message) : this.message;
    return {
      message: message,
      statusCode: this.statusCode,
    };
  }
}
