import bcrypt from 'bcryptjs';

export async function registerUser(passwordText) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(passwordText, saltRounds);
    return passwordHash;
};