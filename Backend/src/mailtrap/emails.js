import { mailtrapClient, sender } from "./mailtrap.config";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  mailtrapClient.sendEmail({
    from: sender,
    to: recipient,
    subject: "Verify your email address",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationCode
    ),
    category: "Verification Emails",
  });
};
