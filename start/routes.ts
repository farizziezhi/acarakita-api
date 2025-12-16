/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const DashboardController = () => import('#controllers/dashboard_controller')
const AuthController = () => import('#controllers/auth_controller')
const EventsController = () => import('#controllers/events_controller')
const ProfileController = () => import('#controllers/profile_controller')
const GraphqlController = () => import('#controllers/graphql_controller')
const WeatherController = () => import('#controllers/weather_controller')
const HolidaysController = () => import('#controllers/holidays_controller')
const SerpController = () => import('#controllers/serp_controller')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/events', [EventsController, 'index'])
    router.get('/events/:id', [EventsController, 'show'])
    router.post('/events', [EventsController, 'store'])
    router.put('/events/:id', [EventsController, 'update'])
    router.delete('/events/:id', [EventsController, 'destroy'])

    router.get('/dashboard', [DashboardController, 'dashboard'])

    router.get('/profile', [ProfileController, 'show'])
    router.put('/profile', [ProfileController, 'update'])
    router.post('/profile/reset-password', [ProfileController, 'resetPassword'])
    router.delete('/profile', [ProfileController, 'deleteAccount'])

    router.post('/graphql', [GraphqlController, 'handle'])

    router.get('/weather', [WeatherController, 'getForDate'])
    router.get('/weather/current', [WeatherController, 'current'])
    router.get('/holidays', [HolidaysController, 'get'])
    router.get('/recommendations', [SerpController, 'getRecommendations'])
  })
  .middleware(middleware.auth())
  .prefix('/api')
