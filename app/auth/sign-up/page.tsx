"use client";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { SignUpSchema } from "../../schemas/auth";
import { Form } from "radix-ui";
import { FieldGroup, Field ,FieldLabel,FieldError} from "@/components/ui/field";


export default function SignUp() {
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })
    return (

        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                    Create an account to get started.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field ,fieldState}) => (
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
                            render={({ field ,fieldState}) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <input type="password" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field ,fieldState}) => (
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <input type="text" {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <button type="submit">Sign Up</button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>

    )
}