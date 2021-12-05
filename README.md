# Please Read before Starting to Work on the Project

Before starting, please do the following: 

<ul>
<li> Install dependencies in the front end and backend folders. </li> 
<li> CD into Front end folder and run: npm run dev. </li> 
<li> Take a look at the seeds.sql in the backend. </li> 
<li> Take a look at the routes.js file in the backend to familiarize yourself with the endpoints. </li> 
</ul>
Then, please create a .env file and add the environment variables so that you can connect to the database on the backend and make a few API calls to every table to familiarize yourself with the database. 

Once your done setting up the backend, please run the front end and sign up for a new user and sign into the app. 

Once you're on the dashboard, you'll see a Jira-like dashboard. 

# The Tasks

There are 4 tasks that are needed to be done. Just like on Jira board, every ticket has a status. This status is stored on the **ticket** table **status** column. 

1 - I have created a list of columns on the front end. We need to **pull the tickets data from the database and distribute the tickets on the cards within the columns according to the status field of the ticket**. Make sure that those tasks must be corresponding to the user that's signed in. The SELECT statement on the /api/tickets/:id endpoint will already pull the data for the tickets corresponding to the signed in user. 

2 - Not only we need to pull the cards and distribute them on the cards per status but also, when we drag the card from one column to the other, we need to **update the status field in the table when the card is dragged from one column to the other**. 

3 - **Create the ticket form and submit it.** I already created the form that you can navigate to it from the _Create New Ticket_ menu item on the NavBar. Just replace the labels with the fields to match the ticket table columns and make the post request to hit the backend endpoint that will insert the ticket data to the table. 

4 - **Deploy to Heroku.**

Thank you very much! 

