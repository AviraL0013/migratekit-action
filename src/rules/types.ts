export interface ScanResult {
  file: string;
  line: number;
  code: string;
}

export interface MigrationRule {
  id: string;
  description: string;

  scan(root: string): Promise<ScanResult[]>;
  migrate(findings: ScanResult[]): Promise<boolean>;

  pr: {
    branch: string;
    title: string;
    body: string;
    humanReviewNotes: string;
  };
}
