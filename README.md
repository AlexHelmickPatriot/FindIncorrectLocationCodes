# Purpose of this project
This project was created in order to find customers that had their addresses in the database 
in a bad state. Some addresses had their Tax Location codes not line up with their actual address. 
This resulted in them paying incorrect taxes, but this discrepancy should have been caught when they
did their tax returns. Still, we wanted to be able to contact anyone that might be affected by this to
give them a warning.

This project was to get the tax location codes that are currently linked to an employee in the database
and then use their address to hit an enpoint to find out what the actual tax location code should be.
The enpoints that were used here returned multiple potential codes so I had to compare the existing code
to a list of potential codes.

I have excluded anything that may link to customers or actual Patriot enpoints so this doesn't necessarily 
work right out of the box. Hopefully this can still be a good starting point if you ever have a similar 
issue where you need to sift through data.

# Getting started
This project was done with [Deno](https://deno.land/), a runtime for Typescript. I used VS Code so I
installed it along with the 
[Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno). The 
extension makes the Intellisense specific to Deno so make sure to turn it off when you are not trying
to run Deno code.

In order to debug the code, I had to set up the `launch.json` file. The "runtimeExecutable" config needs 
to point to your `deno.exe`. This should cause debugging to start running from `main.ts`. While it isn't 
super clean, you just need to uncomment the sections of code that correspond to the scripts you want to 
run. If you don't want to debug, you can just run the scripts using the command 
`deno run insert_script_here.ts`.

# The scripts

The code is broken out into the 3 scripts in the in the `Scripts` folder.

The first, `ConvertCsvToJson.ts` is meant to convert the csv file that you get from redash into a
workablble JSON file. This is not perfect and will leave in `\"` characters and `\r` characters, 
though those can easily be taken out with a `ctrl + f`.

The second is `GetCorrectCodeListFromPayrollEngine.ts`. This will call the api and print to a file 
called `CurrentAndCorrectLocationCodes.csv`. You can find that file in this repo to see the format 
the document will be in. This script expects the input to match the format in `FakeInput.json` and 
will is expecting data back from the api in the form of `FakeOutput.json`. You may need to adjust 
the code to fit your enpoint. The file `BadData.csv` was made to output all of the employees that 
got a bad response from the api. `FailedSearches.csv` is meant to catch all of the employees that 
have the api return false for the "successful" property on the object that the api returns.

`FindEmployeesWithoutAMatchinCode.ts` will take the data from `CurrentAndCorrectLocationCodes.csv` 
and output a list of employees that do not have their location code or location code override match 
any of the correct codes that the api returned. This info will be output to `EmployeesWithoutMatchingCodes.csv`. 

`LocationCodeClient.ts` is called by `GetCorrectCodeListFromPayrollEngine.ts` and is not meant 
to be directly called by the user.