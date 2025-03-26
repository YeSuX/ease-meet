import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { getSession } from "@/lib/session";
import TimeManageForm from "@/components/time-manage-form";
const TimeManagementPage = async () => {
  const session = await getSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>日程安排</CardTitle>
        <CardDescription>设置可预约时段，轻松掌控会面安排</CardDescription>
      </CardHeader>
      <TimeManageForm />
    </Card>
  );
};
export default TimeManagementPage;
