export interface IWixconfig {
  viewMode: 'Site' | 'Editor' | 'Preview';
  instance: string;
  compId: string;
  pages: { id: string; url: string }[];
}