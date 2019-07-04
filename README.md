# Anon's neighbourhood.

MVP of an application that tells user if he/she is in the neighbourhood of some other user, without revealing their exact location. 
The algorithm that provides this functionality is **Private Set Intersection**.
If You are interested in the details please check `anon-neighbourhood-paper.pdf`.

### Motivations

This project was created for Cryptography laboratory classes, Summer Semester 2019.

### Instruction
1. Type in the name of you and your potential neighbour.
2. Specify your coordinates - you can either use real location of your device or the values that you provide.
3. Check the neighbourhood!

### How to build

You need to setup a VueJS development environment to build the web app and Firebase application to setup communication between parties. Application relies on Geolocation API of a browser - serve the app with HTTPS.
