import express, { Request, Response, NextFunction } from "express";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class ErrorHandler {
  static handle(
    error: HttpError,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const status = error.status || 500;
    const message = error.message;
    response.setHeader("Content-type", "application/json");
    response.status(status).json({ status, message });
  }
}