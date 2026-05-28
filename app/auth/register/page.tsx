import AuthCard from '@/components/auth/auth-card';
import RegisterForm from '@/components/auth/register-form';

export const metadata = {
  title: 'Create Account | PathForge',
  description: 'Sign up for a new PathForge account',
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Get Started"
      description="Create your account to begin your career transformation"
    >
      <RegisterForm />
    </AuthCard>
  );
}
