import { tapestickEmptyApi as api } from "./api.template";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    accountControllerCreate: build.mutation<
      AccountControllerCreateApiResponse,
      AccountControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/account`,
        method: "POST",
        body: queryArg.createAccountDto,
      }),
    }),
    accountControllerFindAll: build.query<
      AccountControllerFindAllApiResponse,
      AccountControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/v1/account` }),
    }),
    accountControllerFindOne: build.query<
      AccountControllerFindOneApiResponse,
      AccountControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/account/${queryArg.id}` }),
    }),
    accountControllerUpdate: build.mutation<
      AccountControllerUpdateApiResponse,
      AccountControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/account/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateAccountDto,
      }),
    }),
    accountControllerRemove: build.mutation<
      AccountControllerRemoveApiResponse,
      AccountControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/account/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    authControllerSignup: build.mutation<
      AuthControllerSignupApiResponse,
      AuthControllerSignupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/signup`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),
    authControllerIsLoggedIn: build.mutation<
      AuthControllerIsLoggedInApiResponse,
      AuthControllerIsLoggedInApiArg
    >({
      query: () => ({ url: `/api/v1/auth/is-logged-in`, method: "POST" }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: () => ({ url: `/api/v1/auth/logout`, method: "POST" }),
    }),
    authControllerRefreshToken: build.mutation<
      AuthControllerRefreshTokenApiResponse,
      AuthControllerRefreshTokenApiArg
    >({
      query: () => ({ url: `/api/v1/auth/refresh-token`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as tapestickGeneratedApi };
export type AccountControllerCreateApiResponse = /** status 201  */ string;
export type AccountControllerCreateApiArg = {
  createAccountDto: CreateAccountDto;
};
export type AccountControllerFindAllApiResponse = /** status 200  */ string;
export type AccountControllerFindAllApiArg = void;
export type AccountControllerFindOneApiResponse = /** status 200  */ string;
export type AccountControllerFindOneApiArg = {
  id: string;
};
export type AccountControllerUpdateApiResponse = /** status 200  */ string;
export type AccountControllerUpdateApiArg = {
  id: string;
  updateAccountDto: UpdateAccountDto;
};
export type AccountControllerRemoveApiResponse = /** status 200  */ string;
export type AccountControllerRemoveApiArg = {
  id: string;
};
export type AuthControllerSignupApiResponse = /** status 201  */ TokenDto;
export type AuthControllerSignupApiArg = {
  createUserDto: CreateUserDto;
};
export type AuthControllerLoginApiResponse = /** status 201  */ TokenDto;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerIsLoggedInApiResponse =
  /** status 201  */ LoginCheckDto;
export type AuthControllerIsLoggedInApiArg = void;
export type AuthControllerLogoutApiResponse = /** status 201  */ MsgDto;
export type AuthControllerLogoutApiArg = void;
export type AuthControllerRefreshTokenApiResponse = /** status 201  */ TokenDto;
export type AuthControllerRefreshTokenApiArg = void;
export type CreateAccountDto = {
  name: string;
};
export type UpdateAccountDto = {
  name?: string;
};
export type TokenDto = {
  accessToken: string;
};
export type CreateUserDto = {
  refreshToken?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type LoginCheckDto = {
  isLoggedIn: boolean;
};
export type MsgDto = {
  msg: string;
};
export const {
  useAccountControllerCreateMutation,
  useAccountControllerFindAllQuery,
  useAccountControllerFindOneQuery,
  useAccountControllerUpdateMutation,
  useAccountControllerRemoveMutation,
  useAuthControllerSignupMutation,
  useAuthControllerLoginMutation,
  useAuthControllerIsLoggedInMutation,
  useAuthControllerLogoutMutation,
  useAuthControllerRefreshTokenMutation,
} = injectedRtkApi;
