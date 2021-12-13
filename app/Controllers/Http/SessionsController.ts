import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class SessionsController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await request.validate(CreateUserValidator)
      const token = await auth.use('api').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
