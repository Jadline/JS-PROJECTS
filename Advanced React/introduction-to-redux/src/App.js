import CreateCustomer from "./Features/customer/CreateCustomer";
import Customer from "./Features/customer/Customer";
import AccountOperations from "./Features/account/AccountOperations";
import BalanceDisplay from "./Features/account/BalanceDisplay";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
