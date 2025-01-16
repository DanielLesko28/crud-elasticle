import { hashSync } from "bcrypt-ts-edge";

export const sampleData = {
  users: [
    {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1990-01-15T00:00:00Z"),
    },
    {
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1995-06-23T00:00:00Z"),
    },
    {
      name: "Michael",
      surname: "Johnson",
      email: "michael.johnson@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1985-03-10T00:00:00Z"),
    },
    {
      name: "Emily",
      surname: "Brown",
      email: "emily.brown@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("2000-12-01T00:00:00Z"),
    },
    {
      name: "Chris",
      surname: "Davis",
      email: "chris.davis@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1992-04-17T00:00:00Z"),
    },
    {
      name: "Sarah",
      surname: "Miller",
      email: "sarah.miller@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1998-07-05T00:00:00Z"),
    },
    {
      name: "David",
      surname: "Wilson",
      email: "david.wilson@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1987-11-20T00:00:00Z"),
    },
    {
      name: "Sophia",
      surname: "Moore",
      email: "sophia.moore@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("2002-02-25T00:00:00Z"),
    },
    {
      name: "James",
      surname: "Taylor",
      email: "james.taylor@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1991-09-15T00:00:00Z"),
    },
    {
      name: "Isabella",
      surname: "Anderson",
      email: "isabella.anderson@example.com",
      password: hashSync("123456", 10),
      dateOfBirth: new Date("1993-05-10T00:00:00Z"),
    },
  ],
};
