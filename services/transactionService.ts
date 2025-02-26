 export const fetchMockTransactions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          amount: "₦43,644",
          id: "TR_8401857902",
          type: "Transfer",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Processed",
        },
        {
          amount: "₦35,471",
          id: "TR_8401857902",
          type: "Withdrawal",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Failed",
        },
        {
          amount: "₦43,644",
          id: "TR_8401857902",
          type: "Deposit",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Processed",
        },
        {
          amount: "₦35,471",
          id: "TR_8401857902",
          type: "Request",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Failed",
        },
        {
          amount: "₦43,644",
          id: "TR_8401857902",
          type: "Transfer",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Processed",
        },
        {
          amount: "₦35,471",
          id: "TR_8401857902",
          type: "Transfer",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Failed",
        },
        {
          amount: "₦38,948",
          id: "TR_8401857902",
          type: "Transfer",
          date: "Feb 12, 2025",
          time: "10:30AM",
          status: "Processed",
        },
      ]);
    }, 1000);  
  });
