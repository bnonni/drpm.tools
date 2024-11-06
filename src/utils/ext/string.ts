declare global {
    interface String {
      proper(): string;
      upper(): string;
      lower(): string;
    }
  }

String.prototype.proper = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.upper = function (): string {
  return this.toUpperCase();
};

String.prototype.lower = function (): string {
  return this.toLowerCase();
};

export {};