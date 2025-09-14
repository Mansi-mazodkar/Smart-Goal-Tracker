export enum GoalCategory {
  Learning = "Learning",
  Exercise = "Exercise",
  TeamWork = "Team Work",
  PersonalGrowth = "Personal Growth",
}

export enum GoalStatus {
  InProgress = "In Progress",
  Done = "Done",
  NotDone = "Not Done",
}

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  startTime: string;
  endTime: string;
  status: GoalStatus;
  notes?: string;
  date: string; // YYYY-MM-DD
  reason?: string;
}

export interface AILink {
  title: string;
  url: string;
}

export interface AIReflection {
  motivationalTip: string;
  youtubeLinks: AILink[];
  articleLinks: AILink[];
}

export enum Badge {
  WeeklyWarrior = "Weekly Warrior",
  PerfectDay = "Perfect Day",
  StreakStarter = "Streak Starter",
  GoalGetter = "Goal Getter",
  HighAchiever = "High Achiever",
}

export interface UserStats {
  streak: number;
  badges: Badge[];
  lastCompletedDate: string | null; // YYYY-MM-DD
}