import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const user = await User.all()

    return user
  }

  public async store({ request, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await request.validate(CreateUserValidator)

      const user = await User.create({
        email,
        password,
      })

      return user
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
