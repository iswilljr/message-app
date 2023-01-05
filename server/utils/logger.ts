import chalk, { ChalkInstance } from "chalk";

class Logger {
  constructor(private readonly name: string) {}

  custom({
    args,
    color,
    level,
    name,
  }: {
    args: any[];
    color: ChalkInstance | keyof typeof chalk;
    level: keyof typeof console;
    name?: string;
  }) {
    const chalkInstance = typeof color === "string" ? (chalk[color] as ChalkInstance) : color;

    (console[level] as any)(chalkInstance(name ?? level), "-", ...args);
  }

  ready(...args: any[]) {
    this.custom({ args, color: "green", level: "info", name: "ready" });
  }

  event(...args: any[]) {
    this.custom({ args, color: "magenta", level: "info", name: "event" });
  }

  log(...args: any[]) {
    this.custom({ args, color: "cyan", level: "info" });
  }

  warn(...args: any[]) {
    this.custom({ args, color: "yellow", level: "warn" });
  }

  error(...args: any[]) {
    this.custom({ args, color: "red", level: "error" });
  }
}

export const logger = new Logger("server");
