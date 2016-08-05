
# NG2 Quickstart #

This is my custom Angular Quickstart designed as a quickstart for my projects.

## Setup #

```
npm install
npm run typings install
npm start
```

## Use #

* Override the empty path with a starting place, unless you want authentication no matter what.
* Override route `/main` with wherever all successful logins should redirect to.
* Extend `AuthCheckAbstractComponent` with every Component that requires authentication.

## Replacing Backend #

The `AuthService` currently points a dev backend that is rarely listening.

To use with another login service, change salt in
`app/auth/data/settings.data.ts` and point `app/auth/lib/auth.service.ts`
to a base url that implements these endpoints (or rewrite auth service):

| Method | Endpoint | Payload | Server Activity | Optimal Return Value |
| --- | --- | --- | --- | --- |
| GET | `/users` | `X-Auth: AuthToken` | Checks user token. | User object without password if token valid. |
| POST | `/users` | `{ username, password, emailAddress }` | Registers user if name available. | Status 201 |
| PUT (Not used here) | `/users` | `X-Auth: AuthToken { newPassword, newEmailAddress }` | Updates user info. | User object. |
| POST | `sessions` | `{ username, password }` | Gets user token. | AuthToken (string) |
