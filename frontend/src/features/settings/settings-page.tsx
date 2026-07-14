import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PageHeader } from "@/components/page-header"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser } from "@/mock"
import { toast } from "sonner"

const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  title: z.string().min(2, "Title is required"),
  bio: z.string().max(280, "Keep it under 280 characters").optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your profile, workspace and security preferences." />

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="max-w-xl">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="workspace" className="max-w-xl space-y-5">
          <div className="glass-card space-y-4 rounded-xl p-6">
            <div>
              <Label className="mb-1.5 text-text-primary">Workspace name</Label>
              <Input defaultValue="TuesdayBlue HQ" className="border-border-subtle bg-background" />
            </div>
            <div>
              <Label className="mb-1.5 text-text-primary">Default timezone</Label>
              <Input defaultValue="GMT-3 · São Paulo" className="border-border-subtle bg-background" />
            </div>
            <SettingRow label="Allow guest access" description="Let external collaborators view shared boards." />
            <SettingRow label="Require SSO" description="Enforce single sign-on for all members." defaultChecked />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="max-w-xl">
          <div className="glass-card space-y-1 rounded-xl p-6">
            <SettingRow label="Email notifications" description="Task assignments, mentions and approvals." defaultChecked />
            <Separator className="my-3 bg-border-subtle" />
            <SettingRow label="Push notifications" description="Real-time alerts on desktop and mobile." defaultChecked />
            <Separator className="my-3 bg-border-subtle" />
            <SettingRow label="Weekly digest" description="Summary of workspace activity every Monday." />
            <Separator className="my-3 bg-border-subtle" />
            <SettingRow label="SLA breach alerts" description="Immediate alert when a task nears SLA breach." defaultChecked />
          </div>
        </TabsContent>

        <TabsContent value="security" className="max-w-xl space-y-5">
          <div className="glass-card space-y-4 rounded-xl p-6">
            <SettingRow label="Two-factor authentication" description="Require a hardware key or authenticator app." defaultChecked />
            <Separator className="my-3 bg-border-subtle" />
            <SettingRow label="Session timeout" description="Automatically log out after 12 hours of inactivity." defaultChecked />
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Active sessions</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary">Chrome · macOS</p>
                  <p className="text-xs text-text-secondary">São Paulo, BR · Active now</p>
                </div>
                <span className="text-xs text-success">This device</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary">Safari · iOS</p>
                  <p className="text-xs text-text-secondary">São Paulo, BR · 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      title: currentUser.title,
      bio: "",
    },
  })

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success("Profile updated")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 rounded-xl p-6">
      <div className="flex items-center gap-4">
        <UserAvatar user={currentUser} size="lg" />
        <Button type="button" variant="outline" className="border-border-subtle">
          Change avatar
        </Button>
      </div>

      <div>
        <Label htmlFor="name" className="mb-1.5 text-text-primary">
          Full name
        </Label>
        <Input id="name" {...register("name")} className="border-border-subtle bg-background" />
        {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="mb-1.5 text-text-primary">
          Email
        </Label>
        <Input id="email" {...register("email")} className="border-border-subtle bg-background" />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="title" className="mb-1.5 text-text-primary">
          Title
        </Label>
        <Input id="title" {...register("title")} className="border-border-subtle bg-background" />
        {errors.title && <p className="mt-1 text-xs text-danger">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="bio" className="mb-1.5 text-text-primary">
          Bio
        </Label>
        <Textarea
          id="bio"
          {...register("bio")}
          placeholder="Tell your team about yourself"
          className="min-h-24 border-border-subtle bg-background"
        />
        {errors.bio && <p className="mt-1 text-xs text-danger">{errors.bio.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="glow-button">
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}

function SettingRow({
  label,
  description,
  defaultChecked,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}
