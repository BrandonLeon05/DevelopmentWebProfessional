import bycript from "bcryptjs"
class Utils {
    public async hashPassword(password: string): Promise<string> {
        const salt = await bycript.genSaltSync(10);
        return await bycript.hashSync(password, salt);
    }
}

export const utils = new Utils();