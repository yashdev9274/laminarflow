import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { AnalyticsIcon } from "@/components/icons/analyticsIcon";
import { CardIcon } from "@/components/icons/cardIcon";
import { DollarSignIcon } from "@/components/icons/dollarsignIcon";
import { User } from "@/components/icons/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/hooks/formatCurrency";
import { Activity, CreditCard, DollarSign } from "lucide-react";
import { Line } from 'react-chartjs-2'
import { AreaChartComponent } from "./areaGraphComponent";
import { TIAreaChartComponent } from "./TIAreaGraphComponent";
// import AreaChartComponent from "./lineChatComponent";


async function getData(userId: string) {
  const [data, openInvoices, paidinvoices, dailyBalances, issuedInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 90)), // Last 90 days
        },
      },
      select: {
        date: true,
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 90)), // Last 90 days
        },
      },
      select: {
        date: true,
      },
    }),
  ]);

  const totalBalance = data.reduce((acc, invoice) => acc + invoice.total, 0);

  

  return {
    data,
    openInvoices,
    paidinvoices,
    totalBalance,
    dailyBalances,
    issuedInvoices,
  };
}

interface DailyBalance {
  date: Date; // Adjust the type based on your actual data structure
  total: number;
}

interface IssuedChartData {
  [date: string]: number; // Allow indexing with a string
}

export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidinvoices, totalBalance, dailyBalances, issuedInvoices } = await getData(
    session.user?.id as string
  );

  const chartData = dailyBalances.map(balance => ({
    date: balance.date.toLocaleDateString(), // Format date as needed
    total: balance.total,
  }));

  // invoices chart issue data

  const issuedChartData = issuedInvoices.reduce<IssuedChartData>((acc, invoice) => {
    const date = invoice.date.toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1; // Count invoices per date
    return acc;
  }, {});

  const issuedData = Object.keys(issuedChartData).map(date => ({
    date,
    total: issuedChartData[date],
  }));

  const currentMonthTotal = dailyBalances
  .filter(balance => {
    const balanceDate = new Date(balance.date);
    return (
      balanceDate.getMonth() === new Date().getMonth() &&
      balanceDate.getFullYear() === new Date().getFullYear()
    );
  })
  .reduce((acc, balance) => acc + balance.total, 0);

const previousMonthTotal = dailyBalances
  .filter(balance => {
    const balanceDate = new Date(balance.date);
    return (
      balanceDate.getMonth() === new Date().getMonth() - 1 &&
      balanceDate.getFullYear() === new Date().getFullYear()
    );
  })
  .reduce((acc, balance) => acc + balance.total, 0);

  const percentageChange = previousMonthTotal
    ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8 ml-5 mr-5 mb-5 mt-5">
      <Card className="rounded-xl rounded-tl-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSignIcon className="text-blue-700" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs text-muted-foreground mb-7">Based on total volume</p>
          <AreaChartComponent chartData={chartData} percentageChange={percentageChange}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <User size={18} className="text-blue-700" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground mb-5">Total Invoices Issued!</p>
          <TIAreaChartComponent chartData={issuedData} percentageChange={percentageChange}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CardIcon className="text-blue-700" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices which have been paid!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <AnalyticsIcon className="text-blue-700"  />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}