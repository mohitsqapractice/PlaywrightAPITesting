export class ApiClient {
    constructor(private request: any) { }

    async get(id: number) {
        const response = await this.request.get(`/booking/${id}`);
        return response;
    }

    async post(endpoint: string, body: object) {
        const response = await this.request.post(endpoint, {
            data: body
        });
        return response;
    }

    async getToken()
    {
        const response = await this.request.post('/auth',{
            data: {
            username: "admin",
            password: "password123"
        }
        })

         if (response.status() !== 200) {
        throw new Error('Token generation failed');
    }

        const jsonBody = await response.json();
        return jsonBody.token;
    }

    async put(id:string,body:object,token:string)
    {
        const response = await this.request.put(`/booking/${id}`,{
            headers : {
               cookie : `token=${token}`
        },
        data : body}
        )
           return response;
    }

    async delete(id:string,token:string)
    {
        const response = await this.request.delete(`/booking/${id}`, {headers:
        {
            'Content-Type': 'application/json',
            Cookie: `token=${token}`
        }
    })
        return response;
    }
  
}