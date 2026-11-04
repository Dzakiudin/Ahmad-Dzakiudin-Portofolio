export interface WorkCardItem {
  yearTag: string;
  org: string;
  title: string;
  desc: string;
  bigStat: string;
  statTop: string;
  statBot: string;
  image: string;
  realScreenshot: string;
  link: string;
  archPipeline: string;
  fullDesc: string;
  bullets: string[];
}

export interface AlsoDeskItem {
  org: string;
  title: string;
  desc: string;
  sub: string;
  image: string;
  link: string;
}

export interface PathMilestone {
  year: string;
  badge: string;
  title: string;
  org: string;
  desc: string;
  pills: string[];
  image: string;
}

export interface KudosItem {
  q: string;
  a: string;
}

export type TraitKey = 'detail' | 'systems' | 'code' | 'hardware';
