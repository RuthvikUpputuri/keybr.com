import { injectable } from "@fastr/invert";
import { Logger } from "@keybr/logger";
import { Mailer } from "./types.ts";

@injectable()
export class NullMailer extends Mailer {
  async sendMail(message: Mailer.Message): Promise<void> {
    Logger.warn(
      "Email delivery skipped (mail service not configured for '%s', subject '%s')",
      message.to,
      message.subject,
    );
  }
}
