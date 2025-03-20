import User from './model';

export const findUser = async (account: string) => {
  return User.findOne({ account });
}