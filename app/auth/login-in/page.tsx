"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/auth";
import { z } from "zod";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Login() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof LoginSchema>>({
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
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-10">
            <div className="w-full max-w-md">
                <Card className="border-border/80 shadow-sm">
                    <CardHeader className="space-y-2 px-6 pt-6 text-center">
                        <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <LogIn className="size-5" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>
                            Log in to continue creating and managing your posts.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="gap-4">
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input
                                                type="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                aria-invalid={fieldState.invalid}
                                                disabled={isPending}
                                                {...field}
                                            />
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
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    aria-invalid={fieldState.invalid}
                                                    disabled={isPending}
                                                    className="pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowPassword((value) => !value)}
                                                    disabled={isPending}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff aria-hidden="true" />
                                                    ) : (
                                                        <Eye aria-hidden="true" />
                                                    )}
                                                </Button>
                                            </div>
                                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="mt-1 w-full" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="animate-spin" aria-hidden="true" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn aria-hidden="true" />
                                            Login
                                        </>
                                    )}
                                </Button>
                            </FieldGroup>
                        </form>

                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Do not have an account?{" "}
                            <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/auth/sign-up">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
