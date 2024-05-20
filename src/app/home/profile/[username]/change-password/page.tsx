import ChangePasswordForm from "@/components/ChangePasswordForm";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="flex my-5">
      <Card className="m-auto min-w-[50%]">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
