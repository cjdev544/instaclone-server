const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userController = {
  registerUser: async (input) => {
    // Validations data
    const { username, email, password } = input

    try {
      const usernameExist = await User.findOne({ username })
      if (usernameExist)
        throw new Error(
          'El username ya se encuentra registrado!, coloca otro nombre de usuario'
        )

      const emailIsRegister = await User.findOne({ email: email.toLowerCase() })
      if (emailIsRegister)
        throw new Error('El correo ya se encuentra registrado')

      if (password.length < 6)
        throw new Error('La contraseña debe tener al menos 6 caracteres')

      // Create User and hash password
      const newUser = new User(input)

      const passwordHash = await bcrypt.hash(password, 10)
      newUser.password = passwordHash
      newUser.username = username.toLowerCase()
      newUser.email = email.toLowerCase()
      await newUser.save()

      return newUser
    } catch (err) {
      console.log(err)
      return err
    }
  },

  loginUser: async (input) => {
    try {
      const { email, password } = input
      const userExist = await User.findOne({ email: email.toLowerCase() })

      if (!userExist) throw new Error('El correo no se encuentra registrado')

      const passwordCompare = await bcrypt.compare(password, userExist.password)

      if (!passwordCompare)
        throw new Error('El correo y contraseña no coinciden')

      // Create jasonwebtoken
      const payload = {
        id: userExist.id,
        username: userExist.username,
        name: userExist.name,
      }
      const expiresIn = '72h'
      const token = jwt.sign(payload, process.env.SECRET_WORD, { expiresIn })

      return { token }
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getUser: async (username) => {
    try {
      const userExist = await User.findOne({ username })

      if (!userExist) throw new Error('Usuario no encontrado')

      return userExist
    } catch (err) {
      console.log(err)
      return err
    }
  },

  updateAvatar: async (file) => {
    console.log(file)
    return null
  },
}

module.exports = userController
