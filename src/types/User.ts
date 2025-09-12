export interface User {
  login: string
  avatar: string
  id: string
}

export interface UserDataForRegistration {
  login: string
  password: string
}
export interface UserDataForAuthorization {
  login: string
  password: string
}

export interface UserDataForUpdate {
  login?: string
  password?: string
  oldPassword: string
}