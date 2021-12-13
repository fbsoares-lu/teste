import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.store')
Route.get('/users', 'UsersController.index').middleware(['auth'])
Route.post('/login', 'SessionsController.store')

Route.post('/auth/recovery', 'Auth/RecoveriesController.store')
