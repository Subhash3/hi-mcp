import z from "zod";

export const sayHiInputSchema = {
  name: z.string().describe("The name of the person to greet"),
};

export const sayHiOutputSchema = {
  greeting: z.string().describe("The greeting message"),
};

export class HiService {
    sayHi(name: string): string {
        return `Hello, ${name}!`;
    }
}
