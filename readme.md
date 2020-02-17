![Ojet Logo](https://www.oracle.com/webfolder/technetwork/jet/css/images/logo_jet_256_rich.png)

# Welcome to Christel House Hack-a-thon

## What - Building some super tools (Oracle JET, Machine Learning, Conversational Chatbot) for use at Christel House
## When - Mar 13-14, 2020

This will serve as a starter application for the next few days of hacking.

Learn Oracle JET [here](http://bit.ly/teach-me-jet)

The following requirements have been identified for the overall application:

*   Easy to use and navigate for both Educators and Learners
*   A secure login to identfy users
*   Needs to be usable on all platforms desktop, mobile and tablets
*   Needs to have Christel House color branding

On each sub page you will find more information and requirements for that area.

To change the content of this section, you will make edits to the dashboard.html file located in the /js/views folder.</div>

# Books Library

Christel House has a need to organise the process around cataloging and checking out books from the library. Currently the process is not accurate and does not allow for notifications and reporting on the books library information.

*   Integrate with http rest services for CRUD actions
*   Add books through the Google Books API based on ISBN number from book covers
*   Add more manual information to each book
*   Track learners borrowing of books with a check out system
*   Reports to show books that have been checked out
*   Chat Bot to interact and conversational search / investigate the database of books

To change the content of this section, you will make edits to the books.html file located in the /js/views folder.</

# Educators Daily Check-in



Similar to the learners daily attendance, Christel House has a requirement to optomise the attendence of educators as well. This new process can allow for the following:

*   Integrate with http rest services for CRUD actions
*   A way to indeinfiy and validate sign-ins
*   Facial Recognition (face-api.js, tensorflow.js)
*   Geo-fencing to schoold location
*   Integration with current Biometric system - TBD
*   Reporting on daily check-ins

To change the content of this section, you will make edits to the educators.html file located in the /js/views folder.

# Learners Attendance



Currently the daily attendance process is not optomised and takes lots of time to enter into the system. Christel House has a requirement to streamline the daily process of capturing attendance into the system. Some of the requirements are:

*   Integrate with http rest services for CRUD actions
*   A list view for teachers to manage students attendance - filled by Rest service calls over http
*   Marking a learner absent for the day - http call to Rest Service
*   Seeing a running total of consecutive absent days - fetch from http rest service
*   Flag if absent days exceeds 10
*   A year to date view to show attendance % overall for each student - fetch from http rest service
*   A profile view to show an overview report of a student’s attendance
*   A quick input view to capture attendance quickly
*   Photos of students ca be clicked to show they are absent

To change the content of this section, you will make edits to the learners.html file located in the /js/views folder.
