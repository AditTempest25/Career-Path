import AuthCard from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In | PathForge',
  description: 'Sign in to your PathForge account',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue your career journey"
    >
      <LoginForm />
    </AuthCard>
  );
}
