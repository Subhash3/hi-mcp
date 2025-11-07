import "dotenv/config";
import { MyMcpClient } from "./client";

const client = new MyMcpClient();

client.start();
