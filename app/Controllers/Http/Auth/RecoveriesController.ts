import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import randomString from 'random-string'

import Recovery from 'App/Models/Recovery'
import User from 'App/Models/User'
import UserEmailValidator from 'App/Validators/UserEmailValidator'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class RecoveriesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { email } = request.all()

    try {
      await request.validate(UserEmailValidator)

      const user = await User.findBy('email', email)

      if (user) {
        const recoveryUserAlredyExists = await Recovery.findBy('email', user.email)

        await recoveryUserAlredyExists?.delete()
      }

      const { token } = await Recovery.create({
        email,
        token: randomString({ length: 40 }),
      })

      try {
        await Mail.send((message) => {
          message
            .from('lsoareshfb@gmail.com')
            .to('lsoareshfb@gmail.com')
            .subject('Recuperação de senha')
            .htmlView('auth/emails/password_rest', {
              token,
            })
        })
      } catch (error) {
        console.log(error.message)
      }
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
