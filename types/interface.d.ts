export namespace model {
  export interface User {
    gender: string;
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      thumbnail: string;
    };
  }
}
