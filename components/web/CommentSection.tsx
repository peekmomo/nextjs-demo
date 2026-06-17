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
import z from "zod";
import { useTransition } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { da } from "zod/locales";

interface CommentSectionProps {
  postId: Id<"posts">;
}

export function CommentSection({ postId }: CommentSectionProps){
    const params=useParams<{postId:Id<"posts">}>()
     const [isPending, startTransition] = useTransition();
    const form = useForm({
                resolver: zodResolver(CommentSchema),
                defaultValues: {
                   content:'',
                   postId:params.postId,
                }
            });
    const createComments=useMutation(api.comments.createComment)
    const comments = useQuery(api.comments.getComments, { postId });
    function onSubmit(data:z.infer<typeof CommentSchema>){
      startTransition(async ()=>{
        try{
           await createComments({
            postId:params.postId,
            content:data.content
           })
           form.reset()
           toast.success('success')
        }catch(error){
           toast.error('error')
        }
      })
    }
    return (
      <Card>
         <CardHeader className="flex flex-row items-center gap-2">
            <MessageSquare className="size-5">
                <h2 className="text-xl font-bold">5 Comments</h2>
            </MessageSquare>
         </CardHeader>
         <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} >
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
                {comments === undefined ? (
  <p>Loading...</p>
) : comments.length === 0 ? (
  <p>No comments yet</p>
) : (
  comments.map((comment) => (
    <div key={comment._id}>
      <p>{comment.authName}</p>
      <p>{comment.content}</p>
    </div>
  ))
)}
            </CardContent>
      </Card>
    )
}