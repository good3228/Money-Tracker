# Final Project

Team 19: AJHJ

| Name | NUID | Email|
| ---------- | ---------- | ---------- |
| Sheng-Jung Chen | 002981985 | chen.shengju@northeastern.edu |
| Chun Lee | 002144061 | lee.chun@northeastern.edu |
| Haoyang Hu | 001005743 | hu.haoy@northeastern.edu |
| Hanwen Jiang | 002199242 | jiang.hanw@northeastrn.edu |

## Project Description

We aim to create an expense tracker app, user can see and record their revenue and expense by logging in,
this app can also give a better visualization of users' total revenue and expense.

## Run Our App

git clone our repo to an IDE such as intelliJ

Open the terminal, type "cd server" command and then "npm start" to start running the REST API

Open another terminal, at the same time, type "cd client" and then "npm start" to start running our app

## User Stories

1. As a user, I can create an account and log in with email and password
2. As a user, I can see my personal profile, and my account statistic
3. As a user, I can view my expense and income history
4. As a user, I can type to search the specific expense or income
5. As a user, I can update any specific expense or income i want
6. As a user, I can delete any specific expense or income i want
7. As a user, I can see the graph visualize the proportion of my total expense and revenue

## technology

Express

Mongoose

React.js

Javascript

SCSS

Bootstrap

## Available API

1. /signup
2. /login
3. /income
4. /expense
5. /income/:id
6. /expense/:id 
7. /userRevenue/:userid
8. /userExpense/:userid
9. /statistic/:userid
10. /userExpense/search/:userid