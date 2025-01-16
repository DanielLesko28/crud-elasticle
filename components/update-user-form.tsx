"use client";

import { useToast } from "@/hooks/use-toast";
import { updateUserSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.actions";
import ShadcnDatePicker from "./ui/shadcn-date-picker";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      const response = await updateUser({
        ...values,
        id: user.id,
      });

      if (!response.success) {
        return toast({
          variant: "destructive",
          description: response.message,
        });
      }

      toast({
        description: response.message,
      });

      form.reset();

      router.push("/");
    } catch (e) {
      toast({
        variant: "destructive",
        description: (e as Error).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "email"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder="Enter user email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Name */}
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Surname */}
        <div>
          <FormField
            control={form.control}
            name="surname"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                "surname"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Date of Birth */}
        <div>
          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <ShadcnDatePicker
                    selected={new Date(field.value)}
                    onSelect={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    startYear={1930}
                    endYear={2025}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit Button */}
        <div className="flex-between mt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
