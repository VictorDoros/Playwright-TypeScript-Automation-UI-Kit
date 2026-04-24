function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is missing`)
  return value
}

export const ENV = {
  user: {
    firstName: required('USER_FIRST_NAME'),
    email: required('USER_EMAIL'),
    password: required('USER_PASSWORD'),
  },
}
