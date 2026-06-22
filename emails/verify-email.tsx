import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  userName?: string;
  verificationUrl: string;
}

export default function VerifyEmail({
  userName,
  verificationUrl,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>

      <Body
        style={{
          backgroundColor: "#f6f9fc",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "40px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Heading
            style={{
              fontSize: "24px",
              marginBottom: "24px",
            }}
          >
            Welcome to Job Application Tracker
          </Heading>

          <Text>
            Hi {userName || "there"},
          </Text>

          <Text>
            Thanks for creating an account.
          </Text>

          <Text>
            To help keep your account secure and ensure you can receive important
            emails such as password reset requests, please verify your email
            address.
          </Text>

          <Section
            style={{
              textAlign: "center",
              marginTop: "32px",
              marginBottom: "32px",
            }}
          >
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Verify Email
            </Button>
          </Section>

          <Text>
            If you didn't create this account, you can safely ignore this email.
          </Text>

          <Text
            style={{
              color: "#666666",
              fontSize: "12px",
              marginTop: "32px",
            }}
          >
            Happy job hunting!
          </Text>

          <Text
            style={{
              color: "#666666",
              fontSize: "12px",
            }}
          >
            — Job Application Tracker
          </Text>
        </Container>
      </Body>
    </Html>
  );
}