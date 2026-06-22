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

interface ForgotPasswordEmailProps {
  userName?: string;
  resetUrl: string;
}

export default function ForgotPasswordEmail({
  userName,
  resetUrl,
}: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>

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
              marginBottom: "20px",
            }}
          >
            Reset Your Password
          </Heading>

          <Text>
            Hi {userName || "there"},
          </Text>

          <Text>
            We received a request to reset the password for your Job
            Application Tracker account.
          </Text>

          <Text>
            Click the button below to create a new password:
          </Text>

          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Reset Password
            </Button>
          </Section>


          <Text>
            If you did not request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </Text>

          <Text
            style={{
              color: "#666666",
              fontSize: "12px",
              marginTop: "32px",
            }}
          >
            Job Application Tracker
          </Text>
        </Container>
      </Body>
    </Html>
  );
}