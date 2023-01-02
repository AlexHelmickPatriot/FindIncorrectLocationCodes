import employeeData from "../Input/FakeInput.json" assert { type: "json" };
import { locationCodeClient } from "./LocationCodeClient.ts";

export class GetCorrectCodeListFromPayrollEngine{

        async GetCorrectCodeListFromPayrollEngine(){
            const client = new locationCodeClient();
            
                for (const element of employeeData) {
                   
                    const input = {
                        streetAddress1: element.street_address_1,
                        streetAddress2: element.street_address_2,
                        city: element.city,
                        stateAbbreviation: element.state,
                        zipCode: element.zip_code.toString(),
                        locationCodeSearchType: "Local"
                    }

                    let response = await client.LocationCodeClient(input);
                    let responseObject: any;
                    let parseWorked = true;
                    try{
                        responseObject = JSON.parse(response)
                    } catch(error){
                        console.log("Problem with employee id: " + element.employee_id);
                        await Deno.writeTextFile("./Output/BadData.csv", (`\n${element.employee_id},${element.company_id}`), {append: true});

                        parseWorked = false;
                    }  

                    if (parseWorked && responseObject.successful){
                        let correctCodes = responseObject.locationCodeMatches.locationCodes;

                        let codes : string[] = [];
                            
                        correctCodes.forEach((correctCode: any) => {
                            codes.push(correctCode.taxJurisdictionCode)
                        });
            
                        let correctCodesString = Object.values(codes).join("/");
            
                        await Deno.writeTextFile("./Output/CurrentAndCorrectLocationCodes.csv", (`\n${element.employee_id},${element.company_id},${element.location_code},${element.location_code_override},${correctCodesString}`), {append: true});
            
                        console.log(element.employee_id + " finished");
                    }
                    else{
                        await Deno.writeTextFile("./Output/CurrentAndCorrectLocationCodes.csv", (`\n${element.employee_id},${element.company_id},${element.location_code},${element.location_code_override},`), {append: true});
            
                        await Deno.writeTextFile("./Output/FailedSearches.csv", (`\n${element.employee_id},${element.company_id}`), {append: true});

                        console.log(element.employee_id + " failed to find matching codes for employee address");
                    }
                }
                console.log("All done :)");
            
    }
}