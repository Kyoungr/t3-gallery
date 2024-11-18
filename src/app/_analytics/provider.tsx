// app/providers.js
"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  // Only render PostHog on client side
  if (typeof window === "undefined") return children;

  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    if (user && isSignedIn) {
      posthog.identify(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      });
    } else {
      posthog.reset();
    }
  }, [user, isSignedIn]);

  // Capture pageview after auth state is known
  useEffect(() => {
    if (typeof window === "undefined") return;
    posthog.capture("$pageview");
  }, []);

  return children;
}
