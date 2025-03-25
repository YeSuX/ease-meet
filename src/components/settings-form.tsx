"use client";

import { type User } from "@/server/db/schema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "昵称必须至少2个字符。",
  }),
  email: z.string().email({
    message: "邮箱地址无效。",
  }),
  pronouns: z.string().min(2, {
    message: "称谓代词必须至少2个字符。",
  }),
});

const SettingsForm = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: user.nickname!,
      email: user.email,
      pronouns: user.pronouns!,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="">
      <div className="absolute top-0 h-52 w-full">
        <Image
          unoptimized
          alt="profile background"
          src="https://images.unsplash.com/photo-1560379790-d7f9dd2b6116"
          objectFit="cover"
          fill
          className="rounded-xl object-cover opacity-80 blur-sm"
          priority
        />
      </div>
      <div className="mt-40 px-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="size-28 cursor-pointer">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>点击更换头像</TooltipContent>
        </Tooltip>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-sm text-muted-foreground">
              {user.name} · {user.pronouns}
            </p>
          </div>
          <div>
            <Button variant="outline">
              <Share2 className="mr-2 size-4" />
              分享名片
            </Button>
          </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
            <CardDescription>
              编辑你的个人资料，包括头像、昵称、邮箱等。
            </CardDescription>
            <CardContent>
              <Form {...form}>
                <form action="">
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => {
                      return (
                        <FormItem className="mb-4">
                          <FormLabel>昵称</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            这是大家认识你的第一印象，选一个独特的昵称吧！
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          让朋友们能够方便地联系到你，保持联络很重要呢
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pronouns"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>称谓代词</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择一个称谓代词" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dont_specify">不指定</SelectItem>
                            <SelectItem value="they/them">they/them</SelectItem>
                            <SelectItem value="she/her">she/her</SelectItem>
                            <SelectItem value="he/him">he/him</SelectItem>
                            <SelectItem value="custom">自定义</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          帮助他人以你喜欢的方式称呼你，让交流更加贴心
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button>保存</Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
export default SettingsForm;
