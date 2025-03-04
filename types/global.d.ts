type WindowEthereum = any;

declare namespace Window {
  type ethereum = WindowEthereum;
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}
