# Cube26

For the assignment I have used Angular.js as frontend technology, Django in backend, further I have used a bootstrap theme. 
Most of the working parts are written in Angular. 

I am taking the github project URL as input which is converted to the Github API URL. Subsequently I perform a HTTP GET request to obtain an object comprising of all the issues. Each object contains the date and time at which it was created, which is used to obtain the numbers as per the task requirements. 
Each issue object comprises a property "comment_url" which points to the URL comprising of all the comments, which I obtain by performing another HTTP GET request. 
I have added the functionality to add commments to each issues. 
The comment requires the message body and a username. On submitting the comments get saved in the backend database. Where the username and comment get stored. 

If given more time:

  I would use the Github API so that a user can login into Github before commenting. 

  I would modularize my JS code more. 
  
  I would have conditions to check that comments and username are not empty. 
  
  I would try to make the UI more appealing by adding more animations.
  
  I would make the backend database more efficient, where each comment would be correlated to the github project and issue it   is related to. Currently, the comment are not retained if we hit refresh, I would correct this bug. 
  
  



Instructions to build: 

1.Install virtualenv from https://virtualenv.readthedocs.org/en/latest/
2.Create a virtualenv  
3.Install pip from https://pip.pypa.io/en/stable/installing/
4.Go into Cube directory and perform the following: pip install -r requirements.txt
5.Once all the dependencies have been installed perfrom the following: python manage.py runserver
6.Visit the web app in a web browser at 127.0.0.1:8000 or localhost:8000
