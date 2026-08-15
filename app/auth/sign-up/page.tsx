"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SignUpSchema } from "../../schemas/auth";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });
    const isSubmitting = form.formState.isSubmitting;
    
    async function onSubmit(data: z.infer<typeof SignUpSchema>) {
        await authClient.signUp.email(
            {
                email: data.email,
                password: data.password,
                name: data.name
            }
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-10">
            <div className="w-full max-w-md">
                <Card className="border-border/80 shadow-sm">
                    <CardHeader className="space-y-2 px-6 pt-6 text-center">
                        <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <UserPlus className="size-5" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-2xl">Create account</CardTitle>
                        <CardDescription>
                            Sign up to start writing and sharing your posts.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="gap-4">
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Name</FieldLabel>
                                            <Input
                                                type="text"
                                                autoComplete="name"
                                                placeholder="Your name"
                                                aria-invalid={fieldState.invalid}
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                        </Field>
                                    )}
                                />
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
                                                disabled={isSubmitting}
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
                                                    autoComplete="new-password"
                                                    placeholder="At least 6 characters"
                                                    aria-invalid={fieldState.invalid}
                                                    disabled={isSubmitting}
                                                    className="pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
                                                    onClick={() => setShowPassword((value) => !value)}
                                                    disabled={isSubmitting}
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
                                <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" aria-hidden="true" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus aria-hidden="true" />
                                            Sign up
                                        </>
                                    )}
                                </Button>
                            </FieldGroup>
                        </form>

                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/auth/login-in">
                                Login
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
