import { BodyParam, Body, HeaderParam, JsonController, Post, UseBefore } from 'routing-controllers'
import errorsHandler from '../middlewares/errors-handler'

@JsonController('')
@UseBefore(errorsHandler)
export class BaseController {
  
  constructor () { }

  @Post('/')
  public async post(
    @Body() body: any 
  ): any {
    
  }
}