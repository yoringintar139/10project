import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import type { ErrorCode } from '../../../../packages/shared/src/index.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(422).json({
      error: {
        code: 'VALIDATION_ERROR' satisfies ErrorCode,
        message: '요청 값을 확인해 주세요',
        details: error.flatten(),
      },
    });
    return;
  }

  response.status(500).json({
    error: {
      code: 'INTERNAL_ERROR' satisfies ErrorCode,
      message: '요청을 처리하지 못했어요',
      details: null,
    },
  });
};
