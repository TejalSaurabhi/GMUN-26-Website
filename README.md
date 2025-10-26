# GMUN - 2025-26

### steps before you start working

*1) Make sure you have npm installed on your device, and have git configured*

*2) Copy the url from the 'Code' option in github repo page, and clone the repo using the command*
```
git clone <url>
```

*3) Open VS code in the root directory, i.e inside the GMUN-25-26 where you will find folders like gmun & README.md*

*4) To push/pull the latest changes, run*
```
git fetch
```
*and then*
```
git pull
```

*5) Notice that react is setup in the /gmun folder, so to __install the latest dependencies__, cd into that directory and run*
```
npm i
```

*6) Now you are good to go, so in the gmun directory, run*

```
npm start
```
*this will start your react app in http://localhost:3000*


*7) Now you are good to go, so to start working on your component, go to that file and start coding*


*8) To see the changes in your component, lets say 'Navbar', go to the url http://localhost:3000/navbar*


*9) once you want to commit, move back to the outermost directory, i.e GMUN-25-26. If you're in /gmun directory, run*
```
cd ..
```
*once, to move 1 step back*


*9.5) Note that: Before starting to work on your part, always git fetch and pull. And once you are done coding your component, always follow -> git add . -> git commit -m "Your message" -> git pull -> git push*


*9.9) There will be many times, when you will work with merge conflicts. I will teach you regarding this in the following meet*


*10) you will be able to see something in the source control icon on the left, so click that, fill the message box with relevant and verbose commit message, and sync changes*


*11) Happy coding!*





