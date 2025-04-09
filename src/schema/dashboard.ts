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

const dailyScheduleSchema = z.object({
    fromTime: z.string().min(1, { message: "请设置开始时间" }),
    toTime: z.string().min(1, { message: "请设置结束时间" }),
    isActive: z.boolean().default(false),
}).refine((data) => {
    if (!data.isActive) return true; // 如果未激活，不检查时间

    // 将时间字符串转换为分钟数进行比较
    const fromTime = convertTimeToMinutes(data.fromTime);
    const toTime = convertTimeToMinutes(data.toTime);
    

    return fromTime <= toTime;
}, {
    message: "开始时间必须早于结束时间",
    path: ["fromTime"],
});

// 添加辅助函数：将时间字符串转换为分钟数
function convertTimeToMinutes(time: string): number {
    const parts = time.split(':').map(Number);
    const hours = parts[0] ?? 0;
    const minutes = parts[1] ?? 0;
    return hours * 60 + minutes;
}

// 定义整周的时间安排 schema
export const timeManagementFormSchema = z.object({
    weeklySchedule: z.array(
        dailyScheduleSchema
    ).length(7, "必须包含一周七天的安排"),
}).transform((data) => ({
    ...data,
    // 添加星期几的标识，方便前端使用
    weeklySchedule: data.weeklySchedule.map((schedule, index) => ({
        ...schedule,
        day: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][index],
        id: index.toString(),
    }))
}));

// TypeScript 类型定义
export type DailySchedule = z.infer<typeof dailyScheduleSchema>;
export type WeeklySchedule = z.infer<typeof timeManagementFormSchema>;