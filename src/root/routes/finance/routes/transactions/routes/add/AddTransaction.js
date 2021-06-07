import { FinancePage } from "root/routes/finance/components/FinancePage";
import { AddTransactionForm } from "./AddTransactionForm";

const AddTransaction = () => {
  return (
    <FinancePage title={<h1>Add Transaction</h1>}>
      <AddTransactionForm />
    </FinancePage>
  );
};

export { AddTransaction };
