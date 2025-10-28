interface Crossmark {
  request?: (params: any) => Promise<any>;
  connect?: () => Promise<any>;
  on?: (event: string, callback: (data: any) => void) => void;
  api?: {
    request?: (params: any) => Promise<any>;
    getCurrentAccount?: () => Promise<any>;
    [key: string]: any;
  };
  session?: {
    user?: string;
    address?: string;
    account?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface Window {
  crossmark?: Crossmark;
}

