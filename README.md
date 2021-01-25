<h1 align="center">
  <a style="text-decoration: none; color: white;" href="https://mantzaris-thesis.herokuapp.com/" target="_blank" rel="noreferrer"> Human Resource Management System </a>ℹ️
  <br>
</h1>

<h4 align="center">A powerful HRMS built with React, Node.Js, Express, MySQL ...</h4>
<h6 align="center"><a href="https://mantzaris-thesis.herokuapp.com/">https://mantzaris-thesis.herokuapp.com</a></h6>

<p align="center">
<img src="https://github.com/vasilismantz/testgif2/blob/master/thesis-large.gif?raw=true">
  <!-- <img src="https://user-images.githubusercontent.com/56836643/105662731-c36f6c80-5ed0-11eb-8a96-4ec846675756.gif"> -->
</p>

## Description

This Human Resource Management System was made using [React](https://github.com/facebook/react#react-----) and [Bootstrap](https://getbootstrap.com/) amongst other libraries on the frontend and [Node.js](https://nodejs.org/en/) as well as [Express](https://expressjs.com/) on the backend. As for the database, I used [MySQL](https://www.mysql.com/) and [Sequelize](https://sequelize.org/) as the ORM.

### Features

- User authentication and authorization with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and personally developed [authentication middleware hoc](https://github.com/vasilismantz/thesis-fullstack/blob/master/client/src/withAuth.js)
- User Password encryption using hashing with [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- Responsive design and use of [Bootstrap](https://getbootstrap.com/)
- Ability to Manage, Add, Update, Delete:
  - Users (Admin, Manager, Employee)
  - Departmens
  - Job positions
  - Applications (leave of absence...)
  - Payroll Management:
    - Salary details per Employee
    - Record payment history
  - Expense Management:
    - Add expenses
    - View sumamry of expenses
- Storage of environmental variables with [dotenv](https://www.npmjs.com/package/dotenv)

## Disclaimer

This project has a [70 page documentation](http://estia.hua.gr/browse/23478) (view [here](https://drive.google.com/file/d/1143CfOo8dPUhNYUT7a2deB-Vbi3Yr5ac/view?usp=sharing)), where I analyze the process of information gathering, showcase the Analysis and Design of the api and database and provide a useful User Manual.

Unfortunately this document is in the Greek language. I am working on an Englsih summary. If you are interested in my work, please do contact me so we can arrange a meeting for a live demo and analysis.

## User Manual

```
username: bill
passowrd: pass123!
```

Log in and feel free to explore! Better User Manual coming in a few days...

## Known issues

- [here](https://github.com/vasilismantz/thesis-fullstack/issues) along with some other improvements planned.
