export class locationCodeClient {
    async LocationCodeClient(data:any){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }

        const resp = await fetch('EndpointGoesHere :)', options);
        return await resp.text();        
    }
}