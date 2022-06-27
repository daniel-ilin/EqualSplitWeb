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
