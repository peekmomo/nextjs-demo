"use client"

import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/app/schemas/CommentSection";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";


export function CommentSection(){
    const params=useParams<{postId:Id<"posts">}>()
    const form = useForm({
                resolver: zodResolver(CommentSchema),
                defaultValues: {
                   content:'',
                   postId:params.postId,
                    
                }
            });
    return (
      <Card>
         <CardHeader className="flex flex-row items-center gap-2">
            <MessageSquare className="size-5">
                <h2 className="text-xl font-bold">5 Comments</h2>
            </MessageSquare>
         </CardHeader>
         <CardContent>
                <form >
                    <FieldGroup>
                        <Controller
                            name="content"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea placeholder="Type your message here." {...field} />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />
                        <Button>Submit</Button>
                    </FieldGroup>
                </form>
            </CardContent>
      </Card>
    )
}