export default interface Student {
  _id: string;
  email: string;
  name: string;
  password: string;
  rollNumber: string;
  year: number;
  semester: number;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  subjects: string[];
}
