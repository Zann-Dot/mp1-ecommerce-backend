import bcrypt from "bcryptjs";

export async function loginUser(incomingPassword, storedHash) {
    const isMatch = await bcrypt.compare(incomingPassword, storedHash);

    if (isMatch)
        return {
            success: true,
            message: 'Access granted'
        }
    else
        return {
            success: false,
            message: 'Invalid password'
        }
}