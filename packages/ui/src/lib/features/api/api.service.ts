import { tapestickGeneratedApi as api } from "./api.openapi";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    accountControllerCreate: {},
    accountControllerFindAll: {},
    accountControllerFindOne: {},
    accountControllerUpdate: {},
    accountControllerRemove: {},
    authControllerSignup: {},
    authControllerLogin: {},
    authControllerIsLoggedIn: {},
    authControllerLogout: {},
    authControllerRefreshToken: {},
  },
});

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
} = enhancedApi;

export { enhancedApi as tapestickApi };
