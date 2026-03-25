"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { SuccessModal } from "@/components/success-model";
import { registerUser, loginWithGoogle } from "@/components/api/authApi";
import { checkUsernameAvailability } from "@/components/api/usernameApi";
import { toast } from "sonner";
import debounce from "lodash/debounce";

const FieldDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-muted-foreground mt-1">{children}</p>
);

// Define schema with Zod
const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
});

export default function RegisterForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<{
    isChecking: boolean;
    available: boolean | null;
    message: string;
  }>({
    isChecking: false,
    available: null,
    message: "",
  });

  // Debounced function to check username availability
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      // don't check until it 
      if (username.length < 3) {
        setUsernameStatus({ isChecking: false, available: null, message: "" });
        return;
      }

      setUsernameStatus((prev) => ({ ...prev, isChecking: true }));
      try {
        const data = await checkUsernameAvailability(username);
        setUsernameStatus({
          isChecking: false,
          available: data.available,
          message: data.message,
        });
      } catch (error) {
        setUsernameStatus({
          isChecking: false,
          available: null,
          message: "Error checking username",
        });
      }
    }, 500),
    [],
  );

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (usernameStatus.available === false) {
        toast.error("Please choose an available username.");
        return;
      }
      setIsLoading(true);
      try {
        await registerUser(value.username, value.email);
        setShowSuccess(true);
        toast.success("Registration successful! Please check your email.");
      } catch (error: any) {
        toast.error(error.message || "Failed to register. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto grid w-100 gap-6 p-6 border-2 border-border rounded-2xl">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">WSP</h1>
          <p className="text-balance text-muted-foreground text-sm">
            Welfare Schemes Platform - Your one-stop solution for all welfare
            schemes.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="username"
            validators={{
              onChange: formSchema.shape.username,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Your username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    checkUsername(e.target.value);
                  }}
                  className="border-border bg-card text-foreground"
                />
                {usernameStatus.isChecking && (
                  <p className="text-xs text-muted-foreground animate-pulse">
                    Checking availability...
                  </p>
                )}
                {!usernameStatus.isChecking &&
                  usernameStatus.available !== null && (
                    <p
                      className={`text-xs font-medium ${
                        usernameStatus.available
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameStatus.message}
                    </p>
                  )}
                {field.state.meta.errors &&
                  field.state.meta.errors.length > 0 &&
                  field.state.value && (
                    <p className="text-xs text-destructive">
                      {(field.state.meta.errors[0] as any)?.message ||
                        field.state.meta.errors[0]}
                    </p>
                  )}
                <FieldDescription>
                  Username must contain at least 3 characters.
                </FieldDescription>
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onSubmit: formSchema.shape.email,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="name@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-border bg-card text-foreground"
                />
                {field.state.meta.errors &&
                  field.state.meta.errors.length > 0 &&
                  field.state.value && (
                    <p className="text-xs text-destructive">
                      {(field.state.meta.errors[0] as any)?.message ||
                        field.state.meta.errors[0]}
                    </p>
                  )}
                <FieldDescription>
                  We'll send a verification link to this email address.
                </FieldDescription>
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? "Processing..." : "Continue"}
          </Button>
        </form>

        <Separator className="bg-border" />
        <Button
          variant="outline"
          onClick={loginWithGoogle}
          className="w-full border-border text-foreground hover:bg-muted"
        >
          Continue with Google
        </Button>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Registration Successful"
        description="Your account has been created. Please verify your email to continue."
        buttonLabel="Verify Email"
        redirectPath={`/verify?email=${encodeURIComponent(form.state.values.email)}`}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
