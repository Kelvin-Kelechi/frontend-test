export const fetchMockRevenue = async (): Promise<RevenueData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Jan", value: 220000 },
        { name: "Feb", value: 450000 },
        { name: "Mar", value: 360000 },
        { name: "Apr", value: 280000 },
        { name: "May", value: 50000 },
        { name: "Jun", value: 120000 },
        { name: "Jul", value: 100000 },
        { name: "Aug", value: 110000 },
        { name: "Sep", value: 95000 },
        { name: "Oct", value: 130000 },
        { name: "Nov", value: 170000 },
        { name: "Dec", value: 0 },
      ]);
    }, 1000);
  });
};

interface RevenueData {
  name: string;
  value: number;
}