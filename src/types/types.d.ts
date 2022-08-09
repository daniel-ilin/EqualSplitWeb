interface CalculatedPerson {
  name: string;
  id: string;
  sessionId: string;
  totalSpent: number;
  owes: boolean;
  spendDifference: number;
  calculatedTransactions: CalculatedTransaction[];
}

interface CalculatedTransaction {
  id: string;
  sessionid: string;
  amount: number;
  receiverid: ?string;
  senderid: ?string;
}

interface ApiReponse {
  message: ?string;
  error: ?string;
}

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  activeUser: ActiveUser;
  sessions: [Session];
}

interface ActiveUser {
  id: string;
  name: string;
  email: string;
}

interface Session {
  id: string;
  name: string;
  ownerid: string;
  sessioncode: string;
  users: User[];
}

interface User {
  userid: string;
  username: string;
  transactions: Transaction[];
}

interface Transaction {
  ownerid: string;
  date: string;
  id: string;
  sessionid: string;
  description: string;
  amount: string;
}
