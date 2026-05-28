import AuthCard from '@/components/auth/auth-card';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';

export const metadata = {
  title: 'Reset Password | PathForge',
  description: 'Reset your PathForge account password',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Your Password"
      description="We&apos;ll help you get back into your account"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
