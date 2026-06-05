"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {BlogSchema} from "../schemas/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {z} from "zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
    const form = useForm({
            resolver: zodResolver(BlogSchema),
            defaultValues: {
                title: "",
                content: "",
            }
        });
        function onSubmit(data: z.infer<typeof BlogSchema>) {
           
        }
    return (
        <div className="max-w-2xl ml-100 py-10 items-center">
            <h1 className="text-2xl font-bold mb-4 ">Create a new blog post</h1>
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
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <input type="text" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <Controller
                            name="content"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea placeholder="Type your message here." />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <button type="submit">
                            submit
                        </button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
        </div>
    );
}