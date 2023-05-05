export interface UserProfile {
    userType: string
    email: string
    phoneNumber: number
    Employee: Employee
    Notes: string
    displayName: string
    id: string
    address: Address[]
  }
  
  export interface Employee {
    Workday: string
    Experience: number
    Salary:number
  }
  
  export interface Address {
    address: string
    id: string
    city: string
    state: string
    pincode: number
    address2: string
    mobNumber: number
    Name: string
  }