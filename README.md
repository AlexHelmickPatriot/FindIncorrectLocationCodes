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
