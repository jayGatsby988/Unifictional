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
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
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
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [formData, setFormData] = useState({
    purchase: '',
    cost: '',
    description: '',
    frequency: 'one-time' as 'one-time' | 'monthly' | 'yearly',
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
            next_renewal_date: nextRenewalDate,
            is_active: true,
          });

        if (error) throw error;
        toast.success('Finance item added successfully');
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
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      purchase: '',
      cost: '',
      description: '',
      frequency: 'one-time',
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
  }, [items, searchQuery, frequencyFilter, sortOption]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
    const monthlyTotal = items
      .filter(item => item.frequency === 'monthly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    const yearlyTotal = items
      .filter(item => item.frequency === 'yearly' && item.is_active)
      .reduce((sum, item) => sum + item.cost, 0);
    const oneTimeTotal = items
      .filter(item => item.frequency === 'one-time')
      .reduce((sum, item) => sum + item.cost, 0);
    const yearlyRecurringTotal = (monthlyTotal * 12) + yearlyTotal;

    return { totalCost, monthlyTotal, yearlyTotal, oneTimeTotal, yearlyRecurringTotal };
  }, [items]);

  // Chart data - better calculation for meaningful comparison
  const frequencyChartData = useMemo(() => {
    // For monthly, show monthly cost (not annualized)
    const monthly = items.filter(i => i.frequency === 'monthly' && i.is_active).reduce((sum, i) => sum + i.cost, 0);
    // For yearly, show yearly cost
    const yearly = items.filter(i => i.frequency === 'yearly' && i.is_active).reduce((sum, i) => sum + i.cost, 0);
    // For one-time, show total one-time expenses
    const oneTime = items.filter(i => i.frequency === 'one-time').reduce((sum, i) => sum + i.cost, 0);
    
    return [
      { name: 'Monthly', value: monthly, color: '#F6B800' },
      { name: 'Yearly', value: yearly, color: '#1F4F9A' },
      { name: 'One-Time', value: oneTime, color: '#10B981' },
    ].filter(item => item.value > 0);
  }, [items]);

  const topPurchasesData = useMemo(() => {
    return items
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5)
      .map(item => ({
        name: item.purchase.length > 15 ? item.purchase.substring(0, 15) + '...' : item.purchase,
        cost: item.cost,
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
    const headers = ['Purchase', 'Cost', 'Description', 'Frequency', 'Next Renewal', 'Date Added'];
    const rows = filteredAndSortedItems.map(item => [
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#111827] mb-2">
          Finance Tracker
        </h1>
        <p className="text-[#6B7280]">
          Track your purchases, subscriptions, and expenses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Recurring</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.yearlyRecurringTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">One-Time</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.oneTimeTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
            className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Purchase
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Renewals */}
          {upcomingRenewals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-gold" />
                  Upcoming Renewals
                </CardTitle>
                <CardDescription>Subscriptions renewing soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingRenewals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">{item.purchase}</p>
                        <p className="text-sm text-[#6B7280]">
                          {format(item.renewalDate, 'EEEE, MMMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gold">${item.cost.toFixed(2)}</p>
                        <p className="text-xs text-[#6B7280] capitalize">{item.frequency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Frequency</CardTitle>
                <CardDescription>Breakdown of expenses</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Purchases</CardTitle>
                <CardDescription>Highest expenses</CardDescription>
              </CardHeader>
              <CardContent>
                {topPurchasesData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      cost: { label: 'Cost', color: '#F6B800' },
                    }} 
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={topPurchasesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={100}
                          tick={{ fontSize: 12 }}
                          interval={0}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.payload.name}</p>
                                  <p className="text-sm font-bold text-gold">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="cost" 
                          fill="#F6B800" 
                          radius={[8, 8, 0, 0]}
                          name="Cost"
                        />
                      </BarChart>
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
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                  <Input
                    placeholder="Search purchases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                <Button variant="outline" onClick={exportToCSV}>
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
            <Card>
              <CardContent className="py-12 text-center">
                <Tag className="h-12 w-12 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#111827] mb-2">No purchases found</h3>
                <p className="text-[#6B7280] mb-4">
                  {searchQuery || frequencyFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first purchase'}
                </p>
                {!searchQuery && frequencyFilter === 'all' && (
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Purchase
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Purchase</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Renewal</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                        >
                          <TableCell className="font-medium">{item.purchase}</TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate text-sm text-[#6B7280]">
                              {item.description || '—'}
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-bold text-gold text-lg">
                              ${item.cost.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
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
            <Card>
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Visual breakdown of your expenses</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Top Expenses</CardTitle>
                <CardDescription>Your highest cost items</CardDescription>
              </CardHeader>
              <CardContent>
                {topPurchasesData.length > 0 ? (
                  <ChartContainer 
                    config={{
                      cost: { label: 'Cost', color: '#1F4F9A' },
                    }} 
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={topPurchasesData} 
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                      >
                        <XAxis 
                          type="number" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={120}
                          tick={{ fontSize: 12 }}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0];
                              return (
                                <div className="rounded-lg border bg-white p-3 shadow-md">
                                  <p className="font-medium">{data.payload.name}</p>
                                  <p className="text-sm font-bold text-blue">
                                    ${(data.value as number).toFixed(2)}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="cost" 
                          fill="#1F4F9A" 
                          radius={[0, 8, 8, 0]}
                          name="Cost"
                        />
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Purchase' : 'Add New Purchase'}</DialogTitle>
            <DialogDescription>
              Track your expenses and subscriptions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="purchase">Purchase Name *</Label>
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
              <Label htmlFor="cost">Cost ($) *</Label>
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
                placeholder="Additional details about this purchase..."
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white"
              >
                {editingItem ? 'Update' : 'Add'} Purchase
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
