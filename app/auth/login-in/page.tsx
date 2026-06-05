"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { LoginSchema } from "../../schemas/auth";
import { Form } from "radix-ui";
import { z } from "zod";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { useTransition } from "react";

export default function Login() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        startTransition(async () => {
            await authClient.signIn.email(
                {
                    email: data.email,
                    password: data.password
                },
                {
                    onSuccess: () => {
                        toast.success("Logged in successfully!");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error("Failed to log in: " + error.error.message);
                    }
                }
            )
        });
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle>Login In</CardTitle>
                <CardDescription>
                    Login in to your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <input type="email" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <input type="password" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <button type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>

    )
}