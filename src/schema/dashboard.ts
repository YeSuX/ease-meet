import { z } from "zod";

export const settingsFormSchema = z.object({
    nickname: z.string().min(2, {
        message: "昵称必须至少2个字符。",
    }),
    email: z.string().email({
        message: "邮箱地址无效。",
    }),
    pronouns: z.enum([
        "dont_specify",
        "they/them",
        "she/her",
        "he/him",
        "custom",
    ]),
});