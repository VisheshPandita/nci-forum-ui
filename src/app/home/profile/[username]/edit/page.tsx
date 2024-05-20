import { fetchProfile } from "../page";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import ProfileEditForm from "@/components/ProfileEditForm";

export default async function Page({
  params,
}: {
  readonly params: { username: string };
}) {
  const profile = await fetchProfile(params.username);
  return (
    <div className="flex my-5">
      <Card className="m-auto min-w-[50%]">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Edit Profile details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileEditForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
