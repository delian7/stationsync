export interface Employee {
  properties: {
    'Employee Name': {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    'Type of Clothing': {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    Status: {
      select: {
        name: string;
      };
    };
    Timestamps: {
      date: {
        start: string;
      };
    };
    Department: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
  };
}