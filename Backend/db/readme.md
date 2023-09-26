# Design of DB for Supabase

```mermaid
erDiagram
  Users{
    int idUser PK
    string name
    string email UK
    string color
  }
  Groups {
    int idGroup PK
    int ownerId FK
    string name 
    datetime postTime
  }
  Users ||--|{Groups: ""
  usersXgroups{
    int idUXG PK
    int idGroup FK
    int idUser FK
    int groupLevel 
    int personalLevel
  }
  Users }|--|{  usersXgroups: ""
  Groups }|--|{  usersXgroups: ""
  Friends {
    int idFriend PK
    int owner FK
    int friend FK
    int idType FK
    datetime postTime
  }
  Users }|--|{  Friends: ""
  FriendsTypes{
    int idType PK
    string name
  }
  Friends }|--||  FriendsTypes: ""
  Appointments{
    int idApointment PK
    int idUser FK
    string name
    int level
    datetime start
    datetime finish
    string color 
  }
  Users ||--o{ Appointments: ""
  Shedules{
    int idShedule PK
    int idUser FK
    string name
    int level
    string color
  }
  Users ||--|{ Shedules: ""
  ScheduleItem{
    int idSItem PK
    int idShedule FK
    time start
    time finish
    int day
  }
  Shedules ||--|{ ScheduleItem: ""
  Mettings{
    int idMetting PK
    int idGroup FK
    int idType FK
    date next
    time start
    time finish
    int day
    date lastDate
  }
  MettingTypes{
    int idType PK
    string name
  }
  Mettings ||--||  MettingTypes: ""
  Groups ||--|{  Mettings: ""
  History{
    int idHistory PK
    int idMetting FK
    datetime postTime
  }
  Mettings ||--|{ History: ""
  Attendance{
    int idAttendance PK
    int idHistory FK
    int idUser FK
    int idResponseType FK
    datetime postTime
  }
  ResponseTypes{
    int idType PK
    string name
  }
  Attendance ||--|{ History: ""
  Attendance ||--|| ResponseTypes: ""
  Attendance }|--|{ Users: ""
  Invitations{
    int idInvitation PK
    int sender FK
    int guest FK
    int idResponse FK
    datetime postTime
  }
  Invitations }|--|| ResponseTypes: ""
  Invitations }|--|{ Groups: ""
  Invitations }|--|{ Users: ""
```
## Users
In the provided database schema, the users entity appears to be a central part of the database structure, as connections between users are a significant aspect and a primary focus of the application. The various relationships and associations involving the "Users" entity, such as connections with groups, friends, appointments, schedules, attendance, and invitations, highlight the importance of user interactions and relationships in the application's functionality.
- idUser (PK): This is the primary key that uniquely identifies each user in the database.
- name: This attribute represents the name of the user.
- email (UK): The email attribute is a unique key, ensuring that each user has a distinct email address.
- color: Each user is associated with a color, which will be reflected in the groups when a gradient is applied using the colors of the group members.
Used to ...
```mermaid
erDiagram
  Users{
    int idUser PK
    string name
    string email UK
    string color
  }
  Users ||--|{Groups: "Create"
  Users }|--|{  usersXgroups: "Belong"
  Users }|--|{  Friends: "Adds"
  Users ||--o{ Appointments: "Have"
  Users ||--|{ Shedules: "Have"
  Attendance }|--|{ Users: "Reply"
  Invitations }|--|{ Users: "Reply"
```

## Groups and Mettings
The system allows users to create groups, join existing groups, and participate in meetings within those groups. Users have the flexibility to decide their participation in groups and meetings, making it a versatile and user-centric system for group collaboration and communication.
```mermaid
erDiagram
  Groups {
    int idGroup PK
    int ownerId FK
    string name 
    datetime postTime
  }
  Users ||--|{Groups: ""
    Mettings{
    int idMetting PK
    int idGroup FK
    int idType FK
    date next
    time start
    time finish
    int day
    date lastDate
  }
  MettingTypes{
  }
  Mettings ||--||  MettingTypes: ""
  Groups ||--|{  Mettings: ""
  History{
  }
  Mettings ||--|{ History: ""
  Attendance{
    int idAttendance PK
    int idHistory FK
    int idUser FK
    int idResponseType FK
    datetime postTime
  }
  Attendance ||--|{ History: ""
  Attendance ||--|| ResponseTypes: ""
  Attendance }|--|{ Users: ""
  Invitations{
    int idInvitation PK
    int sender FK
    int guest FK
    int idResponse FK
    datetime postTime
  }
  Invitations }|--|| ResponseTypes: ""
  Invitations }|--|{ Groups: ""
  Invitations }|--|{ Users: ""
```
## Appointments and Schedules
Likewise, the system individually allows users to define their schedules ("Schedules") and one-time events ("Appointments"), enabling the system to notify users if there is a schedule conflict when they want to accept a meeting, a one-time event, or adjust their schedule. At the same time, the system is designed to provide suggestions that do not conflict with users' schedules, one-time events, and meetings when they request proposals.
```mermaid
erDiagram
  Appointments{
    int idApointment PK
    int idUser FK
    string name
    int level
    datetime start
    datetime finish
    string color 
  }
  Users ||--o{ Appointments: ""
  Shedules{
    int idShedule PK
    int idUser FK
    string name
    int level
    string color
  }
  Users ||--|{ Shedules: ""
  ScheduleItem{
    int idSItem PK
    int idShedule FK
    time start
    time finish
    int day
  }
  Shedules ||--|{ ScheduleItem: ""
```
