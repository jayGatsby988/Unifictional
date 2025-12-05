'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { 
  Plus, Trash2, Edit2, Calendar, DollarSign, Tag, RefreshCw, TrendingUp, 
  TrendingDown, Search, Filter, Download, ArrowUpDown, Bell, BarChart3 
} from 'lucide-react';
import { format, addMonths, addYears, isBefore, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';
import { toast } from 'sonner';

interface FinanceItem {
  id: string;
  purchase: string;
  cost: number;
  description: string;
  frequency: 'one-time' | 'monthly' | 'yearly';
  type: 'expense' | 'income';
  created_at: string;
  next_renewal_date?: string;
  is_active: boolean;
}

type SortOption = 'date-desc' | 'date-asc' | 'cost-desc' | 'cost-asc' | 'name-asc' | 'name-desc';

export default function FinanceTrackerPage() {
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('finance_tracker_authenticated');
    if (isAuthenticated !== 'true') {
      router.push('/AIisthebest@143');
      return;
    }

    // Ensure scrolling works on this page
    document.documentElement.classList.remove('loading');
    document.documentElement.classList.add('loaded');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, [router]);

  const [items, setItems] = useState<FinanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FinanceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState<'all' | 'one-time' | 'monthly' | 'yearly'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'expense' | 'income'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [formData, setFormData] = useState({
    purchase: '',
    cost: '',
    description: '',
    frequency: 'one-time' as 'one-time' | 'monthly' | 'yearly',
    type: 'expense' as 'expense' | 'income',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('finance_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedItems = await processRenewals(data || []);
      setItems(processedItems);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load finance items');
    } finally {
      setLoading(false);
    }
  };

  const processRenewals = async (items: FinanceItem[]) => {
    const today = new Date();
    const updatedItems: FinanceItem[] = [];

    for (const item of items) {
      if (item.frequency !== 'one-time' && item.is_active) {
        if (item.next_renewal_date) {
          const renewalDate = parseISO(item.next_renewal_date);
          if (isBefore(renewalDate, today)) {
            const newRenewalDate = item.frequency === 'monthly'
              ? addMonths(renewalDate, 1)
              : addYears(renewalDate, 1);

            const { error } = await supabase
              .from('finance_items')
              .update({ next_renewal_date: newRenewalDate.toISOString() })
              .eq('id', item.id);

            if (!error) {
              item.next_renewal_date = newRenewalDate.toISOString();
            }
          }
        }
      }
      updatedItems.push(item);
    }

    return updatedItems;
  };

  const calculateNextRenewal = (frequency: 'one-time' | 'monthly' | 'yearly'): string | undefined => {
    if (frequency === 'one-time') return undefined;
    const today = new Date();
    if (frequency === 'monthly') {
      return addMonths(today, 1).toISOString();
    } else {
      return addYears(today, 1).toISOString();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.purchase || !formData.cost) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const cost = parseFloat(formData.cost);
      if (isNaN(cost) || cost <= 0) {
        toast.error('Please enter a valid cost');
        return;
      }

      const nextRenewalDate = calculateNextRenewal(formData.frequency);

      if (editingItem) {
        const { error } = await supabase
          .from('finance_items')
          .update({
            purchase: formData.purchase,
            cost,
            description: formData.description,
            frequency: formData.frequency,
            type: formData.type,
            next_renewal_date: nextRenewalDate,
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Finance item updated successfully');
      } else {
        const { error } = await supabase
          .from('finance_items')
          .insert({
            purchase: formData.purchase,
            cost,
            description: formData.description,
            frequency: formData.frequency,
            type: formData.type,
            next_renewal_date: nextRenewalDate,
            is_active: true,
          });

        if (error) throw error;
        toast.success(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully`);
      }

      setIsDialogOpen(false);
      resetForm();
      fetchItems();
    } catch (error: any) {
      console.error('Error saving item:', error);
      toast.error(error.message || 'Failed to save finance item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('finance_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Finance item deleted successfully');
      fetchItems();
    } catch (error: any) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete finance item');
    }
  };

  const handleEdit = (item: FinanceItem) => {
    setEditingItem(item);
    setFormData({
      purchase: item.purchase,
      cost: item.cost.toString(),
      description: item.description,
      frequency: item.frequency,
      type: item.type || 'expense',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      purchase: '',
      cost: '',
      description: '',
      frequency: 'one-time',
      type: 'expense',
    });
    setEditingItem(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.purchase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Frequency filter
    if (frequencyFilter !== 'all') {
      filtered = filtered.filter(item => item.frequency === frequencyFilter);
    }

    // Type filter (income/expense)
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'date-asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'cost-desc':
          return b.cost - a.cost;
        case 'cost-asc':
          return a.cost - b.cost;
        case 'name-asc':
          return a.purchase.localeCompare(b.purchase);
        case 'name-desc':
          return b.purchase.localeCompare(a.purchase);
        default:
          return 0;
      }
    });

    return sorted;
  }, [items, searchQuery, frequencyFilter, typeFilter, sortOption]);

  // Calculate statistics
  const stats = useMemo(() => {
    const expenses = items.filter(item => item.type === 'expense');
    const income = items.filter(item => item.type === 'income');
    
    const totalExpenses = expenses.reduce((sum, item) => sum + item.cost, 0);
    const totalIncome = income.reduce((sum, item) => sum + item.cost, 0);
    const netAmount = totalIncome - totalExpenses;
    
    const monthlyExpenses = expenses
      .filter(item => item.frequency === 'monthly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    const monthlyIncome = income
      .filter(item => item.frequency === 'monthly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    
    const yearlyExpenses = expenses
      .filter(item => item.frequency === 'yearly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    const yearlyIncome = income
      .filter(item => item.frequency === 'yearly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    
    const oneTimeExpenses = expenses
      .filter(item => item.frequency === 'one-time')
      .reduce((sum, item) => sum + item.cost, 0);
    const oneTimeIncome = income
      .filter(item => item.frequency === 'one-time')
      .reduce((sum, item) => sum + item.cost, 0);
    
    const yearlyRecurringExpenses = (monthlyExpenses * 12) + yearlyExpenses;
    const yearlyRecurringIncome = (monthlyIncome * 12) + yearlyIncome;

    return { 
      totalExpenses, 
      totalIncome, 
      netAmount,
      monthlyExpenses, 
      monthlyIncome,
      yearlyExpenses, 
      yearlyIncome,
      oneTimeExpenses, 
      oneTimeIncome,
      yearlyRecurringExpenses,
      yearlyRecurringIncome,
    };
  }, [items]);

  // Chart data - separate income and expenses
  const incomeExpenseChartData = useMemo(() => {
    const totalExpenses = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.cost, 0);
    const totalIncome = items.filter(i => i.type === 'income').reduce((sum, i) => sum + i.cost, 0);
    
    return [
      { name: 'Expenses', value: totalExpenses, color: '#EF4444' },
      { name: 'Income', value: totalIncome, color: '#10B981' },
    ].filter(item => item.value > 0);
  }, [items]);

  const frequencyChartData = useMemo(() => {
    const monthly = items.filter(i => i.frequency === 'monthly' && i.is_active).reduce((sum, i) => sum + i.cost, 0);
    const yearly = items.filter(i => i.frequency === 'yearly' && i.is_active).reduce((sum, i) => sum + i.cost, 0);
    const oneTime = items.filter(i => i.frequency === 'one-time').reduce((sum, i) => sum + i.cost, 0);
    
    return [
      { name: 'Monthly', value: monthly, color: '#F6B800' },
      { name: 'Yearly', value: yearly, color: '#1F4F9A' },
      { name: 'One-Time', value: oneTime, color: '#10B981' },
    ].filter(item => item.value > 0);
  }, [items]);

  // Expense vs Income comparison data
  const expenseIncomeComparisonData = useMemo(() => {
    const totalExpenses = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.cost, 0);
    const totalIncome = items.filter(i => i.type === 'income').reduce((sum, i) => sum + i.cost, 0);
    
    return [
      { name: 'Expenses', value: totalExpenses, color: '#EF4444' },
      { name: 'Income', value: totalIncome, color: '#10B981' },
    ];
  }, [items]);

  // Monthly income vs expense line graph data
  const monthlyIncomeExpenseData = useMemo(() => {
    // Get the last 12 months
    const months: { [key: string]: { income: number; expenses: number } } = {};
    const now = new Date();
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = format(date, 'MMM yyyy');
      months[monthKey] = { income: 0, expenses: 0 };
    }

    // Process items
    items.forEach(item => {
      const itemDate = parseISO(item.created_at);
      const monthKey = format(itemDate, 'MMM yyyy');
      
      if (months[monthKey]) {
        if (item.type === 'income') {
          months[monthKey].income += item.cost;
        } else {
          months[monthKey].expenses += item.cost;
        }
      }
    });

    // Convert to array format for the chart
    return Object.entries(months).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }));
  }, [items]);

  // Upcoming renewals
  const upcomingRenewals = useMemo(() => {
    return items
      .filter(item => item.frequency !== 'one-time' && item.next_renewal_date && item.is_active)
      .map(item => ({
        ...item,
        renewalDate: parseISO(item.next_renewal_date!),
      }))
      .sort((a, b) => a.renewalDate.getTime() - b.renewalDate.getTime())
      .slice(0, 5);
  }, [items]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Type', 'Purchase', 'Cost', 'Description', 'Frequency', 'Next Renewal', 'Date Added'];
    const rows = filteredAndSortedItems.map(item => [
      item.type === 'income' ? 'Income' : 'Expense',
      item.purchase,
      item.cost.toString(),
      item.description || '',
      item.frequency,
      item.next_renewal_date ? format(parseISO(item.next_renewal_date), 'MMM dd, yyyy') : 'N/A',
      format(parseISO(item.created_at), 'MMM dd, yyyy'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `finance-tracker-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Data exported to CSV');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div className="mb-8 sm:mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-[#1F4F9A] via-blue to-gold bg-clip-text text-transparent mb-3"
        >
          Finance Tracker
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[#6B7280]"
        >
          Track your income, expenses, subscriptions, and financial health
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[#111827]">Total Expenses</CardTitle>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center shadow-sm">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-1">${stats.totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-[#6B7280] font-medium">All time expenses</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[#111827]">Total Income</CardTitle>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shadow-sm">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-1">${stats.totalIncome.toFixed(2)}</div>
              <p className="text-xs text-[#6B7280] font-medium">All time income</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className={`border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl overflow-hidden ${stats.netAmount >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[#111827]">Net Balance</CardTitle>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm bg-gradient-to-br ${stats.netAmount >= 0 ? 'from-green-100 to-green-200' : 'from-red-100 to-red-200'}`}>
                <DollarSign className={`h-5 w-5 ${stats.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${stats.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.netAmount >= 0 ? '+' : ''}${stats.netAmount.toFixed(2)}
              </div>
              <p className={`text-xs font-medium ${stats.netAmount >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {stats.netAmount >= 0 ? '✓ In Profit' : '⚠ In Loss'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className={`border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-xl overflow-hidden ${(stats.monthlyIncome - stats.monthlyExpenses) >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-[#111827]">Monthly Net</CardTitle>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm bg-gradient-to-br ${(stats.monthlyIncome - stats.monthlyExpenses) >= 0 ? 'from-green-100 to-green-200' : 'from-red-100 to-red-200'}`}>
                <Calendar className={`h-5 w-5 ${(stats.monthlyIncome - stats.monthlyExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-1 ${(stats.monthlyIncome - stats.monthlyExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(stats.monthlyIncome - stats.monthlyExpenses) >= 0 ? '+' : ''}${(stats.monthlyIncome - stats.monthlyExpenses).toFixed(2)}
              </div>
              <p className="text-xs text-[#6B7280] font-medium">
                Income - Expenses per month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm rounded-lg p-1">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-blue data-[state=active]:text-white rounded-md transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="transactions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-blue data-[state=active]:text-white rounded-md transition-all"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-blue data-[state=active]:text-white rounded-md transition-all"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
            className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Renewals */}
          {upcomingRenewals.length > 0 && (
            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="flex items-center text-[#111827]">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center mr-3">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  Upcoming Renewals
                </CardTitle>
                <CardDescription>Subscriptions renewing soon</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {upcomingRenewals.map((item) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-blue/5 hover:to-gold/5 hover:border-gold/30 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div>
                        <p className="font-semibold text-[#111827]">{item.purchase}</p>
                        <p className="text-sm text-[#6B7280] mt-1">
                          {format(item.renewalDate, 'EEEE, MMMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">${item.cost.toFixed(2)}</p>
                        <p className="text-xs text-[#6B7280] capitalize mt-1">{item.frequency}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="text-[#111827]">Income vs Expenses</CardTitle>
                <CardDescription>Total income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                {incomeExpenseChartData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      expenses: { label: 'Expenses', color: '#EF4444' },
                      income: { label: 'Income', color: '#10B981' },
                    }} 
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeExpenseChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {incomeExpenseChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm text-[#6B7280]">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                  <p className="text-xs text-[#6B7280]">
                                    {((data.value as number) / incomeExpenseChartData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}% of total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending by Frequency</CardTitle>
                <CardDescription>Breakdown by frequency</CardDescription>
              </CardHeader>
              <CardContent>
                {frequencyChartData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      monthly: { label: 'Monthly', color: '#F6B800' },
                      yearly: { label: 'Yearly', color: '#1F4F9A' },
                      oneTime: { label: 'One-Time', color: '#10B981' },
                    }} 
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={frequencyChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {frequencyChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm text-[#6B7280]">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                  <p className="text-xs text-[#6B7280]">
                                    {((data.value as number) / frequencyChartData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}% of total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="text-[#111827]">Income vs Expense Trend</CardTitle>
                <CardDescription>Monthly income and expense trends over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {monthlyIncomeExpenseData.some(item => item.income > 0 || item.expenses > 0) ? (
                  <ChartContainer 
                    config={{
                      income: { label: 'Income', color: '#10B981' },
                      expenses: { label: 'Expenses', color: '#EF4444' },
                    }} 
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={monthlyIncomeExpenseData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <defs>
                          <linearGradient id="expenseLineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="incomeLineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          tickLine={false}
                        />
                        <ChartTooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-lg">
                                  <p className="font-semibold text-[#111827] mb-2">{label}</p>
                                  {payload.map((entry, index) => {
                                    const isIncome = entry.dataKey === 'income';
                                    return (
                                      <p 
                                        key={index}
                                        className={`text-sm font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}
                                      >
                                        <span className="inline-block w-2 h-2 rounded-full mr-2" 
                                          style={{ backgroundColor: entry.color }} 
                                        />
                                        {isIncome ? 'Income' : 'Expenses'}: ${(entry.value as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </p>
                                    );
                                  })}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                          iconType="line"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          dot={{ fill: '#10B981', r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Income"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#EF4444" 
                          strokeWidth={3}
                          dot={{ fill: '#EF4444', r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Expenses"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={frequencyFilter} onValueChange={(value: any) => setFrequencyFilter(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frequencies</SelectItem>
                    <SelectItem value="one-time">One-Time</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="cost-desc">Cost: High to Low</SelectItem>
                    <SelectItem value="cost-asc">Cost: Low to High</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={exportToCSV}
                  className="border-gray-300 hover:bg-gradient-to-r hover:from-gold/10 hover:to-blue/10 hover:border-gold transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
              <p className="mt-4 text-[#6B7280]">Loading...</p>
            </div>
          ) : filteredAndSortedItems.length === 0 ? (
            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardContent className="py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gold/20 to-blue/20 flex items-center justify-center mx-auto mb-6">
                  <Tag className="h-8 w-8 text-[#6B7280]" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">No transactions found</h3>
                <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                  {searchQuery || frequencyFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first transaction'}
                </p>
                {!searchQuery && frequencyFilter === 'all' && typeFilter === 'all' && (
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-200">
                      <TableHead className="w-[150px] font-semibold text-[#111827]">Type</TableHead>
                      <TableHead className="w-[200px] font-semibold text-[#111827]">Purchase</TableHead>
                      <TableHead className="font-semibold text-[#111827]">Description</TableHead>
                      <TableHead className="text-right font-semibold text-[#111827]">Amount</TableHead>
                      <TableHead className="font-semibold text-[#111827]">Frequency</TableHead>
                      <TableHead className="font-semibold text-[#111827]">Next Renewal</TableHead>
                      <TableHead className="font-semibold text-[#111827]">Date Added</TableHead>
                      <TableHead className="text-right font-semibold text-[#111827]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredAndSortedItems.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="hover:bg-gradient-to-r hover:from-blue/5 hover:to-gold/5 transition-colors duration-200 border-b border-gray-100"
                        >
                          <TableCell>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                              item.type === 'income' 
                                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' 
                                : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                            }`}>
                              {item.type === 'income' ? 'Income' : 'Expense'}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">{item.purchase}</TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate text-sm text-[#6B7280]">
                              {item.description || '—'}
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`font-bold text-lg ${
                              item.type === 'income' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {item.type === 'income' ? '+' : '-'}${item.cost.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 capitalize shadow-sm">
                              {item.frequency === 'one-time' ? 'One-Time' : item.frequency}
                            </span>
                          </TableCell>
                          <TableCell>
                            {item.frequency !== 'one-time' && item.next_renewal_date ? (
                              <span className="flex items-center text-sm">
                                <Calendar className="h-3 w-3 mr-1 text-[#6B7280]" />
                                {format(parseISO(item.next_renewal_date), 'MMM dd, yyyy')}
                              </span>
                            ) : (
                              <span className="text-[#6B7280]">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-[#6B7280]">
                              {format(parseISO(item.created_at), 'MMM dd, yyyy')}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(item)}
                                className="h-8 w-8"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(item.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="text-[#111827]">Income vs Expenses</CardTitle>
                <CardDescription>Total income and expenses breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {incomeExpenseChartData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      expenses: { label: 'Expenses', color: '#EF4444' },
                      income: { label: 'Income', color: '#10B981' },
                    }} 
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeExpenseChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                          outerRadius={110}
                          innerRadius={50}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {incomeExpenseChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              const total = incomeExpenseChartData.reduce((sum, item) => sum + item.value, 0);
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm font-bold text-gold">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                  <p className="text-xs text-[#6B7280]">
                                    {((data.value as number) / total * 100).toFixed(1)}% of total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          formatter={(value) => {
                            const item = incomeExpenseChartData.find(d => d.name === value);
                            return item ? `${value}: $${item.value.toFixed(2)}` : value;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="text-[#111827]">Spending by Frequency</CardTitle>
                <CardDescription>Breakdown by frequency</CardDescription>
              </CardHeader>
              <CardContent>
                {frequencyChartData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      monthly: { label: 'Monthly', color: '#F6B800' },
                      yearly: { label: 'Yearly', color: '#1F4F9A' },
                      oneTime: { label: 'One-Time', color: '#10B981' },
                    }} 
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={frequencyChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                          outerRadius={110}
                          innerRadius={50}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {frequencyChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              const total = frequencyChartData.reduce((sum, item) => sum + item.value, 0);
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm font-bold text-gold">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                  <p className="text-xs text-[#6B7280]">
                                    {((data.value as number) / total * 100).toFixed(1)}% of total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          formatter={(value) => {
                            const item = frequencyChartData.find(d => d.name === value);
                            return item ? `${value}: $${item.value.toFixed(2)}` : value;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue/5 to-gold/5 border-b border-gray-100">
                <CardTitle className="text-[#111827]">Expense vs Income</CardTitle>
                <CardDescription>Compare your total expenses and income</CardDescription>
              </CardHeader>
              <CardContent>
                {expenseIncomeComparisonData.some(item => item.value > 0) ? (
                  <ChartContainer 
                    config={{
                      expenses: { label: 'Expenses', color: '#EF4444' },
                      income: { label: 'Income', color: '#10B981' },
                    }} 
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={expenseIncomeComparisonData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <defs>
                          <linearGradient id="transactionsExpenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#DC2626" />
                          </linearGradient>
                          <linearGradient id="transactionsIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 14, fontWeight: 600 }}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          tickLine={false}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              const isIncome = data.payload.name === 'Income';
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-lg">
                                  <p className="font-semibold text-[#111827] mb-1">{data.payload.name}</p>
                                  <p className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                                    ${(data.value as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[8, 8, 0, 0]}
                          name="Amount"
                        >
                          {expenseIncomeComparisonData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.name === 'Income' ? 'url(#transactionsIncomeGradient)' : 'url(#transactionsExpenseGradient)'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-[#6B7280]">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-xl border border-gray-200 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-gray-100">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#1F4F9A] to-gold bg-clip-text text-transparent">
              {editingItem ? 'Edit Transaction' : 'Add New Transaction'}
            </DialogTitle>
            <DialogDescription className="text-[#6B7280] mt-2">
              Track your income and expenses
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'expense' | 'income') =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="purchase">{formData.type === 'income' ? 'Income Source' : 'Purchase'} Name *</Label>
              <Input
                id="purchase"
                placeholder="e.g., Netflix Subscription"
                value={formData.purchase}
                onChange={(e) => setFormData({ ...formData, purchase: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="cost">Amount ($) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder={formData.type === 'income' ? 'Additional details about this income source...' : 'Additional details about this purchase...'}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="frequency">Frequency *</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value: 'one-time' | 'monthly' | 'yearly') =>
                  setFormData({ ...formData, frequency: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-Time</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                {editingItem ? 'Update' : 'Add'} {formData.type === 'income' ? 'Income' : 'Expense'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
