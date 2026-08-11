import type { Metadata } from "next";
import Link from "next/link";
import { LegalList } from "@/components/legal/LegalList";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import { legalConfig, legalMailto } from "@/config/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${legalConfig.brandName}.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy | ${legalConfig.brandName}`,
    description: `Privacy Policy for ${legalConfig.brandName}.`,
    url: "/privacy",
    siteName: legalConfig.brandName,
    type: "website",
  },
};

export default function PrivacyPage() {
  const brand = legalConfig.brandName;

  return (
    <LegalPageLayout
      title="Privacy Policy"
      dateLabel="Effective date:"
      dateValue={legalConfig.privacyEffectiveAt}
    >
      <LegalSection title="Overview" level={2}>
        <p>
          Welcome to {brand}! We understand how important privacy is to you and
          are committed to protecting your personal information. {brand} is a
          platform that provides unified API access and token management for
          multiple large models (such as OpenAI, Claude, Gemini, and other
          third-party providers). When we provide high-concurrency and stable
          model calling services, we will collect and process some necessary
          data. This Policy explains how we collect, use, store and share your
          information.
        </p>
      </LegalSection>

      <LegalSection title="1. Information we collect">
        <p>
          In order to provide you with standard API calls and billing services,
          we may collect the following types of information:
        </p>

        <p>
          <strong className="font-semibold">
            1. Account registration and identity information
          </strong>
        </p>
        <p>
          When you register for {brand}, we will collect your email address and
          the password you set. If you choose to log in through a third-party
          authorization provider, we may collect and record the authorization
          identification (such as an OpenID or username) provided by that
          third-party platform in order to create and bind a {brand} account for
          you.
        </p>

        <p>
          <strong className="font-semibold">
            2. Billing and Payment Information
          </strong>
        </p>
        <p>
          We may support recharge and quota purchases through third-party payment
          processors. When you pay, specific payment credentials and bill details
          are typically collected and processed by the payment processor. We
          generally record recharge amounts, redemption or credit usage records,
          account quota balances and billing activity in our systems.
        </p>

        <p>
          <strong className="font-semibold">
            3. API calls and log data (core)
          </strong>
        </p>
        <p>
          <strong className="font-semibold">Request metadata:</strong> In order
          to achieve accurate token billing, rate limiting (such as single IP or
          user-level request frequency limits) and risk control, we may record
          your IP address, called model name, request time, consumed prompt
          (input) Token count and completion (output) Token count and related
          call logs.
        </p>
        <p>
          <strong className="font-semibold">Content cache data:</strong> In order
          to improve response speed and help reduce cost where supported,{" "}
          {brand} may enable cache mechanisms for certain models. Under this
          mechanism, the system may temporarily cache the Prompt you send and the
          generated response content for a short period of time.
        </p>

        <p>
          <strong className="font-semibold">
            4. System monitoring and diagnostic data
          </strong>
        </p>
        <p>
          We may collect service running status data (such as error logs, request
          success rate, etc.) to determine the health of upstream channels and
          support automatic retry and load balancing.
        </p>
      </LegalSection>

      <LegalSection title="2. How we use your information">
        <p>The data we collect is mainly used for the following purposes:</p>
        <LegalList
          ordered
          items={[
            "Service provision and billing accounting: Based on the number of Tokens you consume combined with the system's model rates and group rates, we provide accurate fee calculation and related account adjustments.",
            "Traffic peak shaving and security risk control: By recording request frequency, the gateway layer can apply rate limiting and protection to help prevent API abuse or malicious concurrent requests.",
            "Service optimization and distribution: Based on your request characteristics, we may route and distribute your requests to appropriate downstream channels that support formats such as OpenAI, Claude or Gemini.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Information sharing and third-party processing">
        <p>
          Since {brand} is essentially a large model request gateway and asset
          management system, your input data will inevitably flow to third
          parties as described below:
        </p>
        <LegalList
          ordered
          items={[
            <>
              <strong className="font-semibold">
                Upstream large model provider:
              </strong>{" "}
              In order to generate the text, images or videos you need, your API
              request content (including prompts, pictures, audio and video
              files, etc.) will be transmitted or converted into formats and sent
              to third-party upstream model vendors (such as OpenAI, Anthropic,
              Google, and other providers). Those vendors are not owned by{" "}
              {brand}. The processing of your data by these vendors will be
              governed by their respective Terms of Use and Privacy Policies.
            </>,
            <>
              <strong className="font-semibold">Legal compliance:</strong> Where
              required by applicable laws and regulations, in limited cases (such
              as investigations involving unlawful activity), we may need to
              disclose relevant logs to competent authorities.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Your rights and obligations">
        <LegalList
          ordered
          items={[
            <>
              <strong className="font-semibold">Legal use compliance:</strong> As
              an API caller, you must abide by the Terms of Use of the upstream
              model manufacturer and applicable local laws and regulations. You
              shall not use the interface provided by {brand} for any unlawful
              purposes.
            </>,
            <>
              <strong className="font-semibold">Token security:</strong> The
              exclusive API Key (access token) you generate in {brand} has
              operation and deduction permissions. Please keep your API Key safe
              and configure available controls such as token limits, IP
              allowlists, and allowed model ranges where offered. You shall be
              solely responsible for any losses caused by disclosing your keys.
            </>,
            <>
              <strong className="font-semibold">
                Account cancellation and data deletion:
              </strong>{" "}
              You have the right to request account cancellation or deletion of
              call logs by contacting us via email (
              <a
                href={legalMailto.privacy}
                className="font-medium text-[var(--brand-accent)] underline underline-offset-2 hover:opacity-90"
              >
                {legalConfig.privacyEmail}
              </a>
              ) at any time. After your account is closed, we will anonymize or
              delete your personal information as reasonably practicable and as
              required by applicable law.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Updates to the Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time to adapt to
          business and system changes (such as access to new models or payment
          channels). If major updates occur, we will notify you through website
          announcements or emails.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact us">
        <p>
          If you have any questions about this Privacy Policy or {brand}&apos;s
          data processing practices, or need help with account issues, please
          contact us through the following methods:
        </p>
        <p>
          <strong className="font-semibold">Service email:</strong>{" "}
          <a
            href={legalMailto.privacy}
            className="font-medium text-[var(--brand-accent)] underline underline-offset-2 hover:opacity-90"
          >
            {legalConfig.privacyEmail}
          </a>
        </p>
        {legalConfig.registeredAddress ? (
          <p className="text-[#667085]">
            {legalConfig.legalEntityName}
            {legalConfig.legalEntityName ? " · " : ""}
            {legalConfig.registeredAddress}
          </p>
        ) : null}
        <p>
          You may also review our{" "}
          <Link
            href="/terms"
            className="font-medium text-[var(--brand-accent)] underline underline-offset-2 hover:opacity-90"
          >
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
