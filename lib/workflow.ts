import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QstashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken!,
});

const qStashClient = new QstashClient({
  token: config.env.upstash.qstashToken!,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qStashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken! }),
    },
    body: {
      from: "Gabby <dev.gnox@gmail.com>",
      to: [email],
      subject,
      html: `<p>${message}</p>`,
    },
  });
};
