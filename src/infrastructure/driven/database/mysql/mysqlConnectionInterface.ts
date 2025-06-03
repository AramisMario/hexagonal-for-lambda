export interface MySQLConnectionInterface{
    createPool()
    execute(queryString: string, parameters?: any[])
}