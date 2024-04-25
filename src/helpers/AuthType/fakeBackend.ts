import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";
import {
  // productsData,
  // comments,
  // recentProducts,
  // productListvar,
  jobs,
  jobApply,
  // jobListCandidate,
  // jobsGridData,
  jobsGridData,
} from "common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_LOGIN).reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config: any) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex: any;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex((obj) => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/social-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const first_name = user.name;
          const nodeapiToken = nodeApiToken;
          delete user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, first_name: first_name }; // Token Obj
          const validUserObj = {
            token: nodeapiToken,
            data: { ...tokenObj, ...user },
          }; // validUser Obj
          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost(url.POST_FAKE_PASSWORD_FORGET).reply((config: any) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost(url.POST_EDIT_PROFILE).reply((config) => {
    const user = JSON.parse(config["data"]);

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex((obj) => obj.uid === user.idx);

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

          resolve([200, users[objIndex]]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  //Ecommerence Product
  // mock.onGet(url.GET_PRODUCTS).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (productsData) {
  //         // Passing fake JSON data as response
  //         resolve([200, productsData]);
  //       } else {
  //         reject([400, "Cannot get Ecommerence-product data"]);
  //       }
  //     });
  //   });
  // });

  //Ecommerence product Detailes
  // mock.onGet(new RegExp(`${url.GET_PRODUCTS_DETAIL}/*`)).reply((config) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (productsData) {
  //         // Passing fake JSON data as response
  //         const { params } = config;
  //         const product = productsData.find(
  //           (product) => product.id.toString() === params.id.toString()
  //         );
  //         resolve([200, { ...product }]);
  //       } else {
  //         reject([400, "Cannot get product detail"]);
  //       }
  //     });
  //   });
  // });

  mock.onPut(url.UPDATE_PROJECT).reply((project) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot update project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PROJECT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.project]);
        } else {
          reject([400, "Cannot delete project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as responses
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

  mock.onGet(url.GET_JOB_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobs) {
          // Passing fake JSON data as response
          resolve([200, jobs]);
        } else {
          reject([400, "Cannot get jobs"]);
        }
      });
    });
  });

  //job grid
  mock.onGet(url.GET_JOB_GRID).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobsGridData) {
          // Passing fake JSON data as response
          resolve([200, jobsGridData]);
        } else {
          reject([400, "Cannot get jobs Grid"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_JOB_LIST).reply((job) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot add job"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_JOB_LIST).reply((job) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot update job"]);
        }
      });
    });
  });

  mock.onGet(url.GET_APPLY_JOB).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobApply) {
          // Passing fake JSON data as response
          resolve([200, jobApply]);
        } else {
          reject([400, "Cannot get jobsApply"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_APPLY_JOB).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.jobs]);
        } else {
          reject([400, "Cannot delete applyJob"]);
        }
      });
    });
  });

  // mock.onGet(url.GET_JOB_LIST).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (jobs) {
  //         // Passing fake JSON data as response
  //         resolve([200, jobs]);
  //       } else {
  //         reject([400, "Cannot get jobs"]);
  //       }
  //     });
  //   });
  // });

  //cart
  // mock.onGet(url.GET_CART).reply(() => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (productListvar) {
  //         // Passing fake JSON data as response
  //         resolve([200, productListvar]);
  //       } else {
  //         reject([400, "Cannot get cart data"]);
  //       }
  //     });
  //   });
  // });

  // mock.onDelete(url.DELETE_CART).reply((config: any) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (config && config.headers.cart) {
  //         // Passing fake JSON data as response
  //         resolve([200, config.headers.cart]);
  //       } else {
  //         reject([400, "Cannot get cart data"]);
  //       }
  //     });
  //   });
  // });
};

export default fakeBackend;
