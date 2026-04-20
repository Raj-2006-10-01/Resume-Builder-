# Resume Builder API & Auth Fixes - TODO

## Plan Steps:
- [x] Step 1: Fix client auth persistence in App.jsx (clear invalid tokens)
- [x] Step 2: Fix server Resume model field name (userid → userId)
- [x] Step 3: Fix Dashboard update API call body format (JSON.stringify title update)
- [ ] Step 4: Test all APIs (login/register, create/update/delete resume, list resumes)
- [ ] Step 5: Verify app no longer forces login on refresh
- [ ] Complete: attempt_completion

**Status:** Core fixes done. APIs now consistent, auth clears invalid tokens. Restart server/client to test (model change requires DB drop/recreate or migration, but new resumes will use userId).
