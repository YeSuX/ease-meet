"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const SettingsPage = () => {
  const { data: session } = useSession();
  const form = useForm();
  console.log(session);

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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>点击更换头像</TooltipContent>
        </Tooltip>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Suxiong · he/him
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
                    name="name"
                    render={({ field }) => (
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
                    )}
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
                        <Select>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择一个称谓代词" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              不指定
                            </SelectItem>
                            <SelectItem value="m@example2.com">
                              they/them
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              she/her
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              he/him
                            </SelectItem>
                            <SelectItem value="m@support3.com">
                              自定义
                            </SelectItem>
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
export default SettingsPage;
