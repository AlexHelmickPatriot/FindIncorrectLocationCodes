export class  ConvertCsvToJson {
    async ConvertCsvToJson(){
        const data = await Deno.readTextFile("./Input/FakeInput.csv");

        const lines =data.split("\n");

        const headers = lines[0].split(",");

        const results = [];
        for (let i = 1; i < lines.length; i++) {
            const obj: any = {};
            //Regex that splits on commas but not if the comma is in quotes
            const currentLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = String(currentLine[j]);
            }
            results.push(obj);
        }

        await Deno.writeTextFile("./Input/ConvertedToJson.json", (JSON.stringify(results)), {append: true});

        console.log("Converted to json file named \"ConvertedToJson.json\n");
    }
}