'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const ACCESS_CODE = '29832db3db38bd8f48bf8fb48fb48fb4';

export default function CodeEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ensure scrolling works
  useEffect(() => {
    document.documentElement.classList.remove('loading');
    document.documentElement.classList.add('loaded');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, []);

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('finance_tracker_authenticated');
    if (isAuthenticated === 'true') {
      router.push('/AIisthebest@143/tracker');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (code.trim() === ACCESS_CODE) {
        // Store authentication in session storage
        sessionStorage.setItem('finance_tracker_authenticated', 'true');
        toast.success('Access granted!');
        router.push('/AIisthebest@143/tracker');
      } else {
        setError('Invalid access code. Please try again.');
        setIsLoading(false);
        toast.error('Invalid code');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F9FAFB] to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-2 border-gray-200">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-gold to-blue flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-[#111827]">
                Finance Tracker Access
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your access code to continue
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code" className="text-sm font-medium text-[#111827]">
                  Access Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter access code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                  }}
                  className={`mt-2 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={isLoading}
                  autoFocus
                />
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center space-x-2 text-sm text-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !code.trim()}
                className="w-full bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Access Tracker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-[#6B7280]">
                This is a protected area. Please enter the correct access code to view your finance tracker.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
