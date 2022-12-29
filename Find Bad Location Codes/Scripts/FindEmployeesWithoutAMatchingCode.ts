export class FindEmployeesWithoutAMatchingCode {
    async FindEmployeesWithoutAMatchingCode(){
        const data = await Deno.readTextFile("./Output/CurrentAndCorrectLocationCodes.csv");

        const lines =data.split("\n");

        const rows = lines.map((line) => line.split(","));

        for (const element of rows)
        {
            if (element[0] == "employee_id"){
                continue;
            }

            let employeeId: string = element[0];
            let companyId: string = element[1];
            let currentLocationCode: string = element[2];
            let currentLocationCodeOverride: string = element[3];
            let correctCodesList: string[] = element[4].split("/");

            let hasMatchingCode = correctCodesList.some(function (correctCode) {
                return correctCode != "" && (correctCode == currentLocationCode || correctCode == currentLocationCodeOverride);
            });

            if (!hasMatchingCode){
                await Deno.writeTextFile("./Output/EmployeesWithoutMatchingCodes.csv", (`\n${employeeId},${companyId}`), {append: true});
            }

            console.log(`${employeeId} finished`)

        }

        console.log("All done :)");
    }
}