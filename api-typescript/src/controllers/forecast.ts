import {Controller, Get } from '@overnightjs/core';
import { Response } from 'express';
import { Request } from 'supertest';

@Controller('forecast')
export class ForecastController {
    
    @Get('')
    public getForecastForLoggedUser( _: Request, res: Response ): void {
      res.send([{"mensagem": "/forecast"}])
    }
}
