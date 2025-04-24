import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/hooks/formatCurrency";
import { TransactionStatus } from "@prisma/client";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";


async function getData(userId: string) {
  const [data, pendingTransactions, paidTransactions] = await Promise.all([
    prisma.transactions.findMany({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
      },
    }),
    prisma.transactions.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.transactions.findMany({
      where: {
        userId: userId,
        status: "COMPLETED" ,
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    pendingTransactions,
    paidTransactions,
  };
}

export async function TransactionsStatsBlocks() {
  const session = await requireUser();
  const { data, pendingTransactions, paidTransactions } = await getData(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8 ml-5 mr-5 mb-5 mt-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenditure</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, transactions) => acc + transactions.amount, 0),
              currency: "INR",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">Based on total volume</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions Created
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground">Total Transactions Created!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Transactions</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidTransactions.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total completed Transactions!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Transactions
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{pendingTransactions.length}</h2>
          <p className="text-xs text-muted-foreground">
            Transactions which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}