Aug. 2, 2023
- [x] display only google login btn when no user
- [x] store user info of Event in firestore
- [x] bug fix, save event

Aug. 3
- [x] quote: trash when saving mode
- [x] bug fix, delete event [? not yet]
- [x] bug pagination
- [x] event: not fetching when loading
- [x] event: after saving the first event, paginatino bug

Aug. 6
- [x] bug lockedEvent on Home

- [] profile: bug lockedEvent when deleting the event on the profile 
- [] Event Cheer
- [] Quote sort
- [] create users in firestore
- [] quote tag to filter
- [] quote card order of elements
- [] DROPDOWN: dropdown from hover card
- [] bug handleUpdate

// ! when date is ambiguous, countdown will be like 日めくりゴロゴｃ

<!-- ./components/profile/tabs/event/EditModeOn.tsx:64:5
Type error: Expected 3 arguments, but got 2.
  62 |     // ✅ This will be type-safe and validated.
  63 |     // Add a new document with a generated id.
> 64 |     handleUpdate(values, event.id);
     |     ^
  65 |     setIsUpdateMode(false);
  66 |     reset({
  67 |       eventTitle: values.eventTitle,
Error: Command "npm run build" exited with 1 -->