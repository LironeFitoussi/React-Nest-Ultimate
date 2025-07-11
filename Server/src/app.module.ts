import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { TestModule } from './test/test.module';
import { Auth0Module } from './auth0/auth0.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        AUTH0_DOMAIN: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
      }).unknown(true), // Allow unknown environment variables
      validate: (config: Record<string, any>) => {
        const { error, value: validatedConfig } = Joi.object({
          PORT: Joi.number().default(3000),
          MONGODB_URI: Joi.string().required(),
          NODE_ENV: Joi.string()
            .valid('development', 'production', 'test')
            .default('development'),
          AUTH0_DOMAIN: Joi.string().required(),
          AUTH0_AUDIENCE: Joi.string().required(),
        }).unknown(true).validate(config, { abortEarly: false });

        if (error) {
          throw new Error(
            `Config validation error: ${error.details.map((d) => d.message).join(', ')}`
          );
        }

        // Log the validated config (safely)
        const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = validatedConfig as Record<string, any>;
        console.log('📝 Validated Auth0 configuration:', {
          domain: AUTH0_DOMAIN ? '✅ Set' : '❌ Missing',
          audience: AUTH0_AUDIENCE ? '✅ Set' : '❌ Missing',
          expectedIssuer: AUTH0_DOMAIN ? `https://${AUTH0_DOMAIN}/` : '❌ Missing',
        });

        return validatedConfig as Record<string, any>;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    Auth0Module,
    UserModule,
    HealthModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
