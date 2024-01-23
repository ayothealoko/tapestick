import bcrypt from "bcrypt";
import { getUserByEmailService } from "../service/auth/getUser.js";

export async function verifyLocal(
  username: string,
  password: string,
  cb: (...args: any[]) => any
) {
  //not username actually email

  try {
    const user = await getUserByEmailService({ user_email: username });
    const compare = await bcrypt.compare(password, user[0].password_hash);
    if (compare) {
      return cb(null, user);
    }

    return cb(null, false);
  } catch (err) {
    return cb(err);
  }
}
