import winston from "winston";
import "winston-mongodb";
type LoggerData = {
  level: "error" | "info";
  msg: string;
};
export default function WinstonLogger({ level, msg }: LoggerData) {
  winston
    .add(
      new winston.transports.MongoDB({
        db: "mongodb://localhost:27017/platformDB",
        level,
        name: "logs",
        capped: true,
        cappedMax: 10000,
        collection: "logs",
        options: {
          useUnifiedTopology: true,
        },
      })
    )
    .error(msg);
}
