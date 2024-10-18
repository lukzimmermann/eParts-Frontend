export interface Organisation{
    id: number,
    name: string
}

export interface User{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    job_title: string,
    organisations: Organisation[]
}