  import "dotenv/config";
  import "reflect-metadata";

  import { NestFactory } from "@nestjs/core";
  import cookieparser from "cookie-parser";
  import { AppModule } from "./app.module";
  import { ValidationPipe } from "@nestjs/common";

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: "https://gpkmc.nabinkhatri64.com.np",
      credentials: true,
      allowedHeaders : ['Content-Type','Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.use(cookieparser());
    const rawPort = (process.env.PORT ?? "").trim();
    const parsedPort = rawPort.length > 0 ? Number(rawPort) : Number.NaN;
    const port =
      Number.isFinite(parsedPort) && parsedPort >= 0 && parsedPort <= 65535
        ? parsedPort
        : 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`Server running at http://localhost:${port}`);
  }

  bootstrap().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
