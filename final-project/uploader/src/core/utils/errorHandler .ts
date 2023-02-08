import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  switch (error.message) {
    case 'VALIDATION_ERROR':
      response.status(400).json({ message: error.message });
      break;
    case 'UNAUTHORIZED':
      response.status(401).json({ message: error.message });
      break;
    case 'NOT_FOUND':
      response.status(404).json({ message: error.message });
      break;
    default:
      response.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
      break;
  }
};

export default errorHandler;
