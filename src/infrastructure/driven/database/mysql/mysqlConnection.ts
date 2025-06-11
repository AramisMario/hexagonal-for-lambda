import  mysql from 'mysql2/promise';
import { MySQLConnectionInterface } from './mysqlConnectionInterface';
class MySQLConnection implements MySQLConnectionInterface{

    private pool: mysql.Connection | null = null;

    createPool(){
        if(!this.pool){
            this.pool = mysql.createPool({
              host: process.env.DB_HOST!,
              user: process.env.DB_USER!,
              password: process.env.DB_PASS!,
              database: process.env.DB_NAME!,
              waitForConnections: true,
              connectionLimit: 10,
              queueLimit: 0,
            }); 
        }
         
    }

    async execute(queryString: string, params?: any[]){
        if(params){
            return await this.pool?.execute(queryString,params);
        }
        return await this.pool?.execute(queryString);
    }
}

const mysqlConnection = new MySQLConnection();
export default mysqlConnection;

