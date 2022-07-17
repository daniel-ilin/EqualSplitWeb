import { v4 as uuidv4 } from "uuid";

class CalculatedPerson {
  name: string;
  id: string;
  sessionId: string;
  totalSpent: number;
  owes: boolean;
  spendDifference: number;
  calculatedTransactions: CalculatedTransaction[];

  constructor(id: string, sessionId: string, name: string) {
    this.name = name;
    this.owes = false;
    this.id = id;
    this.sessionId = sessionId;
    this.spendDifference = 0;
    this.totalSpent = 0;
    this.calculatedTransactions = [];
  }
}

export function findOwers(session: Session) {
  let owers: CalculatedPerson[] = [];
  let needers: CalculatedPerson[] = [];

  let sum = 0;

  let calculatedUsers: CalculatedPerson[] = [];

  for (const user of session.users) {
    let calculatedUser = new CalculatedPerson(
      user.userid,
      session.id,
      user.username
    );
    calculatedUsers.push(calculatedUser);
    for (const transaction of user.transactions) {
      calculatedUser.totalSpent += +transaction.amount;
      sum += +transaction.amount;
    }
  }

  const perPerson = sum / session.users.length;

  if (perPerson <= 1) {
    const ans: CalculatedPerson[] = [];
    return ans;
  }

  for (let k = 0; k < calculatedUsers.length; k++) {
    let user = calculatedUsers[k];
    user.spendDifference = user.totalSpent - perPerson;
    if (user.spendDifference < 0) {
      user.owes = true;
      owers.push(user);
    }
    if (user.spendDifference > 0) {
      needers.push(user);
    }
    user.spendDifference = Math.abs(user.spendDifference);
  }

  for (let i = 0; i < owers.length; i++) {
    let ower = owers[i];
    for (let j = 0; j < needers.length; j++) {
      let needer = needers[j];
      if (ower.spendDifference >= needer.spendDifference) {
        const amount = needer.spendDifference;
        const calculatedTransaction: CalculatedTransaction = {
          id: uuidv4(),
          sessionid: session.id,
          amount: amount,
          receiverid: needer.id,
          senderid: ower.id,
        };
        ower.spendDifference -= amount;
        needer.spendDifference = 0;
        if (calculatedTransaction.amount > 0) {
          ower.calculatedTransactions?.push(calculatedTransaction);
          needer.calculatedTransactions?.push(calculatedTransaction);
        }
      } else if (ower.spendDifference < needer.spendDifference) {
        const amount = ower.spendDifference;
        const calculatedTransaction: CalculatedTransaction = {
          id: uuidv4(),
          sessionid: session.id,
          amount: amount,
          receiverid: needer.id,
          senderid: ower.id,
        };
        ower.spendDifference = 0;
        needer.spendDifference -= amount;
        if (calculatedTransaction.amount > 0) {
          ower.calculatedTransactions?.push(calculatedTransaction);
          needer.calculatedTransactions?.push(calculatedTransaction);
        }
      }
    }
  }
  const finalArr = needers.concat(owers);  
  return finalArr;
}
