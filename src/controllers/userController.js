const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const User = require('../models/user')
const cloudinaryUploadImg = require('../utils/cloudinayUploadImg')

const userController = {
  /**********************************************************
   *  Create new User
   **********************************************************/
  createUser: async (input) => {
    // Validations data
    const { username, email, password } = input
    const formatEmail = email.toLowerCase().trim()
    const formatUsername = username.toLowerCase().trim()

    // Check format email is valid
    if (!validator.isEmail(formatEmail))
      throw new Error('El formato del correo no es correcto')

    try {
      const usernameExist = await User.findOne({ username: formatUsername })
      if (usernameExist)
        throw new Error(
          'El username ya se encuentra registrado!, coloca otro nombre de usuario'
        )

      const emailIsRegister = await User.findOne({ email: formatEmail })
      if (emailIsRegister)
        throw new Error('El correo ya se encuentra registrado')

      if (password.length < 6)
        throw new Error('La contraseña debe tener al menos 6 caracteres')

      // Create User and hash password
      const newUser = new User(input)

      const passwordHash = await bcrypt.hash(password, 10)
      newUser.password = passwordHash
      newUser.username = formatUsername
      newUser.email = formatEmail
      await newUser.save()

      return newUser
    } catch (err) {
      console.log(err)
      return err
    }
  },

  /**********************************************************
   *  Login User
   **********************************************************/
  loginUser: async (input) => {
    try {
      const { email, password } = input
      const formatEmail = email.toLowerCase().trim()

      // Check format email is valid
      if (!validator.isEmail(formatEmail))
        throw new Error('El formato del correo no es correcto')

      const userExist = await User.findOne({ email: formatEmail })

      if (!userExist) throw new Error('El correo no se encuentra registrado')

      const passwordCompare = await bcrypt.compare(password, userExist.password)

      if (!passwordCompare)
        throw new Error('El correo y contraseña no coinciden')

      // Create jasonwebtoken
      const payload = {
        id: userExist.id,
        username: userExist.username,
        name: userExist.name,
        avatar: userExist.avatar || '',
      }
      const token = jwt.sign(payload, process.env.SECRET_WORD)

      return { token }
    } catch (err) {
      console.log(err)
      return err
    }
  },

  /**********************************************************
   *  Get User
   **********************************************************/
  getUser: async (username, id) => {
    try {
      let userExist

      if (id) {
        userExist = await User.findById(id)
      } else {
        userExist = await User.findOne({ username })
      }

      if (!userExist) throw new Error('Usuario no encontrado')

      return userExist
    } catch (err) {
      console.log(err)
      return err
    }
  },

  /**********************************************************
   *  Upload avatar User
   **********************************************************/
  avatarUpload: async (file, user) => {
    try {
      const res = await cloudinaryUploadImg(file, 'avatar', user.id)

      await User.findByIdAndUpdate(
        user.id,
        { avatar: res.secure_url },
        { new: true }
      )

      return {
        ok: true,
        urlAvatar: res.secure_url,
      }
    } catch (err) {
      return {
        ok: false,
        urlAvatar: 'Error al cargar el avatar',
      }
    }
  },

  /**********************************************************
   *  Delete avatar User
   **********************************************************/
  avatarDelete: async (user) => {
    try {
      const dataUser = await User.findById(user.id)
      if (!dataUser) return false

      await User.findByIdAndUpdate(user.id, { avatar: '' }, { new: true })
      return true
    } catch (err) {
      return false
    }
  },

  /**********************************************************
   *  Update User
   **********************************************************/
  updateUser: async (input, user) => {
    // Search if user exist
    const { id } = user
    const userExist = await User.findById(id)

    if (!userExist) return new Error('Usuario no encontrado')

    // Switch with hash table
    const { valueToChange, newValue } = input
    const keyCompare = {
      username: changeUsername,
      email: changeEmail,
      name: changeName,
      description: changeDescription,
      website: changeWebsite,
    }
    const userChanged = await keyCompare[valueToChange]()
    return userChanged

    async function changeUsername() {
      const formatUsername = newValue.toLowerCase().trim()
      try {
        const usernameExist = await User.findOne({ username: formatUsername })
        if (usernameExist) throw new Error('El username ya se encuentra en uso')

        const userChanged = await User.findByIdAndUpdate(
          id,
          { username: formatUsername },
          { new: true }
        )
        return userChanged
      } catch (err) {
        return err
      }
    }

    async function changeEmail() {
      const formatEmail = newValue.toLowerCase().trim()
      try {
        const emailExist = await User.findOne({ email: formatEmail })
        if (emailExist) throw new Error('El email ya se encuentra en uso')

        const userChanged = await User.findByIdAndUpdate(
          id,
          { email: formatEmail },
          { new: true }
        )
        return userChanged
      } catch (err) {
        return err
      }
    }

    async function changeName() {
      try {
        const userChanged = await User.findByIdAndUpdate(
          id,
          { name: newValue.trim() },
          { new: true }
        )
        return userChanged
      } catch (err) {
        return err
      }
    }

    async function changeDescription() {
      try {
        const userChanged = await User.findByIdAndUpdate(
          id,
          { description: newValue },
          { new: true }
        )
        return userChanged
      } catch (err) {
        return err
      }
    }

    async function changeWebsite() {
      try {
        const userChanged = await User.findByIdAndUpdate(
          id,
          { website: newValue },
          { new: true }
        )
        return userChanged
      } catch (err) {
        return err
      }
    }
  },

  /**********************************************************
   *  Update password User
   **********************************************************/
  updatePassword: async (input, user) => {
    const { lastPassword, newPassword } = input

    try {
      // Search if user exist
      const { id } = user
      const userExist = await User.findById(id)

      if (!userExist) throw new Error('Usuario no encontrado')

      // Check if last password is correct
      const lastPasswordIsCorrect = await bcrypt.compare(
        lastPassword,
        userExist.password
      )

      if (!lastPasswordIsCorrect)
        throw new Error(
          'La contraseña actual debe ser correcta para poder actualizar'
        )

      if (newPassword.length < 6)
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres')

      const newPasswordHash = await bcrypt.hash(newPassword, 10)

      await User.findByIdAndUpdate(
        id,
        { password: newPasswordHash },
        { new: true }
      )

      return true
    } catch (err) {
      return err
    }
  },

  /**********************************************************
   *  Search Users
   **********************************************************/
  search: async (search) => {
    try {
      const users = await User.find({
        name: { $regex: search, $options: 'i' },
      })
      return users
    } catch (err) {
      return err
    }
  },
}

module.exports = userController
