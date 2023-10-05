import { User } from '@prisma/client';

export const secureUserObject = (user: User, ...fields) => {
  for (const field of fields) {
    delete user[field];
  }
  return user;
};
