export interface ClockTime {
  readonly hours: string;
  readonly minutes: string;
  readonly seconds: string;
  readonly dayPeriod: string;
  readonly isoString: string;
}

export interface ClockDate {
  readonly dayName: string;
  readonly day: string;
  readonly month: string;
  readonly year: string;
  readonly fullDate: string;
  readonly isoString: string;
}
