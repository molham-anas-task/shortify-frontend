import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RegisterFormData, registerSchema } from "@/schemas/registerSchema";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const { login, signup } = useAuth();
  const regForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });
  const logForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex h-full items-center justify-center ">
      <Tabs defaultValue="Login" className=" w-[320px] md:w-[450px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card className="h-[460px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Log in to access your account. Enter your UserName and Password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-full">
              <Form {...logForm}>
                <form
                  onSubmit={logForm.handleSubmit((data) => login.mutate(data))}
                  className="flex flex-col justify-between h-full "
                >
                  <div className="space-y-6">
                    <FormField
                      control={logForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={logForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-fit">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account to get started. Enter your personal details
                and a strong password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...regForm}>
                <form
                  onSubmit={regForm.handleSubmit((data) => signup.mutate(data))}
                  className="space-y-6"
                >
                  <FormField
                    control={regForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="e.g. Anas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={regForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={regForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={regForm.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 relative">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="agreeToTerms"
                          />
                        </FormControl>
                        <FormLabel htmlFor="agreeToTerms" className="text-xs ">
                          Accept terms and conditions{" "}
                        </FormLabel>
                        <FormMessage className="absolute bottom-[-18px] text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="p-0">
                    <Button type="submit">Register</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
