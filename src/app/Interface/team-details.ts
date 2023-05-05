export interface TeamDetails {
  Thumb: string
  Name: string
  Designation: string
  social: Social[]
}

export interface Social {
  network: string
  networkUrl: string
}


export interface AdminTeamDetails {
  id: string
  ChefName: string
  Designation: string
  Active: boolean
  ChefImageLink: string
  social: AdminSocial[]
}

export interface AdminSocial {
  network: string
  status: boolean
  url: string
}
