declare global {
    interface String {
      proper(): string;
      caps(): string;
    }
  }

String.prototype.proper = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

export {};