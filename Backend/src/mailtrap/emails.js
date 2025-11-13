import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailtemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Verification Emails",
    });
  } catch (error) {
    console.log("Error in sendVerificationEmail function: ", error);
    throw new Error(error);
  }
};

export const sendResetPasswordEmail = async (email, resetPasswordURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetPasswordURL
      ),
      category: "Password reset",
    });

    console.log("Reset password email sent: ", response);
  } catch (error) {
    console.log("error in sendPasswordResetEmail function: ", error);
    throw new Error(error);
  }
};

export const sendResetSuccessfulEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
  } catch (error) {
    console.log("Error in sendResetSuccessfulEmail: ", error);
    throw new Error(error);
  }
};
