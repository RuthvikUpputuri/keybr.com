import { type Binder, type Module } from "@fastr/invert";
import { Logger } from "@keybr/logger";
import { MailgunMailer } from "./mailgun.ts";
import { NullMailer } from "./null.ts";
import { Mailer } from "./types.ts";

export class MailModule implements Module {
  configure({ bind }: Binder) {
    if (hasMailgunConfig()) {
      bind(Mailer).to(MailgunMailer);
    } else {
      Logger.info(
        "Mailgun configuration is missing; using no-op mail delivery.",
      );
      bind(Mailer).to(NullMailer);
    }
  }
}

function hasMailgunConfig(): boolean {
  return Boolean(process.env.MAIL_DOMAIN) && Boolean(process.env.MAIL_KEY);
}
