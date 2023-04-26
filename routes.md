# Routes and expected inputs

## Members

### Registering members

    -> POST method
    -> URL = /api/v1/members/register
    -> required inputs
        --> firstName
        --> MiddleName
        --> lastName
        --> userName
        --> password
        --> phoneNumber
        --> role
        --> dateOfBirth
        --> martialStatus

### Login

    -> POST method
    -> URL = /api/v1/members/login
    -> required inputs
        --> userName
        --> password

### Update member profile

    -> PUT method
    -> URL = /api/v1/members/:id
    -> optional inputs
        --> spouseFullName
        --> numberOfChildren
        --> childrensFullName = []
        --> address = {
            city,
            subCity,
            woreda,
            houseNumber
        }
        --> specificAddressName
        --> emergencyContactFullName
        --> emergencyContactPhonenumber
        --> baptized = Boolean
        --> previousChurchName
        --> previousChurchBranch
        --> previousTeams = []
        --> knowOfOurChurch = []
        --> timeOfArrival = Date
        --> learningDicipleshipClass = Boolean
        --> deparment = [ ObjectId of departments ]
        --> academicStatus
        --> profession
        --> workingInCompany
        --> skills = []
        --> languages = []
        --> vision

### Deleting a member

    -> DELETE Method
    -> URL = /api/v1/members/:id

### Get All Members

    -> GET Method
    -> URL = /api/v1/members

### Get One Member

    -> GET Method
    -> URL = /api/v1/members/:id

## Departments

### Adding New Department

    -> POST Method
    -> URL = /api/v1/department
    -> required inputs
        --> departmentName
        --> departmentLeaders = [ ObjectId of Members ]
        --> departmentWeeklyProgram = Date

### Update Department

    -> PUT Method
    -> URL = /api/v1/department/:id
    -> Optional inputs
        --> departmentName
        --> departmentLeaders = [ ObjectId of Members ]
        --> departmentWeeklyProgram = Date

### Delete Department

    -> PUT Method
    -> URL = /api/v1/department/:id

### Get One Department

    -> GET Method
    -> URL = /api/v1/department/:id

### Get All Departments

    -> GET Method
    -> URL = /api/v1/department

## Church

### Add New Church

    -> POST Method
    -> URL = /api/v1/church
    -> required inputs
        --> churchName
        --> churchBranchName
        --> churchLocation
        --> leadPastor = { ObjectId of Members }
        --> numberOfMembers

### Update Church

    -> PUT Method
    -> URL = /api/v1/church/:id
    -> optional inputs
        --> churchName
        --> churchBranchName
        --> churchLocation
        --> leadPastor = { ObjectId of Members }
        --> numberOfMembers

### Delete Church

    -> DELETE Method
    -> URL = /api/v1/church/:id

### Get All Churches

    -> GET Method
    -> URL = /api/v1/church

### Get One Church

    -> GET Method
    -> URL = /api/v1/church

## Church Branch

### Add New Church Branch

    -> POST Method
    -> URL = /api/v1/branch
    -> required inputs
        --> church
        --> churchBranchName
        --> churchBranchLocation
        --> churchBranchLeadPastor = { ObjectId of Members }
        --> churchMembersNumber

### Update Church

    -> PUT Method
    -> URL = /api/v1/branch/:id
    -> optional inputs
        --> church
        --> churchBranchName
        --> churchBranchLocation
        --> churchBranchLeadPastor = { ObjectId of Members }
        --> churchMembersNumber

### Delete Church

    -> DELETE Method
    -> URL = /api/v1/branch/:id

### Get All Churches

    -> GET Method
    -> URL = /api/v1/church

### Get One Church

    -> GET Method
    -> URL = /api/v1/church

## Programs

### Add New Program

    -> POST Method
    -> URL = /api/v1/program
    -> required inputs
        --> programName
        --> department = { ObjectId of Department }
        --> programDate = Date

### Update Programs

    -> PUT Method
    -> URL = /api/v1/program/:id
    -> optional inputs
        --> programName
        --> department = { ObjectId of Department }
        --> programDate = Date

### Delete Program

    -> DELETE Method
    -> URL = /api/v1/program/:id

### Get All Programs

    -> GET Method
    -> URL = /api/v1/program

### Get One Program

    -> GET Method
    -> URL = /api/v1/program/:id

### Register Attendance

    -> POST Method
    -> URL = /api/v1/program/attendance/:id
    -> required input
        --> memberId = { ObjectId of Member }

### Get Attended Members for a program

    -> GET Method
    -> URL = /api/v1/program/attendance/:id
