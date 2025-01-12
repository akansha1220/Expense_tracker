/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AllConfigTypes } from "src/config/config.types";
import { DataSource} from "typeorm";


@Injectable()

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService:ConfigService<AllConfigTypes>){}

    private async  createDataSource():Promise<DataSource>{

        const newDatasource=new DataSource({
            type: 'postgres',
            database :this.configService.get('database.name',{infer:true}),
            host: this.configService.get('database.host',{infer:true}),
            username: this.configService.get('database.username',{infer:true}),
            password: this.configService.get('database.password',{infer:true}),
            port: this.configService.get('database.port',{infer:true}),
            schema: this.configService.get('database.schema',{infer:true}),
            synchronize: this.configService.get('database.synchronize',{infer:true}),
            poolSize: this.configService.get('database.poolSize',{infer:true}),
            entities:[__dirname+'/../**/*.entity{.ts,.js}'],
            migrations:[__dirname+"/migration/**/*.ts"],
            ssl: this.configService.get('database.sslEnabled',{infer:true})
            ?{
            rejectUnauthorized: this.configService.get('database.rejectUnauthorize',{infer:true}) 
            }
            : undefined,
            });
        try{
            await newDatasource.initialize();
            return newDatasource;
        }catch(error){
            console.log(error);
            throw error;
        }
         

    }

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const datasorce= await this.createDataSource();
        return datasorce.options as TypeOrmModuleOptions;
      }

}