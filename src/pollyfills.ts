import { Buffer } from "buffer";

if (!(global as any).Buffer) {
  (global as any).Buffer = Buffer;
}